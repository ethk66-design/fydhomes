const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function main() {
    const db = new PrismaClient();

    const hash = await bcrypt.hash('FydAdmin2024!', 12);

    const user = await db.user.upsert({
        where: { email: 'admin@fydhomes.in' },
        update: { password_hash: hash, role: 'admin' },
        create: {
            email: 'admin@fydhomes.in',
            password_hash: hash,
            full_name: 'FYD Admin',
            role: 'admin'
        }
    });

    console.log('Admin user created:', user.email, user.role);
    await db.$disconnect();
}

main().catch(e => {
    console.error(e);
    process.exit(1);
});
