const { PrismaClient } = require('@prisma/client');
const https = require('https');
const fs = require('fs');
const path = require('path');

// --- CONFIGURATION ---
const WP_API_URL = 'https://fydhomes.in/wp-json/wp/v2';
const MIGRATION_LIMIT = 100; // PRODUCTION LIMIT
const DRY_RUN = false;

const prisma = new PrismaClient();

// --- HELPERS ---
function fetchJson(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                try { resolve(JSON.parse(data)); } catch (e) { resolve(null); }
            });
        }).on('error', () => resolve(null));
    });
}

function decodeHtml(html) {
    if (!html) return '';
    return html.replace(/&#038;/g, "&").replace(/&amp;/g, "&").replace(/&#8211;/g, "-");
}

async function getMediaUrl(mediaId) {
    if (!mediaId) return null;
    const data = await fetchJson(`${WP_API_URL}/media/${mediaId}`);
    return data?.source_url || null;
}

// --- MAPPING LOGIC ---
function mapListingType(statusIds) {
    if (!statusIds || !Array.isArray(statusIds)) return 'Sale';
    if (statusIds.includes(29)) return 'Rent';
    if (statusIds.includes(30) || statusIds.includes(111)) return 'Sale';
    return 'Sale';
}

function mapStatus(statusIds, isFeatured) {
    if (statusIds && statusIds.includes(87)) return 'sold';
    if (isFeatured == '1') return 'featured';
    return 'active';
}

function mapPropertyType(typeIds) {
    if (!typeIds || !Array.isArray(typeIds)) return 'Residential';
    if (typeIds.includes(69)) return 'Villa';
    if (typeIds.includes(98)) return 'Plot';
    if (typeIds.includes(25)) return 'Commercial';
    if (typeIds.includes(49)) return 'Office';
    if (typeIds.includes(57) || typeIds.includes(75)) return 'Residential';
    return 'Residential';
}

async function migrate() {
    console.log(`\n--- STARTING FULL MIGRATION (Prisma) (Limit: ${MIGRATION_LIMIT}) ---`);

    try {
        // 0. RESET DATABASE (Optional, but good for clean migration)
        if (!DRY_RUN) {
            console.log('⚠️  Resetting Database (Deleting all properties)...');
            await prisma.propertyImage.deleteMany({});
            await prisma.propertyTag.deleteMany({});
            await prisma.property.deleteMany({});
            console.log('✅ Database Cleared.');
        }

        // 1. Fetch Properties from WordPress
        const properties = await fetchJson(`${WP_API_URL}/properties?per_page=${MIGRATION_LIMIT}`);

        if (!properties || properties.length === 0) {
            console.log('No properties found to migrate.');
            return;
        }

        console.log(`Found ${properties.length} properties. Processing...`);

        let successCount = 0;
        let failCount = 0;

        for (const p of properties) {
            try {
                const title = decodeHtml(p.title.rendered);
                console.log(`\nProcessing ID: ${p.id} - ${title}`);

                const meta = p.property_meta || {};

                // 2. Fetch Images
                const imageUrls = [];

                // Thumbnail
                if (p.featured_media) {
                    process.stdout.write(`  Fetching Thumbnail (${p.featured_media})... `);
                    const thumbUrl = await getMediaUrl(p.featured_media);
                    if (thumbUrl) {
                        imageUrls.push(thumbUrl);
                        console.log('OK');
                    } else {
                        console.log('Failed');
                    }
                }

                // Gallery (Limit to 15)
                if (meta.fave_property_images) {
                    const galleryIds = meta.fave_property_images.slice(0, 15);
                    process.stdout.write(`  Fetching ${galleryIds.length} Gallery Images... `);
                    for (const imgId of galleryIds) {
                        const url = await getMediaUrl(imgId);
                        if (url && !imageUrls.includes(url)) imageUrls.push(url);
                    }
                    console.log(`Got ${imageUrls.length} total.`);
                }

                // 3. Construct Payload
                const priceVal = meta.fave_property_price?.[0] || '';
                const pricePostfix = meta.fave_property_price_postfix?.[0] || '';
                const price = priceVal ? `${priceVal} ${pricePostfix}`.trim() : 'Price on Request';

                const areaVal = meta.fave_property_size?.[0] || meta.fave_property_land?.[0] || '';
                const areaPostfix = meta.fave_property_size_prefix?.[0] || meta.fave_property_land_postfix?.[0] || 'SQFT';
                const area = areaVal ? `${areaVal} ${areaPostfix}`.trim() : '';

                const fullDescription = p.content.rendered;
                const landArea = meta.fave_property_land?.[0] ? `${meta.fave_property_land[0]} ${meta.fave_property_land_postfix?.[0] || ''}`.trim() : null;

                const propertyData = {
                    title: title,
                    description: fullDescription,
                    price: price,
                    location: 'Kochi, Kerala',
                    beds: parseInt(meta.fave_property_bedrooms?.[0] || 0),
                    baths: parseInt(meta.fave_property_bathrooms?.[0] || 0),
                    area: area,
                    land_area: landArea,
                    status: mapStatus(p.property_status, meta.fave_featured?.[0]),
                    type: mapPropertyType(p.property_type),
                    listing_type: mapListingType(p.property_status),
                    youtube_video: meta.fave_video_url?.[0] || null,
                    // Map images to nested create
                    images: {
                        create: imageUrls.map((url, index) => ({
                            url: url,
                            order: index
                        }))
                    }
                };

                if (!DRY_RUN) {
                    await prisma.property.create({
                        data: propertyData
                    });
                    console.log('  ✅ Inserted into Database');
                    successCount++;
                } else {
                    console.log('  [DRY RUN] Skipped insert');
                }

            } catch (err) {
                console.error(`  ❌ Failed to migrate property ${p.id}:`, err.message);
                failCount++;
            }
            // Rate limiting
            await new Promise(r => setTimeout(r, 500));
        }

        console.log(`\n--- MIGRATION COMPLETE ---`);
        console.log(`Success: ${successCount}`);
        console.log(`Failed: ${failCount}`);

    } catch (e) {
        console.error("Migration Fatal Error:", e);
    } finally {
        await prisma.$disconnect();
    }
}

migrate();
