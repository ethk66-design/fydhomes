const { PrismaClient } = require('@prisma/client');

const password = 'FydAdmin2026';
const ref = 'vexsmxrfxbatpyelugch';

// Vercel Serverless needs Pooler
const POOLER_URL = `postgresql://postgres.${ref}:${password}@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true`;
// Sometimes it's aws-0, sometimes aws-1 depending on region setup. Let's try both.
const POOLER_URL_2 = `postgresql://postgres.${ref}:${password}@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true`;

// Direct URL for migrations
const DIRECT_URL = `postgresql://postgres:${password}@db.${ref}.supabase.co:5432/postgres`;

async function test(url, name) {
    console.log(`\nTesting ${name}...`);
    const prisma = new PrismaClient({ datasources: { db: { url } } });
    try {
        const res = await prisma.$queryRaw`SELECT 1 as result`;
        console.log(`✅ Success for ${name}`);
        return true;
    } catch (e) {
        console.error(`❌ Failed for ${name}: ${e.message.split('\n').pop()}`);
        return false;
    } finally {
        await prisma.$disconnect();
    }
}

async function run() {
    await test(DIRECT_URL, 'DIRECT_URL (IPv6)');
    await test(POOLER_URL, 'POOLER_URL (aws-0)');
    await test(POOLER_URL_2, 'POOLER_URL (aws-1)');
}
run();
