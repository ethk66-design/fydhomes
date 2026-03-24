const BASE_URL = 'http://localhost:3000';

const timeoutSignal = (ms) => AbortSignal.timeout(ms);

async function safeFetch(url, label) {
    console.log(`\n🔍 Requesting ${label}: ${url}`);
    try {
        const res = await fetch(url, { signal: timeoutSignal(5000) }); // 5s timeout
        if (!res.ok) {
            console.log(`  ❌ Failed: Status ${res.status}`);
            return null;
        }
        const text = await res.text();
        console.log(`  ✅ Fetched ${text.length} chars.`);
        return text;
    } catch (e) {
        console.log(`  ❌ Error fetching ${label}: ${e.message}`);
        return null;
    }
}

async function auditHtml(html, label) {
    if (!html) return;
    console.log(`  📝 Analyzing HTML for ${label}...`);

    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    const descMatch = html.match(/<meta\s+name="description"\s+content="(.*?)"/);
    const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/);

    if (titleMatch) console.log(`    ✅ Title: "${titleMatch[1].substring(0, 50)}..."`);
    else console.log(`    ❌ Missing <title>`);

    if (descMatch) console.log(`    ✅ Meta Description: Present`);
    else console.log(`    ❌ Missing Meta Description`);

    if (h1Match) console.log(`    ✅ H1: Present`);
    else console.log(`    ⚠️ Warning: No <h1> found`);

    const imgCount = (html.match(/<img/g) || []).length;
    // Naive alt check
    const altCount = (html.match(/alt=["'](.*?)["']/g) || []).length;

    console.log(`    🖼️  Images: ${imgCount}, Alt Tags: ${altCount}`);
    if (imgCount > altCount + 5) { // Loosely check if significant mismatch
        console.log(`    ⚠️ Potential missing alt text (Images: ${imgCount}, Alts: ${altCount})`);
    }
}

async function auditSeo() {
    console.log('🚀 Starting Robust SEO Audit...');

    // 1. Sitemap
    const sitemapHtml = await safeFetch(`${BASE_URL}/sitemap.xml`, 'Sitemap');
    if (sitemapHtml) {
        const urls = (sitemapHtml.match(/<loc>/g) || []).length;
        console.log(`    ✅ Sitemap contains ${urls} URLs.`);
    }

    // 2. Robots
    await safeFetch(`${BASE_URL}/robots.txt`, 'Robots.txt');

    // 3. Home Page
    const homeHtml = await safeFetch(`${BASE_URL}/`, 'Home Page');
    await auditHtml(homeHtml, 'Home Page');

    // 4. Listing Page (First one found in API)
    try {
        console.log('\n🔍 Fetching properties list...');
        const propsRes = await fetch(`${BASE_URL}/api/properties`, { signal: timeoutSignal(5000) });
        const props = await propsRes.json();
        if (props.length > 0) {
            const propUrl = `${BASE_URL}/listings/${props[0].id}`;
            const propHtml = await safeFetch(propUrl, 'Property Detail');
            await auditHtml(propHtml, 'Property Detail');
        } else {
            console.log('  ⚠️ No properties found in API to audit.');
        }
    } catch (e) {
        console.log(`  ❌ Failed getting properties: ${e.message}`);
    }

    console.log('\n🏁 Audit Complete.');
    process.exit(0);
}

auditSeo();
