const { createClient } = require('@supabase/supabase-js');

// US Supabase (SOURCE of new data)
const US_URL = 'https://oxcvbyprrvbnmoyanpgu.supabase.co';
const US_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94Y3ZieXBycnZibm1veWFucGd1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjEwMjE3MCwiZXhwIjoyMDg3Njc4MTcwfQ.5KztY2yg730lLwp96xbB9ACkgwrG_wlCzOO3PxdSH-Q';
const usClient = createClient(US_URL, US_KEY, { auth: { persistSession: false } });

// India Supabase (DESTINATION for rollback)
const INDIA_URL = 'https://vexsmxrfxbatpyelugch.supabase.co';
const INDIA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZleHNteHJmeGJhdHB5ZWx1Z2NoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDcwNzkwMCwiZXhwIjoyMDg2MjgzOTAwfQ.MSWhyE0hrk5DEqATa4EcZU7fSBpTtjJXi-WLHYBRJfk';
const indiaClient = createClient(INDIA_URL, INDIA_KEY, { auth: { persistSession: false } });

// Tables to sync in order (to respect foreign keys if any)
const TABLES = [
    'properties',
    'property_images',
    'property_tags',
    'testimonials',
    'page_seo',
    'page_assets',
    'leads'
];

async function syncTable(tableName) {
    console.log(`\n--- Syncing Table: ${tableName} ---`);

    // 1. Fetch all records from US
    const { data: usData, error: usFetchError } = await usClient
        .from(tableName)
        .select('*');

    if (usFetchError) {
        console.error(`❌ Error fetching ${tableName} from US:`, usFetchError.message);
        return false;
    }

    if (!usData || usData.length === 0) {
        console.log(`ℹ️ No records found in US table ${tableName}. Skipping.`);
        return true;
    }

    console.log(`📦 Found ${usData.length} records in US database.`);

    // 2. Upsert into India database
    // We process in smaller chunks to avoid payload limits
    const CHUNK_SIZE = 100;
    let successCount = 0;

    for (let i = 0; i < usData.length; i += CHUNK_SIZE) {
        const chunk = usData.slice(i, i + CHUNK_SIZE);

        const { error: indiaUpsertError } = await indiaClient
            .from(tableName)
            .upsert(chunk);

        if (indiaUpsertError) {
            console.error(`❌ Error upserting chunk into India ${tableName}:`, indiaUpsertError.message);
            // Don't completely fail, but log it
        } else {
            successCount += chunk.length;
        }
    }

    if (successCount === usData.length) {
        console.log(`✅ Successfully synced all ${successCount} records for ${tableName}.`);
        return true;
    } else {
        console.log(`⚠️ Partially synced ${successCount} out of ${usData.length} records for ${tableName}.`);
        return false;
    }
}

async function runSync() {
    console.log("🚀 STARTING DATA SYNCHRONIZATION: US -> INDIA");

    let allGood = true;
    for (const table of TABLES) {
        let success = await syncTable(table);
        if (!success) allGood = false;
    }

    if (allGood) {
        console.log("\n🎉 ALL TABLES SYNCHRONIZED SUCCESSFULLY!");
    } else {
        console.log("\n⚠️ SYNCHRONIZATION FINISHED WITH SOME WARNINGS/ERRORS. Check logs above.");
    }
}

runSync().catch(console.error);
