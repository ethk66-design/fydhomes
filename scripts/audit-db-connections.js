const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function audit() {
    console.log('--- ADMIN CONNECTION AUDIT ---');

    try {
        // 1. Check Property Images
        const props = await prisma.property.findMany({
            take: 5,
            include: { images: true }
        });

        console.log(`\nChecking 5 Sample Properties for Images:`);
        props.forEach(p => {
            console.log(`ID: ${p.id} | Title: ${p.title.substring(0, 30)}...`);
            console.log(`  Image Count: ${p.images.length}`);
            if (p.images.length > 0) {
                console.log(`  Sample URL: ${p.images[0].url}`);
            } else {
                console.log(`  [ALERT] No images found!`);
            }
        });

        // 2. Check Testimonials
        const testimonialCount = await prisma.testimonial.count();
        console.log(`\nTestimonials Count: ${testimonialCount}`);

        // 3. Check Site Assets
        const assetCount = await prisma.pageAsset.count();
        console.log(`\nSite Assets Count: ${assetCount}`);

    } catch (e) {
        console.error('Audit Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

audit();
