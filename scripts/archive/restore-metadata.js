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

function getMetaValue(meta, key) {
    if (!meta || !meta[key]) return null;
    const val = meta[key];
    if (Array.isArray(val)) {
        return val[0] || null;
    }
    return val;
}

async function restoreMetadata() {
    console.log('--- RESTORING METADATA (Video, SEO) ---');

    try {
        // 1. Get ALL DB Properties
        const dbProperties = await prisma.property.findMany();
        console.log(`Found ${dbProperties.length} properties in DB.`);

        // 2. Fetch Source Data (WordPress)
        console.log('Fetching source data from WordPress...');
        const wpProperties = await fetchJson('https://fydhomes.in/wp-json/wp/v2/properties?per_page=100');

        if (!wpProperties || !Array.isArray(wpProperties)) {
            console.error('Failed to fetch from WordPress API.');
            return;
        }
        console.log(`Fetched ${wpProperties.length} records from WordPress.`);

        let successCount = 0;
        let noChangeCount = 0;

        // 3. Match & Update
        for (const dbProp of dbProperties) {
            const dbTitle = dbProp.title.toLowerCase().trim();
            if (!dbTitle) continue;

            // Find match
            const match = wpProperties.find(wp => {
                const wpTitle = decodeHtml(wp.title.rendered).toLowerCase().trim();
                return wpTitle === dbTitle || wpTitle.includes(dbTitle) || dbTitle.includes(wpTitle);
            });

            if (match) {
                const updateData = {};
                let hasUpdates = false;

                // A. Video URL
                // Check multiple keys: fave_video_url, fave_property_video_url
                let videoUrl = getMetaValue(match.property_meta, 'fave_video_url');
                if (!videoUrl) videoUrl = getMetaValue(match.property_meta, 'fave_property_video_url');

                // If DB is empty but WP has it, update.
                if (!dbProp.youtube_video && videoUrl) {
                    updateData.youtube_video = videoUrl;
                    hasUpdates = true;
                }

                // B. SEO Title
                const seoTitle = match.yoast_head_json?.title; // Yoast usually puts it here
                if (!dbProp.meta_title && seoTitle) {
                    updateData.meta_title = seoTitle.substring(0, 255); // Limit length
                    hasUpdates = true;
                }

                // C. SEO Description
                const seoDesc = match.yoast_head_json?.description;
                if (!dbProp.meta_description && seoDesc) {
                    updateData.meta_description = seoDesc;
                    hasUpdates = true;
                }

                if (hasUpdates) {
                    console.log(`\n🔄 UPDATING: "${dbProp.title.substring(0, 30)}..."`);
                    if (updateData.youtube_video) console.log(`   + Video: ${updateData.youtube_video}`);
                    if (updateData.meta_title) console.log(`   + MetaTitle: ${updateData.meta_title.substring(0, 30)}...`);
                    if (updateData.meta_description) console.log(`   + MetaDesc: ${updateData.meta_description.substring(0, 30)}...`);

                    await prisma.property.update({
                        where: { id: dbProp.id },
                        data: updateData
                    });
                    successCount++;
                } else {
                    noChangeCount++;
                }
            }
        }

        console.log(`\n--- SUMMARY ---`);
        console.log(`Updated Metadata: ${successCount}`);
        console.log(`No Changes Needed: ${noChangeCount}`);

    } catch (e) {
        console.error('Restoration Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

restoreMetadata();
