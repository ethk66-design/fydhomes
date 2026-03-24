const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function checkRecentPropertyImages() {
    console.log('🔍 Checking Most Recently Updated Property...');

    try {
        const property = await prisma.property.findFirst({
            orderBy: { updated_at: 'desc' },
            include: { images: true }
        });

        if (!property) {
            console.log('❌ No properties found.');
            return;
        }

        console.log(`\n🏠 Property: ${property.title} (${property.id})`);
        console.log(`🕒 Updated At: ${property.updated_at}`);
        console.log(`🖼️ Image Count: ${property.images.length}`);

        if (property.images.length === 0) {
            console.log('⚠️ No images found for this property!');
        } else {
            property.images.forEach((img, i) => {
                console.log(`   [${i}] ${img.url}`);
                if (!img.url.startsWith('http')) {
                    console.log('      ❌ INVALID URL FORMAT');
                }
            });
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkRecentPropertyImages();
