
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🔍 Analyzing Property Images...');

    const properties = await prisma.property.findMany({
        take: 10,
        orderBy: { updated_at: 'desc' },
        include: {
            images: true
        }
    });

    console.log(`Found ${properties.length} recent properties.`);

    properties.forEach(p => {
        console.log(`\n🏠 ID: ${p.id} | Title: ${p.title}`);
        if (p.images.length === 0) {
            console.log('   ⚠️ NO IMAGES');
        } else {
            p.images.forEach(img => {
                console.log(`   🖼️ Image: ${img.url}`);
            });
        }
    });
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
