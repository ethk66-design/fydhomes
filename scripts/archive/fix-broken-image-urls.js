/**
 * fix-broken-image-urls.js
 * 
 * Fixes broken image URLs in the database by rewriting the dead 
 * `fydhomes.jiobase.com` proxy domain back to the correct Supabase host
 * `vexsmxrfxbatpyelugch.supabase.co`.
 *
 * Usage:
 *   Dry-run (preview only, no changes):  node scripts/fix-broken-image-urls.js
 *   Execute (apply fixes):               node scripts/fix-broken-image-urls.js --execute
 *
 * Requires: DATABASE_URL or DIRECT_URL set in environment (or loaded via dotenv from vercel.env)
 */

const { PrismaClient } = require('@prisma/client');

// Load environment from vercel.env if no DATABASE_URL is set
if (!process.env.DATABASE_URL) {
    const fs = require('fs');
    const path = require('path');
    const envPath = path.join(__dirname, '..', 'vercel.env');
    if (fs.existsSync(envPath)) {
        const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
        for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) continue;
            const eqIndex = trimmed.indexOf('=');
            if (eqIndex > 0) {
                const key = trimmed.slice(0, eqIndex);
                let val = trimmed.slice(eqIndex + 1);
                // Strip surrounding quotes
                if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                    val = val.slice(1, -1);
                }
                process.env[key] = val;
            }
        }
        console.log(`📁 Loaded env from ${envPath}`);
    }
}

const prisma = new PrismaClient();

const CORRECT_HOST = 'vexsmxrfxbatpyelugch.supabase.co';
const DEAD_HOST = 'fydhomes.jiobase.com';

const IS_EXECUTE = process.argv.includes('--execute');

function fixUrl(url) {
    if (!url) return url;
    let fixed = url;

    // Rewrite dead proxy domain to correct Supabase host
    fixed = fixed.replace(/https?:\/\/fydhomes\.jiobase\.com/g, `https://${CORRECT_HOST}`);

    return fixed;
}

async function fixTable({ modelName, findMany, update, idField, urlField }) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📋 Scanning: ${modelName}.${urlField}`);
    console.log('='.repeat(60));

    const records = await findMany();
    let brokenCount = 0;
    const fixes = [];

    for (const record of records) {
        const url = record[urlField];
        if (url && url.includes(DEAD_HOST)) {
            brokenCount++;
            const fixed = fixUrl(url);
            fixes.push({ id: record[idField], before: url, after: fixed });
        }
    }

    console.log(`  Total records: ${records.length}`);
    console.log(`  Broken URLs:   ${brokenCount}`);

    if (fixes.length === 0) {
        console.log('  ✅ No broken URLs found in this table.');
        return 0;
    }

    // Show up to 3 samples
    const samples = fixes.slice(0, 3);
    console.log(`\n  📝 Sample fixes (showing ${samples.length} of ${fixes.length}):`);
    for (const s of samples) {
        console.log(`    ID: ${s.id}`);
        console.log(`      BEFORE: ${s.before.substring(0, 100)}...`);
        console.log(`      AFTER:  ${s.after.substring(0, 100)}...`);
    }

    if (IS_EXECUTE) {
        console.log(`\n  🔧 Applying ${fixes.length} fixes...`);
        let fixed = 0;
        for (const f of fixes) {
            await update({
                where: { [idField]: f.id },
                data: { [urlField]: f.after }
            });
            fixed++;
            if (fixed % 50 === 0) console.log(`    ...fixed ${fixed}/${fixes.length}`);
        }
        console.log(`  ✅ Fixed ${fixed} records.`);
        return fixed;
    } else {
        console.log(`\n  ⏸️  DRY RUN — ${fixes.length} records would be fixed. Run with --execute to apply.`);
        return 0;
    }
}

async function main() {
    console.log('╔══════════════════════════════════════════════════╗');
    console.log(`║  FYD Homes — Fix Broken Image URLs              ║`);
    console.log(`║  Mode: ${IS_EXECUTE ? '🔧 EXECUTE (will modify database)' : '👀 DRY RUN (preview only)      '}  ║`);
    console.log('╚══════════════════════════════════════════════════╝');

    let totalFixed = 0;

    // 1. PropertyImage.url
    totalFixed += await fixTable({
        modelName: 'PropertyImage',
        findMany: () => prisma.propertyImage.findMany({ select: { id: true, url: true } }),
        update: (args) => prisma.propertyImage.update(args),
        idField: 'id',
        urlField: 'url',
    });

    // 2. PageAsset.asset_url
    totalFixed += await fixTable({
        modelName: 'PageAsset',
        findMany: () => prisma.pageAsset.findMany({ select: { id: true, asset_url: true } }),
        update: (args) => prisma.pageAsset.update(args),
        idField: 'id',
        urlField: 'asset_url',
    });

    // 3. PageSeo.og_image
    totalFixed += await fixTable({
        modelName: 'PageSeo',
        findMany: () => prisma.pageSeo.findMany({ select: { id: true, og_image: true } }),
        update: (args) => prisma.pageSeo.update(args),
        idField: 'id',
        urlField: 'og_image',
    });

    // 4. Testimonial.image_url
    totalFixed += await fixTable({
        modelName: 'Testimonial',
        findMany: () => prisma.testimonial.findMany({ select: { id: true, image_url: true } }),
        update: (args) => prisma.testimonial.update(args),
        idField: 'id',
        urlField: 'image_url',
    });

    console.log(`\n${'═'.repeat(60)}`);
    if (IS_EXECUTE) {
        console.log(`🎉 DONE — Fixed ${totalFixed} total records across all tables.`);
    } else {
        console.log(`👀 DRY RUN COMPLETE — Run with --execute to apply fixes.`);
    }
    console.log('═'.repeat(60));
}

main()
    .catch((err) => {
        console.error('❌ Fatal error:', err);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
