
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkImages() {
    console.log('Checking Property Images...');

    // Get unique URL sources (e.g., supabase, wp-content, others)
    const images = await prisma.propertyImage.findMany({ select: { url: true } });

    console.log(`Total Images found: ${images.length}`);

    const sources = images.reduce((acc, img) => {
        let domain = 'unknown';
        try {
            const url = new URL(img.url);
            domain = url.hostname;
        } catch (e) {
            domain = 'invalid-url';
        }
        acc[domain] = (acc[domain] || 0) + 1;
        return acc;
    }, {});

    console.log('Image Sources Breakdown:', sources);

    // Show a few samples
    console.log('Samples:', images.slice(0, 3));

    await prisma.$disconnect();
}

checkImages();
