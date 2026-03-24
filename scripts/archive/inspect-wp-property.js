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

async function inspect() {
    // ID 19438 was "Elegant 3BHK Villa..." from previous logs
    const propertyId = 19438;
    console.log(`Inspecting WordPress Property ID: ${propertyId}...`);

    const data = await fetchJson(`https://fydhomes.in/wp-json/wp/v2/properties/${propertyId}`);

    if (!data) {
        console.error('Failed to fetch data.');
        return;
    }

    console.log('--- ROOT KEYS ---');
    console.log(Object.keys(data));

    console.log('\n--- PROPERTY_META ---');
    if (data.property_meta) {
        console.log('   Property Meta Keys:', Object.keys(data.property_meta));
        console.log('   Video URL Raw:', data.property_meta['fave_video_url']);
        console.log('   Video ID Raw:', data.property_meta['fave_video_id']);
        console.log('   Yoast Title:', data.property_meta['_yoast_wpseo_title']);
        console.log('   Yoast Desc:', data.property_meta['_yoast_wpseo_metadesc']);
    } else {
        console.log('Key "property_meta" NOT found.');
    }

    console.log('\n--- ACF (If exists) ---');
    if (data.acf) {
        // limit output
        console.log(JSON.stringify(data.acf, null, 2).substring(0, 500) + '...');
    } else {
        console.log('Key "acf" NOT found.');
    }

    // Check specific meta fields if exposed
    console.log('\n--- META (If exposed in root or specific key) ---');
    // sometimes it's in 'meta' or 'fave_...' keys directly
    const candidateKeys = Object.keys(data).filter(k => k.includes('image') || k.includes('gallery') || k.includes('fave'));
    candidateKeys.forEach(k => {
        console.log(`${k}:`, JSON.stringify(data[k], null, 2));
    });
}

inspect();
