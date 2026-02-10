
const { PrismaClient } = require('@prisma/client');
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// --- Configuration ---
const BUCKET_NAME = 'property-images';

// --- Env Setup ---
// We still need env for Supabase Storage
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

const supabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envConfig.SUPABASE_SERVICE_ROLE_KEY || envConfig.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!envConfig.SUPABASE_SERVICE_ROLE_KEY && !envConfig.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY) {
    console.warn("⚠️  WARNING: Using ANON KEY. If RLS is enforced, updates might fail.");
}

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Missing Supabase credentials.");
    process.exit(1);
}

// Supabase client only for Storage
const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false }
});

// --- Helper Functions ---

async function downloadImage(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        return await response.arrayBuffer();
    } catch (error) {
        console.error(`   ❌ Failed to download: ${url}`, error.message);
        return null;
    }
}

async function uploadToSupabase(buffer, filePath, contentType) {
    const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, buffer, {
            contentType: contentType,
            upsert: true
        });

    if (error) {
        throw new Error(`Upload failed: ${error.message}`);
    }

    const { data: publicUrlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
}

function getFileNameFromUrl(url) {
    try {
        const u = new URL(url);
        return path.basename(u.pathname) || `image-${Date.now()}.jpg`;
    } catch (e) {
        return `image-${Date.now()}.jpg`;
    }
}

async function processImage(imageRecord) {
    const imgUrl = imageRecord.url;
    const propertyTitle = imageRecord.property?.title || 'Unknown';
    const propertyId = imageRecord.property_id;

    console.log(`\nProcessing Image ID: ${imageRecord.id} (Property: ${propertyTitle})`);
    console.log(`   ⬇️  Migrating: ${imgUrl}`);

    const buffer = await downloadImage(imgUrl);
    if (!buffer) {
        console.warn(`   ⚠️  Skipping image (download failed), keeping original URL.`);
        return;
    }

    const fileName = getFileNameFromUrl(imgUrl);
    // Clean filename to be safe
    const safeFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const storagePath = `migrated/${propertyId}/${safeFileName}`;

    try {
        // Setup content type guessing (simple)
        const ext = path.extname(safeFileName).toLowerCase();
        let contentType = 'image/jpeg';
        if (ext === '.png') contentType = 'image/png';
        if (ext === '.webp') contentType = 'image/webp';
        if (ext === '.gif') contentType = 'image/gif';

        // Upload to Supabase Storage
        const publicUrl = await uploadToSupabase(buffer, storagePath, contentType);
        console.log(`   ✅ Uploaded: ${storagePath}`);

        // Update DB using Prisma
        await prisma.propertyImage.update({
            where: { id: imageRecord.id },
            data: { url: publicUrl }
        });

        console.log(`   💾 Database Updated successfully.`);

    } catch (err) {
        console.error(`   ❌ Upload Error: ${err.message}`);
    }
}

// --- Main Execution ---

async function migrateAll() {
    console.log("🚀 Starting Critical Image Migration (Prisma + Supabase)...");

    try {
        // 1. Fetch all images
        const images = await prisma.propertyImage.findMany({
            include: {
                property: { select: { title: true } }
            }
        });

        console.log(`Found ${images.length} total images.`);

        // 2. Filter images that need migration
        const imagesToMigrate = images.filter(img =>
            img.url && !img.url.includes('supabase.co')
        );

        console.log(`Images requiring migration: ${imagesToMigrate.length}`);

        // 3. Process in chunks
        for (const image of imagesToMigrate) {
            await processImage(image);
        }

        console.log("\n🏁 Migration Complete.");

    } catch (error) {
        console.error("Migration failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

migrateAll();
