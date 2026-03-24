const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🔍 Checking Property Images in DB...');

    const properties = await prisma.property.findMany({
        include: {
            images: true,
        },
        take: 10,
        orderBy: { updated_at: 'desc' }
    });

    console.log(`Found ${properties.length} recent properties.`);

    properties.forEach(p => {
        console.log(`\n🏠 ID: ${p.id}`);
        console.log(`   Title: ${p.title}`);
        console.log(`   Images Count: ${p.images.length}`);
        p.images.forEach(img => console.log(`      - ${img.url}`));
    });
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
