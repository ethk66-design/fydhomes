const https = require('https');
const http = require('http');

// This script expects the local dev server to be running at http://localhost:3000
const TARGET_URL = 'http://localhost:3000/api/properties';
const MAX_REQUESTS = 65; // Threshold in the code is 60

async function testLocalRateLimit() {
  console.log(`Testing local rate limit on ${TARGET_URL}...`);
  let successCount = 0;
  let blockedCount = 0;

  for (let i = 1; i <= MAX_REQUESTS; i++) {
    await new Promise((resolve) => {
      http.get(TARGET_URL, (res) => {
        if (res.statusCode === 429) {
          blockedCount++;
        } else if (res.statusCode === 200) {
          successCount++;
        }
        process.stdout.write(`\rRequest ${i}: Status ${res.statusCode} | Success: ${successCount} | Blocked: ${blockedCount}`);
        resolve();
      }).on('error', (err) => {
        console.error(`\nError on request ${i}:`, err.message);
        resolve();
      });
    });
  }
  console.log('\n--- Test Results ---');
  console.log(`Total Requests: ${MAX_REQUESTS}`);
  console.log(`Successes: ${successCount}`);
  console.log(`Blocked: ${blockedCount}`);
  
  if (blockedCount > 0) {
    console.log('✅ Rate limiting is active locally!');
  } else {
    console.log('❌ Rate limiting did not trigger. Is the dev server running?');
  }
}

testLocalRateLimit().catch(console.error);
