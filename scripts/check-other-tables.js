const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkData() {
    try {
        console.log('Checking database counts...');

        const testimonials = await prisma.testimonial.count();
        console.log(`Testimonials: ${testimonials}`);

        const seo = await prisma.pageSeo.count();
        console.log(`PageSEO Entries: ${seo}`);

        const assets = await prisma.pageAsset.count();
        console.log(`PageAssets (Site Images): ${assets}`);

        const properties = await prisma.property.count();
        console.log(`Properties: ${properties}`);

        // List some SEO routes if any
        if (seo > 0) {
            const routes = await prisma.pageSeo.findMany({ select: { route: true } });
            console.log('SEO Routes:', routes.map(r => r.route));
        }

    } catch (e) {
        console.error('Error checking data:', e);
    } finally {
        await prisma.$disconnect();
    }
}

checkData();
