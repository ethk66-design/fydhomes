// Push Prisma schema to NEW US Supabase project
// Updated password: FydAdmin2026

process.env.DIRECT_URL = 'postgresql://postgres:FydAdmin2026@db.oxcvbyprrvbnmoyanpgu.supabase.co:5432/postgres';
process.env.DATABASE_URL = 'postgresql://postgres.oxcvbyprrvbnmoyanpgu:FydAdmin2026@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true';

const { execSync } = require('child_process');

console.log('Pushing Prisma schema to NEW US Supabase project...');
console.log('Direct: db.oxcvbyprrvbnmoyanpgu.supabase.co:5432');

try {
    execSync('npx prisma db push --accept-data-loss', {
        env: { ...process.env },
        stdio: 'inherit',
        cwd: process.cwd(),
        timeout: 60000
    });
    console.log('\n✅ Schema pushed successfully!');
} catch (err) {
    console.error('\n❌ Schema push failed:', err.message);
    process.exit(1);
}
