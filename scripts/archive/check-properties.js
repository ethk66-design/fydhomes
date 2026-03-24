const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const count = await prisma.property.count();
        console.log(`Total properties: ${count}`);

        if (count > 0) {
            const prop = await prisma.property.findFirst({
                include: { images: true }
            });
            console.log('Sample property:', JSON.stringify(prop, null, 2));
        }
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
