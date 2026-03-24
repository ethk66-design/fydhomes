const { Client } = require('pg');

const password = 'FydAdmin2026';
const ref = 'vexsmxrfxbatpyelugch';

const pools = [
    { name: 'DIRECT_URL (IPv6)', url: `postgresql://postgres:${password}@db.${ref}.supabase.co:5432/postgres` },
    { name: 'POOLER_URL aws-1 (Transaction 6543)', url: `postgresql://postgres.${ref}:${password}@aws-1-ap-south-1.pooler.supabase.com:6543/postgres` },
    { name: 'POOLER_URL aws-1 (Session 5432)', url: `postgresql://postgres.${ref}:${password}@aws-1-ap-south-1.pooler.supabase.com:5432/postgres` },
    { name: 'POOLER_URL aws-0 (Transaction 6543)', url: `postgresql://postgres.${ref}:${password}@aws-0-ap-south-1.pooler.supabase.com:6543/postgres` },
    { name: 'POOLER_URL aws-0 (Session 5432)', url: `postgresql://postgres.${ref}:${password}@aws-0-ap-south-1.pooler.supabase.com:5432/postgres` }
];

async function testPools() {
    for (const p of pools) {
        console.log(`\nTesting ${p.name}...`);
        const client = new Client({ connectionString: p.url });
        try {
            await client.connect();
            const res = await client.query('SELECT 1 as result');
            console.log(`✅ Success for ${p.name}`);
            await client.end();
        } catch (e) {
            console.log(`❌ Failed for ${p.name}: ${e.message}`);
        }
    }
}

testPools();
