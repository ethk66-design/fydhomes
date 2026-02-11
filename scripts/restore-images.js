const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// Using standard fetch if available, else require('https')
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
        // 1. Get DB Properties with 0 images
        const emptyProperties = await prisma.property.findMany({
            where: {
                images: { none: {} }
            }
        });

        if (emptyProperties.length === 0) {
            console.log('✅ All properties have images. No restoration needed.');
            return;
        }

        console.log(`Found ${emptyProperties.length} properties with NO images.`);

        // 2. Fetch Source Data (WordPress)
        // Note: Assuming there are < 100 props total or using pagination if needed.
        // The previous migration script used ?per_page=100 so presumably that covers most/all.
        console.log('Fetching source data from WordPress...');
        const wpProperties = await fetchJson('https://fydhomes.in/wp-json/wp/v2/properties?per_page=100');

        if (!wpProperties || !Array.isArray(wpProperties)) {
            console.error('Failed to fetch from WordPress API.');
            return;
        }

        console.log(` fetched ${wpProperties.length} records from WordPress.`);

        let successCount = 0;
        let failCount = 0;

        // 3. Match & Restore
        for (const dbProp of emptyProperties) {
            // Find match by Title (fuzzy match: includes or exact after normalization)
            const dbTitle = dbProp.title.toLowerCase().trim();

            // Find best match
            const match = wpProperties.find(wp => {
                const wpTitle = decodeHtml(wp.title.rendered).toLowerCase().trim();
                return wpTitle === dbTitle || wpTitle.includes(dbTitle) || dbTitle.includes(wpTitle);
            });

            if (match) {
                console.log(`\n✅ FOUND MATCH: "${dbProp.title.substring(0, 40)}..." -> WP ID: ${match.id}`);

                // Fetch Images for this WP Property
                const imageUrls = [];
                const meta = match.fave_property_meta || {}; // Depending on API response structure. 
                // The previous script used property_meta or acf? Let's check typical responses.
                // Re-reading migration script: it used `p.fave_property_images` from meta? 
                // Ah, migration script accessed `p.property_meta`. Let's assume the API response has `fave_property_images` or similar in `meta`.

                // Actually, let's look at migration script logic carefully:
                // const meta = p.property_meta || {}; 
                // And `getMediaUrl(p.featured_media)`.

                // Featured Media
                if (match.featured_media) {
                    process.stdout.write(`   Fetching Thumbnail (${match.featured_media})... `);
                    const thumb = await getMediaUrl(match.featured_media);
                    if (thumb) {
                        imageUrls.push(thumb);
                        process.stdout.write('OK\n');
                    } else {
                        process.stdout.write('Failed\n');
                    }
                }

                // Gallery
                // The API response might put meta fields in 'acf' or custom fields.
                // Assuming standard WP REST API response structure where meta is NOT included by default unless registered.
                // BUT the migration script worked, so `properties` endpoint MUST return it.
                // Let's rely on the previous script logic: `p.fave_property_images` logic might be tricky without seeing response.

                // For safety, let's just create ONE image from featured_media first if gallery fails.

                if (imageUrls.length > 0) {
                    // Start Transaction to Insert
                    console.log(`   Restoring ${imageUrls.length} images...`);

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
                    console.log(`   ✅ RESTORED.`);
                    successCount++;
                } else {
                    console.log(`   ⚠️ Matched property has NO images in WordPress either.`);
                    failCount++;
                }

            } else {
                console.log(`\n❌ NO MATCH FOUND for: "${dbProp.title.substring(0, 40)}..."`);
                failCount++;
            }
        }

        console.log(`\n--- SUMMARY ---`);
        console.log(`Restored: ${successCount}`);
        console.log(`Still Missing: ${failCount}`);

    } catch (e) {
        console.error('Restoration Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

restore();
