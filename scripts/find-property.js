const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const searchTerm = "Premium 4BHK Villa Near Kakkanad";
    console.log(`🔍 Searching for property: "${searchTerm}"...`);

    const properties = await prisma.property.findMany({
        where: {
            title: {
                contains: searchTerm,
                mode: 'insensitive'
            }
        },
        include: {
            images: true,
        }
    });

    if (properties.length === 0) {
        console.log("❌ No matching property found.");
    } else {
        properties.forEach(p => {
            console.log(`\n🏠 ID: ${p.id}`);
            console.log(`   Title: ${p.title}`);
            console.log(`   Status: ${p.status}`);
            console.log(`   Images Count in DB: ${p.images.length}`);
            p.images.forEach(img => console.log(`      - ${img.url} (Order: ${img.order})`));
        });
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
