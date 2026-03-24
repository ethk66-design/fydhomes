const { PrismaClient } = require('@prisma/client');

// Using the exact string given to user for Vercel
const DIRECT_URL = "postgresql://postgres:FydHomesProduction2024@db.vexsmxrfxbatpyelugch.supabase.co:5432/postgres";

async function testConnection() {
    console.log("Testing Direct Connection (IPv6)...");
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: DIRECT_URL,
            },
        },
    });

    try {
        const result = await prisma.$queryRaw`SELECT 1 as test`;
        console.log("✅ Connection Pooler Successful:", result);
    } catch (e) {
        console.error("❌ Connection Pooler Failed:", e.message);
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();
