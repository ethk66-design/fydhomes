
const { createClient } = require('@supabase/supabase-js');
const https = require('https');

// --- CONFIGURATION ---
const WP_API_URL = 'https://fydhomes.in/wp-json/wp/v2';
const MIGRATION_LIMIT = 100; // PRODUCTION LIMIT
const DRY_RUN = false;

// --- SUPABASE SETUP ---
const SUPABASE_URL = 'https://cqiwkdfmfhkwqkdqaeyy.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxaXdrZGZtZmhrd3FrZHFhZXl5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODQ1NDc1NiwiZXhwIjoyMDg0MDMwNzU2fQ.ONTAMss7dqcGCEtxHW-B_V3WejBNNDJo0GwctAQzH-k';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false }
});

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
    console.log(`\n--- STARTING MIGRATION (Limit: ${MIGRATION_LIMIT}) ---`);

    // 0. RESET DATABASE
    if (!DRY_RUN) {
        console.log('⚠️  Resetting Database (Deleting all properties)...');
        // Delete where ID is not null (effectively all)
        const { error: deleteError } = await supabase.from('properties').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        if (deleteError) {
            console.error('Failed to reset database:', deleteError);
            return;
        }
        console.log('✅ Database Cleared.');
    }

    // 1. Fetch Properties
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
            console.log(`\nProcessing ID: ${p.id} - ${decodeHtml(p.title.rendered)}`);

            const meta = p.property_meta || {};

            // 2. Fetch Images
            const images = [];

            // Thumbnail
            if (p.featured_media) {
                console.log(`  Fetching Thumbnail (${p.featured_media})...`);
                const thumbUrl = await getMediaUrl(p.featured_media);
                if (thumbUrl) images.push(thumbUrl);
            }

            // Gallery (Limit to 15 for full migration)
            if (meta.fave_property_images) {
                const galleryIds = meta.fave_property_images.slice(0, 15);
                console.log(`  Fetching ${galleryIds.length} Gallery Images...`);
                for (const imgId of galleryIds) {
                    const url = await getMediaUrl(imgId);
                    if (url && !images.includes(url)) images.push(url);
                }
            }

            // 3. Construct Payload
            const priceVal = meta.fave_property_price?.[0] || '';
            const pricePostfix = meta.fave_property_price_postfix?.[0] || '';
            const price = priceVal ? `${priceVal} ${pricePostfix}`.trim() : 'Price on Request';

            const areaVal = meta.fave_property_size?.[0] || meta.fave_property_land?.[0] || '';
            const areaPostfix = meta.fave_property_size_prefix?.[0] || meta.fave_property_land_postfix?.[0] || 'SQFT';
            const area = areaVal ? `${areaVal} ${areaPostfix}`.trim() : '';

            // Capture Full Description
            const fullDescription = p.content.rendered;

            const payload = {
                title: decodeHtml(p.title.rendered),
                description: fullDescription,
                price: price,
                location: 'Kochi, Kerala',
                beds: parseInt(meta.fave_property_bedrooms?.[0] || 0),
                baths: parseInt(meta.fave_property_bathrooms?.[0] || 0),
                area: area,
                images: images,
                status: mapStatus(p.property_status, meta.fave_featured?.[0]),
                type: mapPropertyType(p.property_type),
                listing_type: mapListingType(p.property_status),
                youtube_video: meta.fave_video_url?.[0] || null,
                original_url: p.link, // SAVE ORIGINAL LINK
                agent_id: null
            };

            if (!DRY_RUN) {
                const { error } = await supabase.from('properties').insert(payload);
                if (error) {
                    if (error.code === '42703') { // Undefined column
                        console.error('  ⚠️  COLUMN MISSING: You must run the SQL script matching "original_url" first!');
                        console.log('  Retrying without original_url...');
                        delete payload.original_url;
                        const { error: retryError } = await supabase.from('properties').insert(payload);
                        if (retryError) throw retryError;
                        console.log('  ✅ Inserted (Partial - No URL)');
                    } else {
                        throw error;
                    }
                } else {
                    console.log('  ✅ Inserted into Supabase');
                }
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
}

migrate();
