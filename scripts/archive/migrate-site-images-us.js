const { PrismaClient } = require('@prisma/client');
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// --- Configuration ---
const BUCKET_NAME = 'site-images';

// Source (India) configuration - for downloading
const sourceUrlBase = 'https://vexsmxrfxbatpyelugch.supabase.co/storage/v1/object/public/';

// --- Env Setup ---
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

const targetSupabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL;
const targetSupabaseKey = envConfig.SUPABASE_SERVICE_ROLE_KEY || envConfig.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!targetSupabaseUrl || !targetSupabaseKey) {
    console.error("❌ Missing Target Supabase credentials in .env");
    process.exit(1);
}

// Supabase client for Target (US) Storage
const targetSupabase = createClient(targetSupabaseUrl, targetSupabaseKey, {
    auth: { persistSession: false }
});

// --- Helper Functions ---

async function downloadImage(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        return await response.arrayBuffer();
    } catch (error) {
        console.error(`   ❌ Failed to download: ${url} - Error: ${error.message}`);
        return null;
    }
}

async function uploadToSupabase(buffer, filePath, contentType) {
    const { data, error } = await targetSupabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, buffer, {
            contentType: contentType,
            upsert: true
        });

    if (error) {
        throw new Error(`Upload failed: ${error.message}`);
    }

    const { data: publicUrlData } = targetSupabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
}

function getPathFromUrl(url) {
    try {
        const u = new URL(url);
        // Extract the path after the bucket name
        // Example: /storage/v1/object/public/site-images/image.jpg
        const pathParts = u.pathname.split('/');
        const bucketIndex = pathParts.indexOf(BUCKET_NAME);
        if (bucketIndex !== -1 && bucketIndex < pathParts.length - 1) {
            return pathParts.slice(bucketIndex + 1).join('/');
        }
        return path.basename(u.pathname);
    } catch (e) {
        return `image-${Date.now()}.jpg`;
    }
}

async function processImage(imageRecord) {
    const imgUrl = imageRecord.url;

    console.log(`\nProcessing Image ID: ${imageRecord.id} (Type: ${imageRecord.type})`);
    console.log(`   ⬇️  Migrating: ${imgUrl}`);

    const buffer = await downloadImage(imgUrl);
    if (!buffer) {
        console.warn(`   ⚠️  Skipping image (download failed), keeping original URL.`);
        return;
    }

    const storagePath = getPathFromUrl(imgUrl);

    try {
        // Setup content type guessing (simple)
        const ext = path.extname(storagePath).toLowerCase();
        let contentType = 'image/jpeg';
        if (ext === '.png') contentType = 'image/png';
        if (ext === '.webp') contentType = 'image/webp';
        if (ext === '.gif') contentType = 'image/gif';
        if (ext === '.svg') contentType = 'image/svg+xml';

        // Upload to Target Supabase Storage
        const newPublicUrl = await uploadToSupabase(buffer, storagePath, contentType);
        console.log(`   ✅ Uploaded to: ${newPublicUrl}`);

        // Update DB using Prisma
        await prisma.pageAsset.update({
            where: { id: imageRecord.id },
            data: { url: newPublicUrl }
        });

        console.log(`   💾 Database Updated successfully.`);

    } catch (err) {
        console.error(`   ❌ Upload Error: ${err.message}`);
    }
}

// --- Main Execution ---

async function migrateSiteImages() {
    console.log("🚀 Starting Site Image Migration (India -> US)...");

    try {
        // 1. Fetch images that contain the old India project URL
        const images = await prisma.pageAsset.findMany({
            where: {
                asset_url: {
                    contains: 'vexsmxrfxbatpyelugch'
                }
            }
        });

        console.log(`Found ${images.length} site images requiring migration.`);

        // 2. Process in chunks
        for (const image of images) {
            await processImage(image);
        }

        console.log("\n🏁 Site Image Migration Complete.");

    } catch (error) {
        console.error("Migration failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

migrateSiteImages();
