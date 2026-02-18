const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient({
    log: ['info', 'warn', 'error'],
});

async function auditDatabase() {
    console.log('🔍 Starting Database Integrity Audit...');
    console.log('Using DATABASE_URL:', process.env.DATABASE_URL ? '***PRESENT***' : 'MISSING');

    try {
        console.log('Connecting to database...');
        // 1. Check for Orphaned Images
        const allImages = await prisma.propertyImage.findMany({
            select: { id: true, property_id: true, url: true }
        });
        console.log(`Fetched ${allImages.length} images.`);

        const orphanedImages = [];
        for (const img of allImages) {
            // Optimization: Could use findMany with 'in' clause, but loop is fine for audit script of this size
            const prop = await prisma.property.findUnique({ where: { id: img.property_id } });
            if (!prop) orphanedImages.push(img);
        }

        console.log(`\n📸 Image Audit:`);
        console.log(`- Total Images: ${allImages.length}`);
        console.log(`- Orphaned Images: ${orphanedImages.length}`);

        // 2. Data Integrity
        console.log(`\n🏠 Property Audit:`);
        const allProps = await prisma.property.findMany({ select: { id: true, price: true, title: true } });
        console.log(`- Total Properties: ${allProps.length}`);

        let invalidPriceCount = 0;
        let missingTitleCount = 0;

        for (const p of allProps) {
            if (!p.title || p.title.trim() === '') missingTitleCount++;

            // Price is a string, check if it's potentially invalid (empty or negative sign)
            if (!p.price || p.price.trim() === '') {
                invalidPriceCount++;
            } else if (p.price.includes('-') && !p.price.includes('- ')) {
                // Rough check for negative numbers, though price might be "100-200" (range)
                // So this check is just a heuristic
                // console.log(`  Potentially negative price: ${p.price}`);
            }
        }

        console.log(`- Properties with empty price: ${invalidPriceCount}`);
        console.log(`- Properties with missing title: ${missingTitleCount}`);

        // 3. User Audit
        const users = await prisma.user.count();
        console.log(`\n👤 User Count: ${users}`);

    } catch (error) {
        console.error('❌ Audit Failed:', error);
    } finally {
        console.log('Disconnecting...');
        await prisma.$disconnect();
        console.log('Disconnected. Done.');
        process.exit(0);
    }
}

auditDatabase();
