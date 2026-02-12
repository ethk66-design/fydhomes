const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    console.log('--- CHECKING ADMIN SECTIONS DATA ---');

    try {
        const seoCount = await prisma.pageSeo.count();
        console.log(`PageSeo Count: ${seoCount}`);

        const assetsCount = await prisma.pageAsset.count();
        console.log(`PageAsset Count: ${assetsCount}`);

        if (seoCount === 0) {
            console.log('⚠️ PageSeo table is EMPTY. Needs seeding.');
        }

        if (assetsCount === 0) {
            console.log('⚠️ PageAsset table is EMPTY. Needs seeding.');
        }

    } catch (e) {
        console.error('Check Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

check();
