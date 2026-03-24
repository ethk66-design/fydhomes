const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        // Check if we can select 'images' from properties
        const result = await prisma.$queryRaw`SELECT id, title, images FROM properties LIMIT 5`;
        console.log('Raw Code Success. Found records:', result.length);
        console.log('Sample record:', JSON.stringify(result[0], null, 2));
    } catch (e) {
        console.log('Query failed (column might not exist):', e.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
