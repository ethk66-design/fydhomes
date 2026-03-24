const http = require('http');

async function fetchUrl(url, method = 'GET', body = null) {
    return new Promise((resolve, reject) => {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const req = http.request(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve({
                    status: res.statusCode,
                    headers: res.headers,
                    data: data,
                });
            });
        });

        req.on('error', (e) => {
            reject(e);
        });

        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

async function runVerification() {
    const BASE_URL = 'http://localhost:3001';
    console.log(`Starting verification on ${BASE_URL}...`);

    try {
        // 1. Verify Admin User Creation
        console.log('\n--- 1. Verifying Admin User Creation ---');
        try {
            const userRes = await fetchUrl(`${BASE_URL}/api/admin/create-test-user`, 'POST');
            console.log(`Status: ${userRes.status}`);
            console.log(`Response: ${userRes.data}`);
            if (userRes.status === 200) {
                console.log('✅ Admin user check passed');
            } else {
                console.error('❌ Admin user check failed');
            }
        } catch (e) {
            console.error('❌ Admin user check error:', e.message);
        }

        // 2. Verify Properties API (Public)
        console.log('\n--- 2. Verifying Properties API ---');
        try {
            const propsRes = await fetchUrl(`${BASE_URL}/api/properties?limit=5`);
            console.log(`Status: ${propsRes.status}`);
            if (propsRes.status === 200) {
                console.log('✅ Properties API returned 200 OK');
                const props = JSON.parse(propsRes.data);
                console.log(`Found ${props.length} properties`);
                if (props.length > 0) {
                    console.log('Sample Property:', props[0].title);
                }
            } else {
                console.error('❌ Properties API failed:', propsRes.data);
            }
        } catch (e) {
            console.error('❌ Properties API error:', e.message);
        }

        // 3. Verify Home Page SSR & Currency
        console.log('\n--- 3. Verifying Home Page SSR & Currency ---');
        try {
            const homeRes = await fetchUrl(`${BASE_URL}/`);
            console.log(`Status: ${homeRes.status}`);
            if (homeRes.status === 200) {
                if (homeRes.data.includes('₹')) {
                    console.log('✅ Currency symbol (₹) found in HTML');
                } else {
                    console.warn('⚠️ Currency symbol (₹) NOT found in HTML (might be dynamically loaded or no prices shown)');
                }
                if (homeRes.data.includes('FYD Homes') || homeRes.data.includes('Find Your Dream Home')) {
                    console.log('✅ Home page content verified');
                } else {
                    console.warn('⚠️ Home page content look suspicious');
                }
            } else {
                console.error('❌ Home page load failed');
            }
        } catch (e) {
            console.error('❌ Home page error:', e.message);
        }

    } catch (error) {
        console.error('Verification script fatal error:', error);
    }
}

runVerification();
