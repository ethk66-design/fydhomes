const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually parse env file
const envPath = fs.existsSync(path.join(process.cwd(), '.env.local'))
    ? path.join(process.cwd(), '.env.local')
    : path.join(process.cwd(), '.env');

const envContent = fs.readFileSync(envPath, 'utf8');
const envConfig = {};
envContent.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join('=').trim().replace(/"/g, '');
        envConfig[key] = value;
    }
});

const supabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env file");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function auditImages() {
    console.log("🔍 Auditing Property Images...");

    const { data: properties, error } = await supabase
        .from('properties')
        .select('id, title, images');

    if (error) {
        console.error("Error fetching properties:", error);
        return;
    }

    let externalCount = 0;
    let internalCount = 0;
    let externalDomains = new Set();

    properties.forEach(p => {
        if (!p.images || p.images.length === 0) return;

        const isExternal = p.images.some(url => !url.includes('supabase.co'));

        if (isExternal) {
            externalCount++;
            p.images.forEach(url => {
                try {
                    const u = new URL(url);
                    if (!u.hostname.includes('supabase.co')) {
                        externalDomains.add(u.hostname);
                    }
                } catch (e) { }
            });
            if (externalCount <= 3) {
                console.log(`\n⚠️  Property: "${p.title}" has external images:`);
                console.log(`   - Example: ${p.images[0]}`);
            }
        } else {
            internalCount++;
        }
    });

    console.log("\n---------------------------------------------------");
    console.log(`📊 Audit Results:`);
    console.log(`   - Total Properties: ${properties.length}`);
    console.log(`   - Safe (Supabase Storage): ${internalCount}`);
    console.log(`   - AT RISK (External/WordPress): ${externalCount}`);

    if (externalDomains.size > 0) {
        console.log(`   - External Domains found: ${Array.from(externalDomains).join(', ')}`);
    }
    console.log("---------------------------------------------------\n");
}

auditImages();
