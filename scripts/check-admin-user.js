
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Checking for Admin User in Hostinger DB...');
    try {
        const user = await prisma.user.findUnique({
            where: { email: 'admin@fydhomes.in' },
        });

        if (user) {
            console.log('✅ Admin user found:');
            console.log(`   ID: ${user.id}`);
            console.log(`   Email: ${user.email}`);
            console.log(`   Role: ${user.role}`);
        } else {
            console.log('❌ Admin user NOT found.');
        }
    } catch (e) {
        console.error('Error querying DB:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
