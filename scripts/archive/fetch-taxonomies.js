
const https = require('https');

const BASE = 'https://fydhomes.in/wp-json/wp/v2';

function fetchJson(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve([]); }
      });
    });
  });
}

async function getTaxonomies() {
  console.log('Fetching Property Statuses...');
  const statuses = await fetchJson(`${BASE}/property_status?per_page=100`);
  console.log('--- STATUSES ---');
  statuses.forEach(s => console.log(`${s.id}: ${s.name}`));

  console.log('\nFetching Property Types...');
  const types = await fetchJson(`${BASE}/property_type?per_page=100`);
  console.log('--- TYPES ---');
  types.forEach(t => console.log(`${t.id}: ${t.name}`));
}

getTaxonomies();
