const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        db: { url: 'postgresql://postgres.vexsmxrfxbatpyelugch:FydHomesProduction2024@aws-1-ap-south-1.pooler.supabase.com:5432/postgres' }
    }
});

async function test() {
    try {
        const p = await prisma.property.count();
        console.log('Success! Properties in India DB:', p);
    } catch (e) {
        console.error('Connection failed:', e.message);
    } finally {
        await prisma.$disconnect();
    }
}

test();
