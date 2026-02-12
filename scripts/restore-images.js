const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const https = require('https');

// Helper to fetch JSON from URL
function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    resolve(parsed);
                } catch (e) {
                    console.error('Failed to parse:', url, e);
                    resolve(null);
                }
            });
        }).on('error', (e) => {
            console.error('Fetch error:', url, e.message);
            resolve(null);
        });
    });
}

function decodeHtml(html) {
    if (!html) return '';
    return html.replace(/&#038;/g, "&").replace(/&amp;/g, "&").replace(/&#8211;/g, "-").replace(/&#8217;/g, "'").trim();
}

async function getMediaUrl(mediaId) {
    if (!mediaId) return null;
    try {
        const data = await fetchJson(`https://fydhomes.in/wp-json/wp/v2/media/${mediaId}`);
        return data?.source_url || null;
    } catch (e) {
        return null;
    }
}

async function restore() {
    console.log('--- RESTORING MISSING IMAGES (From WordPress) ---');

    try {
        // 1. Get ALL DB Properties to check coverage
        const propertiesToCheck = await prisma.property.findMany({
            include: { images: true }
        });

        console.log(`Found ${propertiesToCheck.length} properties in DB.`);

        // 2. Fetch Source Data (WordPress)
        console.log('Fetching source data from WordPress...');
        const wpProperties = await fetchJson('https://fydhomes.in/wp-json/wp/v2/properties?per_page=100');

        if (!wpProperties || !Array.isArray(wpProperties)) {
            console.error('Failed to fetch from WordPress API.');
            return;
        }

        console.log(`Fetched ${wpProperties.length} records from WordPress.`);

        let successCount = 0;
        let skippedCount = 0;
        let failCount = 0;

        // 3. Match & Restore
        for (const dbProp of propertiesToCheck) {
            const dbTitle = dbProp.title.toLowerCase().trim();
            if (!dbTitle) continue;

            // Find best match
            const match = wpProperties.find(wp => {
                const wpTitle = decodeHtml(wp.title.rendered).toLowerCase().trim();
                return wpTitle === dbTitle || wpTitle.includes(dbTitle) || dbTitle.includes(wpTitle);
            });

            if (match) {
                // Determine potential images from WP
                let galleryIds = [];
                if (match.property_meta && match.property_meta.fave_property_images) {
                    const rawGallery = match.property_meta.fave_property_images;
                    if (Array.isArray(rawGallery)) {
                        galleryIds = rawGallery;
                    }
                }

                const imagesToFetch = [];

                // Add Featured Image
                if (match.featured_media) {
                    imagesToFetch.push({ id: match.featured_media, isFeatured: true });
                }

                // Add Gallery Images
                if (galleryIds.length > 0) {
                    galleryIds.forEach(id => {
                        if (id != match.featured_media) { // Avoid duplicates
                            imagesToFetch.push({ id: id, isFeatured: false });
                        }
                    });
                }

                // CHECK: Do we have fewer images than WP offers?
                // Also check if we only have 1 image (likely just featured) but WP has more.
                // Or if we have 0.
                // Simple logic: If WP has candidates and we have less than that, let's update.

                if (imagesToFetch.length > dbProp.images.length) {
                    console.log(`\n🔄 UPDATING: "${dbProp.title.substring(0, 30)}..." | DB: ${dbProp.images.length} vs WP: ${imagesToFetch.length}`);

                    const imageUrls = [];
                    for (const imgObj of imagesToFetch) {
                        const url = await getMediaUrl(imgObj.id);
                        if (url) imageUrls.push(url);
                    }

                    if (imageUrls.length > 0) {
                        // Replace images
                        await prisma.propertyImage.deleteMany({ where: { property_id: dbProp.id } });

                        await prisma.property.update({
                            where: { id: dbProp.id },
                            data: {
                                images: {
                                    create: imageUrls.map((url, idx) => ({
                                        url: url,
                                        order: idx
                                    }))
                                }
                            }
                        });
                        console.log(`   ✅ RESTORED ${imageUrls.length} images.`);
                        successCount++;
                    }
                } else {
                    // console.log(`   Skipping "${dbProp.title.substring(0, 20)}..." (Has ${dbProp.images.length} images)`);
                    skippedCount++;
                }

            } else {
                // console.log(`   No match for "${dbProp.title.substring(0, 20)}..."`);
                failCount++;
            }
        }

        console.log(`\n--- SUMMARY ---`);
        console.log(`Updated/Restored: ${successCount}`);
        console.log(`Skipped (Already Good): ${skippedCount}`);
        console.log(`No Match Found: ${failCount}`);

    } catch (e) {
        console.error('Restoration Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

restore();
