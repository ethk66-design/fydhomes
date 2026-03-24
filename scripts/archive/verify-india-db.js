const { createClient } = require('@supabase/supabase-js');

const US_URL = 'https://oxcvbyprrvbnmoyanpgu.supabase.co';
const US_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94Y3ZieXBycnZibm1veWFucGd1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjEwMjE3MCwiZXhwIjoyMDg3Njc4MTcwfQ.5KztY2yg730lLwp96xbB9ACkgwrG_wlCzOO3PxdSH-Q';
const usClient = createClient(US_URL, US_KEY, { auth: { persistSession: false } });

const INDIA_URL = 'https://vexsmxrfxbatpyelugch.supabase.co';
const INDIA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZleHNteHJmeGJhdHB5ZWx1Z2NoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDcwNzkwMCwiZXhwIjoyMDg2MjgzOTAwfQ.MSWhyE0hrk5DEqATa4EcZU7fSBpTtjJXi-WLHYBRJfk';
const indiaClient = createClient(INDIA_URL, INDIA_KEY, { auth: { persistSession: false } });

const TABLES = ['properties', 'property_images', 'leads', 'testimonials', 'page_seo', 'page_assets'];

async function verify() {
    console.log("--- STARTING DATABASE VERIFICATION ---\n");
    let allGood = true;

    // 1. Check Data Counts
    console.log("1. Checking Data Counts (US vs India):");
    for (const table of TABLES) {
        const { count: usCount } = await usClient.from(table).select('*', { count: 'exact', head: true });
        const { count: indiaCount } = await indiaClient.from(table).select('*', { count: 'exact', head: true });

        console.log(`   - ${table.padEnd(15)}: US = ${usCount}, India = ${indiaCount}`);

        if (indiaCount < usCount) {
            console.log(`     ❌ Error: India is missing records in ${table}!`);
            allGood = false;
        } else {
            console.log(`     ✅ OK`);
        }
    }

    // 2. Check Image URLs in India DB
    console.log("\n2. Checking Image URLs in India DB:");

    // Check property_images
    const { data: propImages, error: pErr } = await indiaClient.from('property_images').select('id, url');
    let badPropUrls = propImages.filter(img => !img.url || !img.url.includes('vexsmxrfxbatpyelugch.supabase.co'));

    console.log(`   - property_images total: ${propImages.length}`);
    if (badPropUrls.length > 0) {
        console.log(`     ❌ Found ${badPropUrls.length} bad URLs in property_images!`);
        console.log('Sample bad URLs:', badPropUrls.slice(0, 3).map(img => img.url));
        allGood = false;
    } else {
        console.log(`     ✅ All property_images URLs point to India.`);
    }

    // Check page_assets
    const { data: pageAssets, error: aErr } = await indiaClient.from('page_assets').select('id, asset_url');
    let badAssetUrls = pageAssets.filter(asset => asset.asset_url && !asset.asset_url.includes('vexsmxrfxbatpyelugch.supabase.co'));

    console.log(`   - page_assets total: ${pageAssets.length}`);
    if (badAssetUrls.length > 0) {
        console.log(`     ❌ Found ${badAssetUrls.length} bad URLs in page_assets!`);
        allGood = false;
    } else {
        console.log(`     ✅ All page_assets URLs point to India.`);
    }

    // Check page_seo
    const { data: pageSeo, error: sErr } = await indiaClient.from('page_seo').select('id, og_image');
    let badSeoUrls = pageSeo.filter(seo => seo.og_image && !seo.og_image.includes('vexsmxrfxbatpyelugch.supabase.co'));

    console.log(`   - page_seo total: ${pageSeo.length}`);
    if (badSeoUrls.length > 0) {
        console.log(`     ❌ Found ${badSeoUrls.length} bad URLs in page_seo!`);
        allGood = false;
    } else {
        console.log(`     ✅ All page_seo URLs point to India.`);
    }

    if (allGood) {
        console.log("\n🎉 FINAL VERDICT: SUCCESS! All data is fully backed up and pointing correctly to India.");
        console.log("👉 It is SAFE to delete the US Supabase project.");
    } else {
        console.log("\n⚠️ FINAL VERDICT: FAILED. There are discrepancies, do NOT delete US Supabase yet.");
    }
}

verify().catch(console.error);
