const https = require('https');

const pages = ['/', '/listings', '/about', '/contact', '/privacy-policy'];
const apiEndpoint = '/api/properties?limit=5';

async function testPage(path) {
  return new Promise((resolve) => {
    https.get('https://fydhomes.in' + path, (res) => {
      console.log(`[PAGE] ${path}: ${res.statusCode}`);
      resolve(res.statusCode);
    }).on('error', (err) => {
      console.error(`[PAGE] ${path}: ERROR - ${err.message}`);
      resolve(null);
    });
  });
}

async function testRateLimit(requests) {
  console.log(`\nTesting API Rate Limits with ${requests} concurrent requests to ${apiEndpoint}...`);
  const promises = [];
  
  for (let i = 0; i < requests; i++) {
    promises.push(new Promise((resolve) => {
      https.get('https://fydhomes.in' + apiEndpoint, (res) => {
        resolve(res.statusCode);
      }).on('error', () => resolve(null));
    }));
  }
  
  const results = await Promise.all(promises);
  const statusCounts = results.reduce((acc, status) => {
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});
  
  console.log('Rate Limit Test Results (Status Codes):', statusCounts);
}

async function main() {
  console.log('--- LIVE WEBSITE VALIDATION ---');
  for (const page of pages) {
    await testPage(page);
  }
  
  await testRateLimit(50); // Send 50 concurrent requests to test rate limit
}

main().catch(console.error);
