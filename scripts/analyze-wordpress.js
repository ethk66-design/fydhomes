
const https = require('https');

const BASE_URL = 'https://fydhomes.in/wp-json/wp/v2';
const PROPERTY_ENDPOINT = 'https://fydhomes.in/wp-json/wp/v2/properties';

function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve(JSON.parse(data));
                    } else {
                        console.error(`Error: Status Code ${res.statusCode}`);
                        resolve(null);
                    }
                } catch (e) {
                    resolve(null);
                }
            });
        }).on('error', reject);
    });
}

async function analyze() {
    console.log('--- Deep Analyzing Property Structure ---');
    console.log(`Endpoint: ${PROPERTY_ENDPOINT}`);

    const posts = await fetchJson(`${PROPERTY_ENDPOINT}?per_page=1`);

    if (posts && posts.length > 0) {
        const p = posts[0];
        console.log('--- Sample Property Data ---');
        console.log('ID:', p.id);
        console.log('Title:', p.title?.rendered);
        console.log('Description:', p.content?.rendered?.substring(0, 100) + '...');
        console.log('Slug:', p.slug);

        console.log('\n--- Property Meta (Critical for Mapping) ---');
        if (p.property_meta) {
            console.log(JSON.stringify(p.property_meta, null, 2));
        } else {
            console.log('NO property_meta found!');
        }

        console.log('\n--- Taxonomies (Status, Type, etc) ---');
        console.log('Property Type IDs:', p.property_type);
        console.log('Property Status IDs:', p.property_status);
        console.log('Property City IDs:', p.property_city);

    } else {
        console.log('No properties found.');
    }
}

analyze();
