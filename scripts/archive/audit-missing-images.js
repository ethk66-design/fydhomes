const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function audit() {
    console.log('--- MISSING PROPERTY IMAGES AUDIT ---');
    console.log(`Checking properties with <= 0 images...`);

    try {
        const properties = await prisma.property.findMany({
            include: { images: true },
        });

        const missing = properties.filter(p => p.images.length === 0);
        const present = properties.filter(p => p.images.length > 0);

        console.log(`\nAudit Results:`);
        console.log(`  Properties Checked: ${properties.length}`);
        console.log(`  With Valid Images: ${present.length}`);
        console.log(`[ALERT] With NO Images: ${missing.length}`);

        if (missing.length > 0) {
            console.log(`\n--- LIST OF PROPERTIES MISSING IMAGES ---`);
            missing.forEach(p => {
                console.log(`[x] Missing: ${p.title.padEnd(60)} | ID: ${p.id}`);
            });
            console.log(`\n[ACTION REQUIRED]: These ${missing.length} properties need image restoration.`);
        } else {
            console.log(`\n[SUCCESS]: All properties have at least one image.`);
        }

    } catch (e) {
        console.error('Audit Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

audit();
