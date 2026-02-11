const https = require('https');

const url = 'https://vexsmxrfxbatpyelugch.supabase.co/storage/v1/object/public/property-images/migrated/000fbc00-d63c-48e1-a084-623e0a5f89f8/WhatsApp-Image-2025-11-11-at-3.31.13-PM.jpeg';

console.log(`Checking URL: ${url}`);

https.request(url, { method: 'HEAD' }, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS:`, res.headers);
}).on('error', (e) => {
    console.error(`ERROR: ${e.message}`);
}).end();
