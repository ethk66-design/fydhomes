const { createClient } = require('@supabase/supabase-js');

const INDIA_URL = 'https://vexsmxrfxbatpyelugch.supabase.co';
const INDIA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZleHNteHJmeGJhdHB5ZWx1Z2NoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDcwNzkwMCwiZXhwIjoyMDg2MjgzOTAwfQ.MSWhyE0hrk5DEqATa4EcZU7fSBpTtjJXi-WLHYBRJfk';
const indiaClient = createClient(INDIA_URL, INDIA_KEY, { auth: { persistSession: false } });

// The expected structure:
// Old proxy: fydhomes.jiobase.com/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images
// OR oxcvbyprrvbnmoyanpgu.supabase.co/storage/v1/object/public/property-images/general
// We must convert ALL back to vexsmxrfxbatpyelugch.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images

const RAW_INDIA = 'vexsmxrfxbatpyelugch.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images';

function cleanUrl(url) {
    if (!url) return url;
    let replaced = url;

    // Convert old US hardcodes or general prefix back
    replaced = replaced.replace(/https:\/\/oxcvbyprrvbnmoyanpgu\.supabase\.co\/storage\/v1\/object\/public\/property-images\/general/g, `https://${RAW_INDIA}`);
    replaced = replaced.replace(/oxcvbyprrvbnmoyanpgu\.supabase\.co\/storage\/v1\/object\/public\/property-images\/general/g, RAW_INDIA);

    // Convert proxy url back
    replaced = replaced.replace(/https:\/\/fydhomes\.jiobase\.com\/storage\/v1\/object\/public\/test-clones\/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in\/assets\/images/g, `https://${RAW_INDIA}`);
    replaced = replaced.replace(/fydhomes\.jiobase\.com\/storage\/v1\/object\/public\/test-clones\/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in\/assets\/images/g, RAW_INDIA);

    // Failsafe catch for anywhere proxy string exists
    replaced = replaced.replace(/fydhomes\.jiobase\.com/g, 'vexsmxrfxbatpyelugch.supabase.co');

    return replaced;
}

async function updateTableUrls(tableName, idField, urlField) {
    console.log(`Scanning ${tableName}...`);
    const { data: records, error } = await indiaClient.from(tableName).select(`${idField}, ${urlField}`);
    if (error) {
        console.error(`Error reading ${tableName}:`, error);
        return;
    }

    let pCount = 0;
    for (const record of records) {
        const val = record[urlField];
        if (val && (val.includes('oxcvbyprrvbnmoyanpgu.supabase.co') || val.includes('fydhomes.jiobase.com'))) {
            const cleaned = cleanUrl(val);
            const { error: updateError } = await indiaClient.from(tableName)
                .update({ [urlField]: cleaned })
                .eq(idField, record[idField]);

            if (updateError) {
                console.error(`Failed to update ${record[idField]}:`, updateError);
            } else {
                pCount++;
                console.log(`✅ Normalized ${tableName} ID: ${record[idField]}`);
            }
        }
    }
    console.log(`\nUpdated ${pCount} records in ${tableName}.`);
}

async function runRollback() {
    console.log('--- STARTING DB NATIVE URL ROLLBACK ---');
    await updateTableUrls('property_images', 'id', 'url');
    await updateTableUrls('page_assets', 'id', 'asset_url');
    await updateTableUrls('page_seo', 'id', 'og_image');
    console.log('--- NATIVE URL ROLLBACK COMPLETE ---');
}

runRollback().catch(console.error);
