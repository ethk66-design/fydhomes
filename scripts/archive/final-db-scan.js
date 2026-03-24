const { createClient } = require('@supabase/supabase-js');

const INDIA_URL = 'https://vexsmxrfxbatpyelugch.supabase.co';
const INDIA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZleHNteHJmeGJhdHB5ZWx1Z2NoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDcwNzkwMCwiZXhwIjoyMDg2MjgzOTAwfQ.MSWhyE0hrk5DEqATa4EcZU7fSBpTtjJXi-WLHYBRJfk';
const indiaClient = createClient(INDIA_URL, INDIA_KEY, { auth: { persistSession: false } });

// All tables and their text columns
const TARGET = 'oxcvbyprrvbnmoyanpgu';
const SCHEMA = {
    'properties': ['title', 'description', 'location', 'youtube_video', 'price', 'area', 'land_area', 'status', 'type', 'listing_type', 'meta_title', 'meta_description'],
    'property_images': ['url'],
    'property_tags': ['tag'],
    'testimonials': ['name', 'role', 'content', 'image_url'],
    'page_seo': ['route', 'title', 'description', 'og_image'],
    'page_assets': ['page_route', 'section_key', 'label', 'asset_url', 'alt_text'],
    'leads': ['name', 'phone', 'email', 'property_id', 'message'],
};

async function deepScan() {
    console.log(`--- DEEP SCANNING DATABASE FOR STRING: ${TARGET} ---`);
    let foundAny = false;

    for (const [table, columns] of Object.entries(SCHEMA)) {
        console.log(`\nScanning table: ${table}...`);

        for (const col of columns) {
            const { data, error } = await indiaClient
                .from(table)
                .select(`id, ${col}`)
                .ilike(col, `%${TARGET}%`);

            if (error) {
                console.error(`Error scanning ${table}.${col}:`, error.message);
                continue;
            }

            if (data && data.length > 0) {
                foundAny = true;
                console.log(`⚠️ FOUND ${data.length} match(es) in ${table}.${col}!`);
                data.forEach(d => {
                    console.log(`   -> ID: ${d.id} | Value: ${d[col]}`);
                });
            }
        }
    }

    if (!foundAny) {
        console.log(`\n✅ DEEP SCAN COMPLETE: 0 dependencies found. The string '${TARGET}' does not exist anywhere in the India database.`);
    } else {
        console.log(`\n❌ DEEP SCAN COMPLETE: Found lingering dependencies on US Supabase. Do NOT delete yet.`);
    }
}

deepScan().catch(console.error);
