const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testParkingUpdate() {
    try {
        // 1. Get a test property
        const prop = await prisma.property.findFirst();
        if (!prop) {
            console.log('No property found.');
            return;
        }

        console.log(`Testing Property: ${prop.title} (${prop.id})`);
        console.log(`Current Parkings: ${prop.parkings}`);

        // 2. Update Parkings
        const newVal = (prop.parkings || 0) + 1;
        console.log(`Updating to: ${newVal}`);

        await prisma.property.update({
            where: { id: prop.id },
            data: { parkings: newVal }
        });

        // 3. Verify
        const updated = await prisma.property.findUnique({ where: { id: prop.id } });
        console.log(`Updated Parkings in DB: ${updated.parkings}`);

        if (updated.parkings === newVal) {
            console.log('✅ DB Update Successful');
        } else {
            console.error('❌ DB Update Failed');
        }

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

testParkingUpdate();
