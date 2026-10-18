"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";

// Optional Supabase Admin Client for syncing if keys are provided
const supabaseAdmin = (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
    ? createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        }
    )
    : null;

export async function createAgentAction(prevState: unknown, formData: FormData) {
    const email = (formData.get("email") as string)?.trim().toLowerCase();
    const password = formData.get("password") as string;
    const fullName = (formData.get("fullName") as string)?.trim();

    if (!email || !password || !fullName) {
        return { error: "All fields are required" };
    }

    if (password.length < 6) {
        return { error: "Password must be at least 6 characters" };
    }

    try {
        // 1. Check if user already exists in Prisma DB
        const existingUser = await db.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return { error: "An account with this email already exists" };
        }

        // 2. Hash password with bcrypt
        const password_hash = await bcrypt.hash(password, 10);

        // 3. Create user in Prisma DB (used by NextAuth credentials login)
        const user = await db.user.create({
            data: {
                email,
                password_hash,
                full_name: fullName,
                role: "agent",
            },
        });

        // 4. Optionally sync with Supabase Auth if service role client is active
        if (supabaseAdmin) {
            try {
                await supabaseAdmin.auth.admin.createUser({
                    email,
                    password,
                    email_confirm: true,
                    user_metadata: {
                        full_name: fullName,
                        role: "agent",
                        prisma_id: user.id,
                    },
                });
            } catch (supaErr) {
                console.warn("[Auth Action] Supabase auth sync warning (non-fatal):", supaErr);
            }
        }

        revalidatePath("/admin/users");
        return { success: true, message: "Agent created successfully" };
    } catch (error: unknown) {
        console.error("Error creating agent:", error);
        return { error: error instanceof Error ? error.message : "Failed to create agent" };
    }
}

export async function getAgentsAction() {
    try {
        // Fetch agents from Prisma DB
        const dbUsers = await db.user.findMany({
            where: { role: "agent" },
            orderBy: { created_at: "desc" },
        });

        // Transform into expected AgentUser shape
        const agents = dbUsers.map((u) => ({
            id: u.id,
            email: u.email,
            user_metadata: {
                full_name: u.full_name || "Agent",
                role: u.role,
            },
            created_at: u.created_at.toISOString(),
            last_sign_in_at: undefined,
        }));

        return { users: agents };
    } catch (error: unknown) {
        console.error("Error fetching agents from DB:", error);
        return { error: error instanceof Error ? error.message : "Failed to fetch agents", users: [] };
    }
}

export async function deleteAgentAction(userId: string) {
    try {
        // 1. Find user to get email for Supabase cleanup
        const user = await db.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return { error: "Agent not found" };
        }

        // Prevent deleting the main admin
        if (user.role === "admin" || user.email === "admin@fydhomes.in") {
            return { error: "Primary administrator cannot be deleted" };
        }

        // 2. Delete user sessions & record from Prisma DB
        await db.session.deleteMany({ where: { userId } });
        await db.user.delete({ where: { id: userId } });

        // 3. Delete from Supabase Auth if configured
        if (supabaseAdmin && user.email) {
            try {
                const { data } = await supabaseAdmin.auth.admin.listUsers();
                const supaUser = data.users.find((u) => u.email === user.email);
                if (supaUser) {
                    await supabaseAdmin.auth.admin.deleteUser(supaUser.id);
                }
            } catch (supaErr) {
                console.warn("[Auth Action] Supabase user delete warning (non-fatal):", supaErr);
            }
        }

        revalidatePath("/admin/users");
        return { success: true };
    } catch (error: unknown) {
        console.error("Error deleting agent:", error);
        return { error: error instanceof Error ? error.message : "Failed to delete agent" };
    }
}
