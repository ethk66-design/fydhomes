/**
 * Fix Failed Images Script
 * 
 * This script identifies properties in the Hostinger database that have 0 images
 * and attempts to fetch their correct image URLs from Supabase.
 * 
 * Run with: node scripts/fix-failed-images.js
 */

const { createClient } = require('@supabase/supabase-js');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

// Initialize clients
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const prisma = new PrismaClient();

async function main() {
    console.log('🔧 Starting Image Repair...');

    try {
        // 1. Find properties in Hostinger with NO images
        const emptyProperties = await prisma.property.findMany({
            where: {
                images: {
                    none: {}
                }
            },
            select: {
                id: true,
                title: true
            }
        });

        console.log(`Found ${emptyProperties.length} properties with 0 images.`);

        if (emptyProperties.length === 0) {
            console.log('✅ No repair needed.');
            return;
        }

        // 2. Fetch source data from Supabase
        const { data: sourceProperties, error } = await supabase
            .from('properties')
            .select('id, images')
            .in('id', emptyProperties.map(p => p.id));

        if (error) {
            throw new Error(`Supabase fetch failed: ${error.message}`);
        }

        console.log(`Fetched ${sourceProperties.length} matching records from Supabase.`);

        // 3. Update Hostinger DB
        let fixedCount = 0;

        for (const sourceProp of sourceProperties) {
            if (!sourceProp.images || !Array.isArray(sourceProp.images) || sourceProp.images.length === 0) {
                console.log(`   ⚠️  Source property ${sourceProp.id} also has no images. Skipping.`);
                continue;
            }

            console.log(`   🛠️  Fixing: ${sourceProp.id} (${sourceProp.images.length} images)`);

            // Create Image records
            // Note: Hostinger 'PropertyImage' table: id, property_id, url, order

            const imageCreates = sourceProp.images.map((url, index) => ({
                property_id: sourceProp.id,
                url: url,
                order: index
            }));

            await prisma.propertyImage.createMany({
                data: imageCreates
            });

            fixedCount++;
        }

        console.log(`\n✅ Repair Complete. Fixed ${fixedCount} properties.`);

    } catch (err) {
        console.error('❌ Script failed:', err);
    } finally {
        await prisma.$disconnect();
    }
}

main();
