const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function list() {
    try {
        const imgs = await prisma.propertyImage.findMany({
            where: {
                OR: [
                    { url: { contains: 'wp-content' } },
                    { url: { contains: 'fydhomes.in' } }
                ]
            },
            include: {
                property: {
                    select: { title: true }
                }
            }
        });

        console.log('--- REMAINING WP IMAGES ---');
        console.log(JSON.stringify(imgs, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

list();
