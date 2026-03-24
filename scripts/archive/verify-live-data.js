
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('🔍 Verifying Hostinger Database Content...');
    try {
        const count = await prisma.property.count();
        console.log(`🏠 Total Properties in DB: ${count}`);

        if (count > 0) {
            const first = await prisma.property.findFirst();
            console.log('   Sample Property:', first.title);
        } else {
            console.log('⚠️  Database appears empty.');
        }
    } catch (e) {
        console.error('❌ Error querying DB:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
