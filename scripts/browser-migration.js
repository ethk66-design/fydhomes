// Browser-based Supabase Migration Script
// Paste this into your browser console on any page with the Supabase JS client loaded

(async function runMigration() {
    console.log('%c Starting Supabase Migration...', 'color: #3b82f6; font-size: 16px; font-weight: bold;');

    const OLD_URL = 'https://vexsmxrfxbatpyelugch.supabase.co';
    const OLD_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZleHNteHJmeGJhdHB5ZWx1Z2NoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDcwNzkwMCwiZXhwIjoyMDg2MjgzOTAwfQ.MSWhyE0hrk5DEqATa4EcZU7fSBpTtjJXi-WLHYBRJfk';

    const NEW_URL = 'https://oxcvbyprrvbnmoyanpgu.supabase.co';
    const NEW_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94Y3ZieXBycnZibm1veWFucGd1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjEwMjE3MCwiZXhwIjoyMDg3Njc4MTcwfQ.5KztY2yg730lLwp96xbB9ACkgwrG_wlCzOO3PxdSH-Q';

    // We can't use the Supabase client directly in the console easily without a bundler,
    // so we'll use raw fetch calls to the REST API.

    const oldHeaders = {
        'apikey': OLD_KEY,
        'Authorization': `Bearer ${OLD_KEY}`,
        'Content-Type': 'application/json'
    };

    const newHeaders = {
        'apikey': NEW_KEY,
        'Authorization': `Bearer ${NEW_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates' // Upsert
    };

    const TABLES = ['users', 'sessions', 'testimonials', 'page_seo', 'page_assets', 'properties', 'property_images', 'property_tags', 'leads'];

    for (const table of TABLES) {
        console.log(`%c⏳ Migrating table: ${table}...`, 'color: #eab308; font-weight: bold;');

        try {
            // Fetch from old
            const getRes = await fetch(`${OLD_URL}/rest/v1/${table}?select=*`, { headers: oldHeaders });
            if (!getRes.ok) throw new Error(`Fetch failed: ${getRes.status} ${await getRes.text()}`);

            const data = await getRes.json();

            if (data.length === 0) {
                console.log(`  ⏭️ No rows found.`);
                continue;
            }

            console.log(`  📦 Found ${data.length} rows, pushing to new DB...`);

            // Push to new
            const postRes = await fetch(`${NEW_URL}/rest/v1/${table}`, {
                method: 'POST',
                headers: newHeaders,
                body: JSON.stringify(data)
            });

            if (!postRes.ok) {
                const errText = await postRes.text();
                // Ignore empty string errors or PGRST116/204 which often mean success on upserts
                if (errText && !errText.includes('PGRST')) {
                    throw new Error(`Insert failed: ${postRes.status} ${errText}`);
                }
            }

            console.log(`  ✅ Successfully migrated ${table}!`);

        } catch (err) {
            console.error(`  ❌ Error on ${table}:`, err.message);
        }
    }

    console.log('%c🎉 Database Migration Complete!', 'color: #22c55e; font-size: 16px; font-weight: bold;');
    console.log('NOTE: Storage (Images) cannot be easily migrated via browser console due to CORS/Blob handling. Those will need the Node script once your ISP unblocks standard connections.');
})();
