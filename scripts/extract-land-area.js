
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually read .env or .env.local
const envPath = path.resolve(__dirname, '../.env');
console.log('Reading env from:', envPath);

if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split(/\r?\n/).forEach(line => {
        // Basic parser: matches KEY = VALUE, handles simple quotes
        const match = line.match(/^\s*([^=]+)\s*=\s*(.*)?\s*$/);
        if (match) {
            const key = match[1].trim();
            if (key.startsWith('#')) return; // skip comments
            let value = match[2] ? match[2].trim() : '';
            // Remove surrounding quotes if present
            value = value.replace(/^['"](.*)['"]$/, '$1');
            process.env[key] = value;
        }
    });
} else {
    console.warn('.env file not found!');
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('supabaseUrl:', supabaseUrl ? 'Set' : 'Missing');

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing credentials. Exiting.');
    process.exit(1);
}

// Use service or anon key
const supabase = createClient(supabaseUrl, supabaseServiceKey || supabaseKey);

async function analyzeLandArea() {
    console.log('Fetching properties...');
    const { data: properties, error } = await supabase
        .from('properties')
        .select('id, title, description, land_area');

    if (error) {
        console.error('Error fetching properties:', error);
        return;
    }

    console.log(`Found ${properties.length} properties.`);

    const updates = [];
    const patterns = [
        /(\d+(\.\d+)?)\s*Cents?/i,
        /(\d+(\.\d+)?)\s*Cnt/i,
        /(\d+(\.\d+)?)\s*Cent/i,
        /(\d+(\.\d+)?)\s*Acre/i,
    ];

    for (const property of properties) {
        if (property.land_area) {
            // Skip if already has data (or maybe we want to overwrite? user said "fill admin place with relevant data")
            // If column exists, we assume if it's filled it's correct.
            // User said "analyze each listings... if find out land area... fill admin place"
            // I'll skip existing for now to avoid overwriting manual edits.
            continue;
        }

        if (!property.description) {
            continue;
        }

        let extracted = null;
        for (const pattern of patterns) {
            const match = property.description.match(pattern);
            if (match) {
                extracted = match[0];
                // Normalize "Cnt"
                if (extracted.toLowerCase().includes('cnt')) {
                    extracted = extracted.replace(/cnt/i, 'Cent');
                }
                break;
            }
        }

        if (extracted) {
            console.log(`[FOUND] Property "${property.title}"`);
            console.log(`   > Extracted: "${extracted}"`);
            updates.push({ id: property.id, land_area: extracted });
        }
    }

    console.log('\n-----------------------------------');
    console.log(`Identified ${updates.length} updates needed.`);

    if (updates.length > 0) {
        if (process.argv.includes('--execute')) {
            console.log('Applying updates...');
            for (const update of updates) {
                const { error } = await supabase
                    .from('properties')
                    .update({ land_area: update.land_area })
                    .eq('id', update.id);

                if (error) {
                    console.error(`Failed to update ${update.id}:`, error);
                } else {
                    console.log(`Updated property ${update.id}`);
                }
            }
            console.log('Done.');
        } else {
            console.log('Run with --execute to apply changes.');
        }
    } else {
        console.log('No updates found.');
    }
}

analyzeLandArea();
