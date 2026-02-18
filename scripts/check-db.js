
const { createClient } = require('@supabase/supabase-js');

// Config
// Config from .env
const SUPABASE_URL = 'https://vexsmxrfxbatpyelugch.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZleHNteHJmeGJhdHB5ZWx1Z2NoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDcwNzkwMCwiZXhwIjoyMDg2MjgzOTAwfQ.MSWhyE0hrk5DEqATa4EcZU7fSBpTtjJXi-WLHYBRJfk';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function check() {
    console.log('Listing all tables in public schema...');

    // Supabase JS doesn't have a direct "list tables" method easily without SQL editor access or raw RPC
    // But we can try to fetch from a known table and if it works, good.
    // Actually we can't query information_schema via supabase-js client usually because it's not exposed to the API.

    // Instead, let's try to query 'PropertyImage' (PascalCase) just in case.
    console.log("Checking 'PropertyImage'...");
    const { count: count1, error: error1 } = await supabase.from('PropertyImage').select('*', { count: 'exact', head: true });
    if (!error1) console.log("Found 'PropertyImage' table.");
    else console.log("Did not find 'PropertyImage':", error1.message);

    console.log("Checking 'property_images' again...");
    const { count: count2, error: error2 } = await supabase.from('property_images').select('*', { count: 'exact', head: true });
    if (!error2) console.log("Found 'property_images' table.");
    else console.log("Did not find 'property_images':", error2.message);

    // Check images for the found "Test 2" property
    const testPropertyId = 'c67e5a21-3432-49ff-9704-208d7f3f1d0a';
    console.log(`Checking images for Property ID: ${testPropertyId}`);

    const { data: images, error: imgError } = await supabase
        .from('property_images')
        .select('url, order')
        .eq('property_id', testPropertyId)
        .order('order', { ascending: true });

    if (imgError) {
        console.error('Error fetching images:', imgError);
    } else {
        console.log('Images Found:', JSON.stringify(images, null, 2));
        if (images.length > 0) {
            const url = images[0].url;
            console.log(`Testing access to URL: ${url}`);
            try {
                const res = await fetch(url, { method: 'HEAD' });
                console.log(`Status: ${res.status} ${res.statusText}`);
                console.log(`Content-Type: ${res.headers.get('content-type')}`);
            } catch (fetchErr) {
                console.error('Fetch error:', fetchErr);
            }
        }
    }
}

check();
