
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Manual .env loading since we might not have dotenv
function loadEnv() {
    try {
        const envPath = path.resolve(process.cwd(), '.env');
        console.log('Loading .env from:', envPath);
        const envFile = fs.readFileSync(envPath, 'utf8');
        envFile.split('\n').forEach(line => {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) return;

            const equalsIndex = trimmed.indexOf('=');
            if (equalsIndex > 0) {
                const key = trimmed.substring(0, equalsIndex).trim();
                const value = trimmed.substring(equalsIndex + 1).trim();
                process.env[key] = value;
            }
        });
        console.log('Loaded .env file. Keys found:', Object.keys(process.env).filter(k => k.includes('SUPABASE')));
    } catch (e) {
        console.error('Could not load .env file', e);
    }
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function analyzeParking() {
    console.log('Fetching properties...');
    const { data: properties, error } = await supabase
        .from('properties')
        .select('id, title, description, parkings');

    if (error) {
        console.error('Error fetching properties:', error);
        return;
    }

    console.log(`Analyzing ${properties.length} properties...`);

    // Regex patterns to look for parking info
    const patterns = [
        /(\d+)\s*(?:covered|open|private)?\s*(?:car)?\s*parking/i,
        /parking(?:\s*for)?\s*(\d+)/i,
        /(\d+)\s*cars?\s*parking/i
    ];

    const updates: any[] = [];

    for (const property of properties) {
        const desc = property.description || '';
        let foundParking = null;

        for (const pattern of patterns) {
            const match = desc.match(pattern);
            if (match) {
                foundParking = parseInt(match[1]);
                break;
            }
        }

        if (foundParking !== null && foundParking !== property.parkings) {
            console.log(`\nProperty: ${property.title}`);
            console.log(`Found: ${foundParking} (Current: ${property.parkings})`);

            updates.push({
                id: property.id,
                current: property.parkings,
                found: foundParking,
                title: property.title
            });
        }
    }

    console.log('\n--- Summary ---');
    console.log(`Found ${updates.length} properties to update.`);

    if (updates.length > 0) {
        console.log('Starting updates...');
        for (const update of updates) {
            console.log(`Updating ${update.title} -> ${update.found}`);
            const { error } = await supabase.from('properties').update({ parkings: update.found }).eq('id', update.id);
            if (error) console.error('Error updating:', error);
        }
        console.log('Updates completed.');
    } else {
        console.log('No updates needed.');
    }
}

analyzeParking();
