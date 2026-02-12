const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    try {
        const total = await prisma.propertyImage.count();
        const supabase = await prisma.propertyImage.count({ where: { url: { contains: 'supabase.co' } } });
        const wp = await prisma.propertyImage.count({ where: { OR: [{ url: { contains: 'wp-content' } }, { url: { contains: 'fydhomes.in' } }] } });

        console.log('--- DB STATS ---');
        console.log('Total DB Images:', total);
        console.log('Supabase URLs:', supabase);
        console.log('WordPress URLs:', wp);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

check();
