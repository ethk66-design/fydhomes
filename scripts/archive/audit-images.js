const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function auditImages() {
    console.log("🔍 Auditing Property Images (via Prisma)...");

    try {
        const images = await prisma.propertyImage.findMany({
            include: {
                property: {
                    select: { title: true }
                }
            }
        });

        let externalCount = 0;
        let internalCount = 0;
        let externalDomains = new Set();
        let propertiesWithExternalImages = new Map();

        for (const img of images) {
            if (!img.url) continue;

            // Check if URL is external (not Supabase)
            const isExternal = !img.url.includes('supabase.co');

            if (isExternal) {
                externalCount++;
                try {
                    const u = new URL(img.url);
                    if (!u.hostname.includes('supabase.co')) {
                        externalDomains.add(u.hostname);
                    }
                } catch (e) { }

                // Group by property for reporting
                const propId = img.property_id;
                const propTitle = img.property?.title || 'Unknown Property';

                if (!propertiesWithExternalImages.has(propId)) {
                    propertiesWithExternalImages.set(propId, {
                        title: propTitle,
                        count: 0,
                        example: img.url
                    });
                }
                propertiesWithExternalImages.get(propId).count++;
            } else {
                internalCount++;
            }
        }

        console.log("\n---------------------------------------------------");
        console.log(`📊 Audit Results:`);
        console.log(`   - Total Images Scanned: ${images.length}`);
        console.log(`   - Safe (Supabase Storage): ${internalCount}`);
        console.log(`   - AT RISK (External/WordPress): ${externalCount}`);

        if (propertiesWithExternalImages.size > 0) {
            console.log(`   - Properties affected: ${propertiesWithExternalImages.size}`);
            console.log(`\n⚠️  Sample of properties with external images:`);

            let shown = 0;
            for (const [id, data] of propertiesWithExternalImages) {
                if (shown >= 5) break;
                console.log(`   - "${data.title}": ${data.count} external images`);
                console.log(`     Example: ${data.example}`);
                shown++;
            }
            if (propertiesWithExternalImages.size > 5) {
                console.log(`   ... and ${propertiesWithExternalImages.size - 5} more.`);
            }
        }

        if (externalDomains.size > 0) {
            console.log(`\n   - External Domains found: ${Array.from(externalDomains).join(', ')}`);
        }
        console.log("---------------------------------------------------\n");

    } catch (error) {
        console.error("Error auditing images:", error);
    } finally {
        await prisma.$disconnect();
    }
}

auditImages();
