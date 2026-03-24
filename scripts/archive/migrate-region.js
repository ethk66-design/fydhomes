/**
 * Supabase Region Migration Script
 * 
 * Phase 1: Deploy schema to new US project via Prisma
 * Phase 2: Migrate all data from old India project to new US project
 * Phase 3: Migrate storage images
 */

const { createClient } = require('@supabase/supabase-js');

// OLD India project (source)
const OLD_URL = 'https://vexsmxrfxbatpyelugch.supabase.co';
const OLD_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZleHNteHJmeGJhdHB5ZWx1Z2NoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDcwNzkwMCwiZXhwIjoyMDg2MjgzOTAwfQ.MSWhyE0hrk5DEqATa4EcZU7fSBpTtjJXi-WLHYBRJfk';

// NEW US project (destination)
const NEW_URL = 'https://oxcvbyprrvbnmoyanpgu.supabase.co';
const NEW_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94Y3ZieXBycnZibm1veWFucGd1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjEwMjE3MCwiZXhwIjoyMDg3Njc4MTcwfQ.5KztY2yg730lLwp96xbB9ACkgwrG_wlCzOO3PxdSH-Q';

const oldDb = createClient(OLD_URL, OLD_KEY);
const newDb = createClient(NEW_URL, NEW_KEY);

// Tables to migrate in order (respecting foreign keys)
const TABLES = [
    'users',
    'sessions',
    'testimonials',
    'page_seo',
    'page_assets',
    'properties',
    'property_images',
    'property_tags',
    'leads',
];

async function checkConnectivity() {
    console.log('=== Checking Connectivity ===');

    // Check old project
    console.log('Checking OLD (India) project...');
    try {
        const { count, error } = await oldDb.from('properties').select('*', { count: 'exact', head: true });
        if (error) throw error;
        console.log(`  ✅ OLD project accessible. Properties count: ${count}`);
    } catch (err) {
        console.log(`  ❌ OLD project NOT accessible: ${err.message}`);
        console.log('  ⚠️  Cannot migrate data until India region comes back online.');
        return { oldOk: false, newOk: false };
    }

    // Check new project
    console.log('Checking NEW (US) project...');
    try {
        const { error } = await newDb.from('properties').select('*', { count: 'exact', head: true });
        if (error && error.code === 'PGRST204') {
            console.log('  ✅ NEW project accessible (tables not yet created - expected)');
        } else if (error) {
            console.log(`  ⚠️  NEW project response: ${error.message} (code: ${error.code})`);
        } else {
            console.log('  ✅ NEW project accessible');
        }
        return { oldOk: true, newOk: true };
    } catch (err) {
        console.log(`  ❌ NEW project NOT accessible: ${err.message}`);
        return { oldOk: true, newOk: false };
    }
}

async function migrateTable(tableName) {
    console.log(`\nMigrating table: ${tableName}...`);

    // Fetch all rows from old DB
    const { data, error: fetchError } = await oldDb
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: true });

    if (fetchError) {
        console.log(`  ❌ Error reading ${tableName}: ${fetchError.message}`);
        return 0;
    }

    if (!data || data.length === 0) {
        console.log(`  ⏭️  No rows to migrate`);
        return 0;
    }

    console.log(`  📦 Found ${data.length} rows`);

    // Insert in batches of 50
    const batchSize = 50;
    let inserted = 0;

    for (let i = 0; i < data.length; i += batchSize) {
        const batch = data.slice(i, i + batchSize);
        const { error: insertError } = await newDb
            .from(tableName)
            .upsert(batch, { onConflict: 'id' });

        if (insertError) {
            console.log(`  ❌ Error inserting batch ${i / batchSize + 1}: ${insertError.message}`);
        } else {
            inserted += batch.length;
        }
    }

    console.log(`  ✅ Migrated ${inserted}/${data.length} rows`);
    return inserted;
}

async function migrateStorage() {
    console.log('\n=== Migrating Storage ===');

    // List all files in old bucket
    const { data: files, error: listError } = await oldDb.storage
        .from('property-images')
        .list('', { limit: 1000 });

    if (listError) {
        console.log(`❌ Error listing storage: ${listError.message}`);
        return;
    }

    if (!files || files.length === 0) {
        console.log('⏭️  No files to migrate');
        return;
    }

    console.log(`📦 Found ${files.length} top-level items in storage`);

    // Recursively list and migrate
    await migrateStorageFolder('');
}

