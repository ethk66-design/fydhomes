/**
 * Migrate Images from Supabase to Local Filesystem
 * 
 * 1. Finds all PropertyImages with 'supabase.co' in URL.
 * 2. Downloads them to 'public/uploads/properties/{id}/'.
 * 3. Updates the database record to point to '/uploads/properties/{id}/{filename}'.
 * 
 * Run with: node scripts/migrate-storage-local.js
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const https = require('https');
const { promisify } = require('util');
const stream = require('stream');
const pipeline = promisify(stream.pipeline);

const prisma = new PrismaClient();

async function downloadFile(url, destPath) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);

    // Ensure directory exists
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const fileStream = fs.createWriteStream(destPath);
    await new Promise((resolve, reject) => {
        response.body.pipe(fileStream); // This requires node-fetch or similar if fetch returns a node stream, 
        // but global fetch in Node 18+ returns a web stream usually.
        // Let's use arrayBuffer for simplicity and safety across versions.
    });
}

// Robust download using arrayBuffer (Node 18+ native fetch)
async function saveFile(url, destPath) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const dir = path.dirname(destPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(destPath, buffer);
        return true;
    } catch (e) {
        console.error(`Error downloading ${url}:`, e.message);
        return false;
    }
}

async function main() {
    console.log('🚀 Starting Supabase -> Local Migration...');

    // 1. Find target images
    const imagesToMigrate = await prisma.propertyImage.findMany({
        where: {
            url: {
                contains: 'supabase.co'
            }
        },
        include: {
            property: {
                select: { id: true, title: true }
            }
        }
    });

    console.log(`Found ${imagesToMigrate.length} images to migrate.`);

    let successCount = 0;
    let failCount = 0;

    // 2. Process in Batches
    const BATCH_SIZE = 5;
    for (let i = 0; i < imagesToMigrate.length; i += BATCH_SIZE) {
        const batch = imagesToMigrate.slice(i, i + BATCH_SIZE);
        await Promise.all(batch.map(async (img) => {
            const propId = img.property_id;
            const oldUrl = img.url;

            let filename = path.basename(new URL(oldUrl).pathname);
            if (!filename) filename = `image-${img.id}.jpg`;
            filename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');

            const localRelativePath = `/uploads/properties/${propId}/${filename}`;
            const localAbsolutePath = path.join(process.cwd(), 'public', 'uploads', 'properties', propId, filename);

            const downloaded = await saveFile(oldUrl, localAbsolutePath);

            if (downloaded) {
                try {
                    await prisma.propertyImage.update({
                        where: { id: img.id },
                        data: { url: localRelativePath }
                    });
                    successCount++;
                } catch (dbErr) {
                    console.error(`❌ DB Update Failed: ${dbErr.message}`);
                    failCount++;
                }
            } else {
                console.error(`❌ Download Failed: ${oldUrl}`);
                failCount++;
            }
        }));

        process.stdout.write(`.`); // Progress dot per batch
    }

    console.log('\n=======================================');
    console.log(`Migration Complete.`);
    console.log(`✅ Success: ${successCount}`);
    console.log(`❌ Failed:  ${failCount}`);
    console.log('=======================================');
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
