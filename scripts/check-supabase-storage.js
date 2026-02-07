/**
 * Check Supabase Storage Size
 * 
 * Calculates the total size of files in the 'property-images' bucket.
 * Run with: node scripts/check-supabase-storage.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// --- Env Setup ---
// Reuse logic from checks
const envPath = fs.existsSync(path.join(process.cwd(), '.env.local'))
    ? path.join(process.cwd(), '.env.local')
    : path.join(process.cwd(), '.env');

const envContent = fs.readFileSync(envPath, 'utf8');
const envConfig = {};
envContent.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
        envConfig[parts[0].trim()] = parts.slice(1).join('=').trim().replace(/"/g, '');
    }
});

const supabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envConfig.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const BUCKET_NAME = 'property-images';

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Missing Supabase credentials.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function getFolderSize(folderPath = '') {
    let totalSize = 0;
    let fileCount = 0;
    let limit = 1000;
    let offset = 0;
    let hasMore = true;

    // Supabase storage list is flat if we don't use folders, but we do.
    // However, list() returns only items in the current folder.
    // If the structure is `migrated/{id}/{file}`, we first list `migrated/`, then iterate.

    // We'll iterate the known structure 'migrated/' folder first
    console.log(`📂 Scanning folder: ${folderPath || 'ROOT'}...`);

    const { data: items, error } = await supabase.storage
        .from(BUCKET_NAME)
        .list(folderPath, { limit: 100, offset: 0 });

    if (error) {
        console.error(`Error listing ${folderPath}:`, error.message);
        return { size: 0, count: 0 };
    }

    if (!items) return { size: 0, count: 0 };

    for (const item of items) {
        if (item.id === null) {
            // It's a folder (Supabase returns null ID for folders in some versions, or verify metadata)
            // Actually, Supabase Storage v2 list returns objects. Folders assume object with no metadata or specific properties.
            // Best way: recursive call if it looks like a folder (no size, or empty mimetype?)
            // Actually, `list` at root `migrated` returns property folders.

            // Let's assume structure is `migrated/` -> folders -> files
            if (!item.metadata) {
                // Likely a folder
                const subPath = folderPath ? `${folderPath}/${item.name}` : item.name;
                const { size, count } = await getFolderSize(subPath);
                totalSize += size;
                fileCount += count;
            } else {
                // It's a file
                totalSize += item.metadata.size;
                fileCount++;
            }
        } else {
            // It's a file
            totalSize += item.metadata.size;
            fileCount++;
        }
    }

    return { size: totalSize, count: fileCount };
}

// Optimized approach: 
// Listing recursively is hard via simple list calls if depth is unknown.
// But we know structure is likely `migrated/PROP_ID/file.jpg`.
// Let's try listing the root.

async function main() {
    console.log(`📊 Analyzing Bucket: ${BUCKET_NAME}`);

    // 1. Check 'migrated' folder
    // Note: If list returns folders, we must iterate them.
    // This could be slow.

    // Alternative: Is there a simpler way? Without SQL access to storage.objects, we must list.

    // Let's list the top level first.
    const { data: rootItems, error } = await supabase.storage
        .from(BUCKET_NAME)
        .list('migrated', { limit: 1000 }); // Limit 1000 folders

    if (error) {
        console.error("Error listing root:", error);
        return;
    }

    if (!rootItems) {
        console.log("Empty bucket or 'migrated' folder not found.");
        return;
    }

    console.log(`Found ${rootItems.length} property folders in 'migrated/'. Calculating size...`);

    let globalTotal = 0;
    let globalCount = 0;

    // Scan first 5 to estimate if too many?
    // User wants "Storage size of THIS image" -> maybe specific? 
    // I'll scan all.

    let processed = 0;
    for (const folder of rootItems) {
        if (folder.name === '.emptyFolderPlaceholder') continue;

        const path = `migrated/${folder.name}`;
        const { data: files } = await supabase.storage
            .from(BUCKET_NAME)
            .list(path);

        if (files) {
            files.forEach(f => {
                if (f.metadata) {
                    globalTotal += f.metadata.size;
                    globalCount++;
                }
            });
        }
        processed++;
        if (processed % 10 === 0) process.stdout.write('.');
    }

    console.log('\n\n✅ Analysis Complete');
    console.log(`------------------------`);
    console.log(`Total Files: ${globalCount}`);
    console.log(`Total Size:  ${(globalTotal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`             ${(globalTotal / 1024 / 1024 / 1024).toFixed(4)} GB`);
}

main();
