const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('🚀 Starting Hostinger Database Initialization...');

    try {
        // 1. connection check
        await prisma.$connect();
        console.log('✅ Connected to Database');

        // 2. Create Admin User
        const email = 'admin@fydhomes.com';
        const password = 'FydAdmin@2024';
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            console.log('⚠️ Admin user already exists. Updating password...');
            await prisma.user.update({
                where: { email },
                data: { password_hash: hashedPassword },
            });
            console.log('✅ Admin password updated.');
        } else {
            // Try to create user table row
            // Note: If this fails, it means 'npx prisma db push' wasn't run
            await prisma.user.create({
                data: {
                    email,
                    password_hash: hashedPassword,
                    full_name: 'Super Admin',
                    role: 'admin',
                },
            });
            console.log('✅ Admin user created successfully');
        }

        console.log('\n==================================================');
        console.log('Credentials:');
        console.log(`Email:    ${email}`);
        console.log(`Password: ${password}`);
        console.log('==================================================');

    } catch (error) {
        console.error('❌ Initialization Failed:', error);

        if (error.code === 'P2010' || error.message.includes("Table") && error.message.includes("doesn't exist")) {
            console.error('\n⚠️  Run "npx prisma db push" first to create the tables!');
        }
    } finally {
        await prisma.$disconnect();
    }
}

main();
