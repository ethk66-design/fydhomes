"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

// Initialize Supabase Admin Client
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
);

export async function createAgentAction(prevState: unknown, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("fullName") as string;

    if (!email || !password || !fullName) {
        return { error: "All fields are required" };
    }

    try {
        const { error } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true, // Auto-confirm email so they can login immediately
            user_metadata: {
                full_name: fullName,
                role: "agent",
            },
        });

        if (error) throw error;

        revalidatePath("/admin/users");
        return { success: true, message: "Agent created successfully" };
    } catch (error: unknown) {
        console.error("Error creating agent:", error);
        return { error: error instanceof Error ? error.message : "Failed to create agent" };
    }
}

export async function getAgentsAction() {
    try {
        const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers();

        if (error) throw error;

        // Filter only agents (optional, if you want to restrict list)
        const agents = users.filter(user => user.user_metadata.role === 'agent');

        return { users: agents };
    } catch (error: unknown) {
        console.error("Error fetching agents:", error);
        return { error: error instanceof Error ? error.message : "Failed to fetch agents", users: [] };
    }
}

export async function deleteAgentAction(userId: string) {
    try {
        const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
        if (error) throw error;

        revalidatePath("/admin/users");
        return { success: true };
    } catch (error: unknown) {
        console.error("Error deleting agent:", error);
        return { error: error instanceof Error ? error.message : "Failed to delete agent" };
    }
}
