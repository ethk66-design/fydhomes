
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@fydhomes.com';
    const newPassword = 'OrchidsAdmin2024';

    console.log(`Resetting password for ${email}...`);

    try {
        // 1. Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        // 2. Update the user
        const user = await prisma.user.update({
            where: { email },
            data: {
                password_hash: hashedPassword,
            },
        });

        console.log('✅ Password updated successfully!');
        console.log(`   User ID: ${user.id}`);
        console.log(`   New Password: ${newPassword}`);

    } catch (e) {
        if (e.code === 'P2025') {
            console.error('❌ User not found!');
        } else {
            console.error('❌ Error updating password:', e);
        }
    } finally {
        await prisma.$disconnect();
    }
}

main();
