const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const props = await prisma.property.findMany({
        take: 30,
        select: {
            title: true,
            price: true,
            area: true,
            beds: true,
            tags: true
        }
    });

    console.log("=== PRICE SAMPLE ===");
    console.log([...new Set(props.map(p => p.price).filter(Boolean))]);

    console.log("\n=== AREA SAMPLE ===");
    console.log([...new Set(props.map(p => p.area).filter(Boolean))]);
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
