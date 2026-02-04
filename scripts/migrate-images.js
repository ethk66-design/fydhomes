
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// --- Configuration ---
const BUCKET_NAME = 'property-images';
const CONCURRENCY_LIMIT = 3; // Upload 3 properties in parallel

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

const supabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envConfig.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// Note: Ideally use SERVICE_ROLE_KEY for admin tasks, but ANON might work if RLS allows or is disabled for upload.
// If typical Row Level Security is on, we might need to authenticate or use service role.
// Warning logging if only anon key found.
if (!envConfig.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY) {
    console.warn("⚠️  WARNING: Using ANON KEY. If RLS is enforced, updates might fail. Please ensure you have a SERVICE_ROLE_KEY in .env if this fails.");
}

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Missing Supabase credentials.");
    process.exit(1);
}

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

async function processProperty(property) {
    const newImages = [];
    let modified = false;

    console.log(`\nProcessing: ${property.title} (ID: ${property.id})`);

    for (const imgUrl of property.images) {
        // Check if already Supabase
        if (imgUrl.includes('supabase.co')) {
            newImages.push(imgUrl);
            continue;
        }

        console.log(`   ⬇️  Migrating: ${imgUrl}`);

        const buffer = await downloadImage(imgUrl);
        if (!buffer) {
            console.warn(`   ⚠️  Skipping image (download failed), keeping original URL.`);
            newImages.push(imgUrl);
            continue; // Keep old URL if download fails, don't break data
        }

        const fileName = getFileNameFromUrl(imgUrl);
        // Clean filename to be safe
        const safeFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
        const storagePath = `migrated/${property.id}/${safeFileName}`;

        try {
            // Setup content type guessing (simple)
            const ext = path.extname(safeFileName).toLowerCase();
            let contentType = 'image/jpeg';
            if (ext === '.png') contentType = 'image/png';
            if (ext === '.webp') contentType = 'image/webp';
            if (ext === '.gif') contentType = 'image/gif';

            const publicUrl = await uploadToSupabase(buffer, storagePath, contentType);
            console.log(`   ✅ Uploaded: ${storagePath}`);
            newImages.push(publicUrl);
            modified = true;
        } catch (err) {
            console.error(`   ❌ Upload Error: ${err.message}`);
            newImages.push(imgUrl); // Keep old if upload fails
        }
    }

    if (modified) {
        const { error } = await supabase
            .from('properties')
            .update({ images: newImages })
            .eq('id', property.id);

        if (error) {
            console.error(`   ❌ DB Update Failed: ${error.message}`);
        } else {
            console.log(`   💾 Database Updated successfully.`);
        }
    } else {
        console.log(`   ✨ No changes needed.`);
    }
}

// --- Main Execution ---

async function migrateAll() {
    console.log("🚀 Starting Critical Image Migration...");

    // 1. Fetch all properties
    const { data: properties, error } = await supabase
        .from('properties')
        .select('*');

    if (error) {
        console.error("Error fetching properties:", error);
        return;
    }

    console.log(`Found ${properties.length} properties.`);

    // 2. Filter properties that actually need migration
    const propertiesToMigrate = properties.filter(p =>
        p.images && p.images.some(url => !url.includes('supabase.co'))
    );

    console.log(`Properties requiring migration: ${propertiesToMigrate.length}`);

    // 3. Process in chunks
    // Simple for-loop for now, or Promise.all with concurrency limit
    // Doing strict sequential for safety and logging clarity
    for (const property of propertiesToMigrate) {
        await processProperty(property);
    }

    console.log("\n🏁 Migration Complete.");
}

migrateAll();
