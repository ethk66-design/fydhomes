const { PrismaClient } = require('@prisma/client');
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();
const BUCKET_NAME = 'property-images';

// Load Env
const envPath = fs.existsSync(path.join(process.cwd(), '.env.local'))
    ? path.join(process.cwd(), '.env.local')
    : path.join(process.cwd(), '.env');

console.log(`Loading env from: ${envPath}`);
const envContent = fs.readFileSync(envPath, 'utf8');
const envConfig = {};
envContent.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join('=').trim().replace(/"/g, '');
        envConfig[key] = value;
    }
});

const targetSupabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL; // Should be US
const targetSupabaseKey = envConfig.SUPABASE_SERVICE_ROLE_KEY;

if (!targetSupabaseUrl || !targetSupabaseUrl.includes('oxcvbyprrvbnmoyanpgu') || !targetSupabaseKey) {
    console.error("❌ Invalid or missing Target (US) Supabase credentials in .env");
    process.exit(1);
}

const targetSupabase = createClient(targetSupabaseUrl, targetSupabaseKey, {
    auth: { persistSession: false }
});

const axios = require('axios');

async function downloadImage(url) {
    try {
        const response = await axios({
            url: url,
            method: 'GET',
            responseType: 'arraybuffer',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`   ❌ Axios Download Failed: ${url} -> ${error.message}`);
        return null;
    }
}

const FormData = require('form-data');

async function uploadToSupabase(buffer, targetPath, contentType) {
    const formData = new FormData();
    formData.append('', buffer, { filename: 'image', contentType });

    try {
        const response = await axios({
            method: 'POST',
            url: `${targetSupabaseUrl}/storage/v1/object/property-images/${targetPath}`,
            data: formData,
            headers: {
                ...formData.getHeaders(),
                'apikey': targetSupabaseKey,
                'Authorization': `Bearer ${targetSupabaseKey}`,
                'x-upsert': 'true'
            }
        });

        if (response.status !== 200) {
            throw new Error(`Bad Status: ${response.status}`);
        }

        return `${targetSupabaseUrl}/storage/v1/object/public/property-images/${targetPath}`;
    } catch (err) {
        throw new Error(`Upload POST Failed: ${err.message}`);
    }
}

function getSimpleContentType(url) {
    if (url.toLowerCase().includes('.png')) return 'image/png';
    if (url.toLowerCase().includes('.svg')) return 'image/svg+xml';
    if (url.toLowerCase().includes('.webp')) return 'image/webp';
    if (url.toLowerCase().includes('.gif')) return 'image/gif';
    return 'image/jpeg';
}

function extractOldStoragePath(url) {
    try {
        const p = new URL(url).pathname;
        const bucketMatch = `/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/`;
        if (p.includes(bucketMatch)) {
            return p.split(bucketMatch)[1]; // Get everything after the bucket
        }

        const fallbackMatch = `/storage/v1/object/public/property-images/`; // Backup old style
        if (p.includes(fallbackMatch)) {
            return p.split(fallbackMatch)[1];
        }

        return path.basename(p);
    } catch (e) {
        return `image-${Date.now()}.jpg`;
    }
}

async function processProxyRecord(table, id, urlField, urlValue) {
    console.log(`\nProcessing ${table} ID: ${id}`);
    console.log(`   ⬇️  Downloading from Proxy: ${urlValue}`);

    if (!urlValue.includes('fydhomes.jiobase.com')) {
        console.log(`   ✅ Skipping: Not a Jiobase URL (${urlValue})`);
        return true;
    }

    const buffer = await downloadImage(urlValue);
    if (!buffer) return false;

    // Use a unified standard folder structure in the new US bucket
    const oldPath = extractOldStoragePath(urlValue);
    const targetPath = `general/${oldPath}`; // Force everything into general/ to keep it clean
    const contentType = getSimpleContentType(oldPath);

    try {
        console.log(`   ⬆️  Uploading to US Supabase: ${targetPath}`);
        const newPublicUrl = await uploadToSupabase(buffer, targetPath, contentType);

        console.log(`   ✅ US Upload Success: ${newPublicUrl}`);

        // Update DB
        if (table === 'PropertyImage') {
            await prisma.propertyImage.update({ where: { id }, data: { [urlField]: newPublicUrl } });
        } else if (table === 'PageAsset') {
            await prisma.pageAsset.update({ where: { id }, data: { [urlField]: newPublicUrl } });
        } else if (table === 'PageSeo') {
            await prisma.pageSeo.update({ where: { id }, data: { [urlField]: newPublicUrl } });
        }
        return true;
    } catch (err) {
        console.error(`   ❌ Update Error: ${err.message}`);
        return false;
    }
}

async function run() {
    console.log("🚀 Starting Final US Image Migration through Jiobase Proxy Bridge...");
    let successCount = 0;

    try {
        // Properties
        const properties = await prisma.propertyImage.findMany();
        console.log(`Found ${properties.length} total property images.`);
        for (const p of properties) {
            if (p.url) {
                const s = await processProxyRecord('PropertyImage', p.id, 'url', p.url);
                if (s) successCount++;
            }
        }

        // Assets
        const assets = await prisma.pageAsset.findMany();
        console.log(`Found ${assets.length} total page assets.`);
        for (const a of assets) {
            if (a.asset_url) {
                const s = await processProxyRecord('PageAsset', a.id, 'asset_url', a.asset_url);
                if (s) successCount++;
            }
        }

        // SEO
        const seos = await prisma.pageSeo.findMany();
        console.log(`Found ${seos.length} total page seos.`);
        for (const s of seos) {
            if (s.og_image) {
                const succ = await processProxyRecord('PageSeo', s.id, 'og_image', s.og_image);
                if (succ) successCount++;
            }
        }

        console.log(`\n🏁 Migration Complete! Successfully migrated ${successCount} records to the US Storage Bucket.`);

    } catch (error) {
        console.error("Migration Script Error:", error);
    } finally {
        await prisma.$disconnect();
    }
}

run();
