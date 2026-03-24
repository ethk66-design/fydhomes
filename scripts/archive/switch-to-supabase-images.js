const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const https = require('https');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Configuration
const SUPABASE_PROJECT_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vexsmxrfxbatpyelugch.supabase.co';
const BUCKET_NAME = 'property-images';
const BASE_STORAGE_URL = `${SUPABASE_PROJECT_URL}/storage/v1/object/public/${BUCKET_NAME}`;

// Env for Uploads
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZleHNteHJmeGJhdHB5ZWx1Z2NoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDcwNzkwMCwiZXhwIjoyMDg2MjgzOTAwfQ.MSWhyE0hrk5DEqATa4EcZU7fSBpTtjJXi-WLHYBRJfk';
const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_KEY);

// Helper to check if URL exists (HEAD request)
function checkUrlExists(url) {
    return new Promise((resolve) => {
        const req = https.request(url, { method: 'HEAD' }, (res) => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
        req.on('error', () => resolve(false));
        req.end();
    });
}

function getFileNameFromUrl(url) {
    try {
        const u = new URL(url);
        return path.basename(u.pathname) || `image-${Date.now()}.jpg`;
    } catch (e) {
        return `image-${Date.now()}.jpg`;
    }
}

function getSafeFileName(fileName) {
    return fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
}

// Helper to download image
async function downloadImage(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        return await response.arrayBuffer();
    } catch (error) {
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
        console.error(`Upload failed: ${error.message}`);
        return null;
    }

    const { data: publicUrlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
}

async function switchToSupabase() {
    console.log('--- SWITCHING IMAGES TO SUPABASE URLs ---');
    console.log(`Base URL: ${BASE_STORAGE_URL}`);

    try {
        // 1. Get all images that are NOT yet Supabase URLs
        const images = await prisma.propertyImage.findMany({
            where: {
                NOT: {
                    url: { contains: 'supabase.co' }
                }
            },
            include: { property: { select: { title: true } } }
        });

        console.log(`Found ${images.length} images still hosted externally (WP).`);

        let successCount = 0;
        let failCount = 0;

        for (const img of images) {
            const currentUrl = img.url;
            const propertyId = img.property_id;

            // Construct expected Supabase Path
            const fileName = getFileNameFromUrl(currentUrl);
            const safeName = getSafeFileName(fileName);
            // Path: migrated/{propertyId}/{safeName}
            const supabaseUrl = `${BASE_STORAGE_URL}/migrated/${propertyId}/${safeName}`;

            // Verify if it exists in Supabase
            const exists = await checkUrlExists(supabaseUrl);

            if (exists) {
                // Update DB
                await prisma.propertyImage.update({
                    where: { id: img.id },
                    data: { url: supabaseUrl }
                });
                console.log(`✅ Switched (Existing): ${img.property?.title.substring(0, 20)}... -> ${safeName}`);
                successCount++;
            } else {
                console.log(`⚠️  Not Found in Supabase. Uploading: ${fileName}...`);

                // Download from WP
                const buffer = await downloadImage(currentUrl);
                if (buffer) {
                    // Upload to Supabase
                    const contentType = 'image/jpeg';
                    const uploadKey = `migrated/${propertyId}/${safeName}`;

                    const newUrl = await uploadToSupabase(buffer, uploadKey, contentType);

                    if (newUrl) {
                        await prisma.propertyImage.update({
                            where: { id: img.id },
                            data: { url: newUrl }
                        });
                        console.log(`✅ Uploaded & Switched: ${safeName}`);
                        successCount++;
                    } else {
                        console.error(`❌ Upload Failed for: ${currentUrl}`);
                        failCount++;
                    }
                } else {
                    console.error(`❌ Download Failed from WP: ${currentUrl}`);
                    failCount++;
                }
            }
        }

        console.log(`\n--- SUMMARY ---`);
        console.log(`Switched to Supabase: ${successCount}`);
        console.log(`Failed / Not Found: ${failCount}`);

    } catch (e) {
        console.error('Switch Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

switchToSupabase();
