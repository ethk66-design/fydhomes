const fs = require('fs');
const path = require('path');

// Read .env.local or .env to get the base URL if needed, but we'll default to localhost:3000
const BASE_URL = 'http://localhost:3000';

async function testApiEndpoints() {
    console.log('🌐 Starting API Endpoint Audit...');

    const endpoints = [
        { url: '/api/properties', method: 'GET', description: 'Fetch all properties' },
        { url: '/api/leads', method: 'GET', description: 'Fetch leads (Should fail 401/403 without auth)', expectedStatus: 401 },
        { url: '/robots.txt', method: 'GET', description: 'Fetch robots.txt' },
        { url: '/sitemap.xml', method: 'GET', description: 'Fetch sitemap.xml' },
    ];

    let successCount = 0;
    let failureCount = 0;

    for (const endpoint of endpoints) {
        console.log(`\nTesting ${endpoint.method} ${endpoint.url}...`);
        try {
            const response = await fetch(`${BASE_URL}${endpoint.url}`, {
                method: endpoint.method,
            });

            const expectedStatus = endpoint.expectedStatus || 200;

            if (response.status === expectedStatus) {
                console.log(`✅ Success: Status ${response.status}`);
                successCount++;

                // Check content type if 200
                if (expectedStatus === 200) {
                    const contentType = response.headers.get('content-type');
                    if (endpoint.url.endsWith('.xml') && !contentType.includes('xml')) {
                        console.log(`  ⚠️ Warning: Content-Type is ${contentType}, expected XML`);
                    } else if (endpoint.url.startsWith('/api') && !contentType.includes('json')) {
                        console.log(`  ⚠️ Warning: Content-Type is ${contentType}, expected JSON`);
                    }
                }

            } else {
                console.log(`❌ Failed: Status ${response.status} (Expected ${expectedStatus})`);
                failureCount++;
            }
        } catch (error) {
            console.log(`❌ Error: ${error.message}`);
            failureCount++;
        }
    }

    console.log(`\n📊 API Audit Results:`);
    console.log(`- Success: ${successCount}`);
    console.log(`- Failures: ${failureCount}`);
}

testApiEndpoints();