async function migrateStorageFolder(prefix) {
    const { data: items, error } = await oldDb.storage
        .from('property-images')
        .list(prefix, { limit: 1000 });

    if (error || !items) return;

    for (const item of items) {
        const path = prefix ? `${prefix}/${item.name}` : item.name;

        if (item.id === null) {
            // It's a folder, recurse
            await migrateStorageFolder(path);
        } else {
            // It's a file, download and upload
            try {
                const { data: fileData, error: dlError } = await oldDb.storage
                    .from('property-images')
                    .download(path);

                if (dlError) {
                    console.log(`  ❌ Download failed: ${path} - ${dlError.message}`);
                    continue;
                }

                const { error: upError } = await newDb.storage
                    .from('property-images')
                    .upload(path, fileData, {
                        contentType: fileData.type || 'image/jpeg',
                        upsert: true
                    });

                if (upError) {
                    console.log(`  ❌ Upload failed: ${path} - ${upError.message}`);
                } else {
                    console.log(`  ✅ ${path}`);
                }
            } catch (err) {
                console.log(`  ❌ Error: ${path} - ${err.message}`);
            }
        }
    }
}

async function updateImageUrls() {
    console.log('\n=== Updating Image URLs ===');

    // Update property_images URLs: old project ref -> new project ref
    const oldRef = 'vexsmxrfxbatpyelugch';
    const newRef = 'oxcvbyprrvbnmoyanpgu';

    const { data: images, error } = await newDb
        .from('property_images')
        .select('id, url');

    if (error || !images) {
        console.log(`❌ Error fetching images: ${error?.message}`);
        return;
    }

    let updated = 0;
    for (const img of images) {
        if (img.url.includes(oldRef)) {
            const newUrl = img.url.replace(oldRef, newRef);
            const { error: upErr } = await newDb
                .from('property_images')
                .update({ url: newUrl })
                .eq('id', img.id);

            if (!upErr) updated++;
        }
    }
    console.log(`✅ Updated ${updated} image URLs`);

    // Also update page_assets
    const { data: assets, error: assetErr } = await newDb
        .from('page_assets')
        .select('id, asset_url');

    if (!assetErr && assets) {
        let assetUpdated = 0;
        for (const asset of assets) {
            if (asset.asset_url.includes(oldRef)) {
                const newUrl = asset.asset_url.replace(oldRef, newRef);
                const { error: upErr } = await newDb
                    .from('page_assets')
                    .update({ asset_url: newUrl })
                    .eq('id', asset.id);
                if (!upErr) assetUpdated++;
            }
        }
        console.log(`✅ Updated ${assetUpdated} page asset URLs`);
    }

    // Update testimonials image URLs
    const { data: testimonials, error: testErr } = await newDb
        .from('testimonials')
        .select('id, image_url');

    if (!testErr && testimonials) {
        let testUpdated = 0;
        for (const t of testimonials) {
            if (t.image_url && t.image_url.includes(oldRef)) {
                const newUrl = t.image_url.replace(oldRef, newRef);
                const { error: upErr } = await newDb
                    .from('testimonials')
                    .update({ image_url: newUrl })
                    .eq('id', t.id);
                if (!upErr) testUpdated++;
            }
        }
        console.log(`✅ Updated ${testUpdated} testimonial image URLs`);
    }
}

async function main() {
    console.log('╔═══════════════════════════════════════════╗');
    console.log('║  Supabase Migration: India → US East      ║');
    console.log('╚═══════════════════════════════════════════╝');

    // Step 1: Check connectivity
    const { oldOk, newOk } = await checkConnectivity();

    if (!oldOk) {
        console.log('\n⛔ Cannot proceed — OLD (India) project is still down.');
        console.log('   Wait for Supabase to resolve the India region outage,');
        console.log('   then run this script again.');
        process.exit(1);
    }

    if (!newOk) {
        console.log('\n⛔ Cannot proceed — NEW (US) project is not accessible.');
        console.log('   Make sure the project is fully provisioned.');
        process.exit(1);
    }

    // Step 2: Migrate data tables
    console.log('\n=== Migrating Database Tables ===');
    for (const table of TABLES) {
        await migrateTable(table);
    }

    // Step 3: Migrate storage
    await migrateStorage();

    // Step 4: Update image URLs
    await updateImageUrls();

    console.log('\n╔═══════════════════════════════════════════╗');
    console.log('║  ✅ Migration Complete!                    ║');
    console.log('╚═══════════════════════════════════════════╝');
    console.log('\nNext steps:');
    console.log('1. Update .env with new credentials');
    console.log('2. Update Vercel environment variables');
    console.log('3. Redeploy to Vercel');
}

main().catch(console.error);
