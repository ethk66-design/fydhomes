/**
 * Supabase to Hostinger MySQL Migration Script
 * 
 * This script migrates data from Supabase to the new Hostinger MySQL database.
 * Run with: node scripts/migrate-to-hostinger.js
 */

const { createClient } = require('@supabase/supabase-js');
const { PrismaClient } = require('@prisma/client');

// Initialize clients
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role for full access
);

const prisma = new PrismaClient();

async function migrateProperties() {
    console.log('\n📦 Migrating Properties...');

    const { data: properties, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching properties:', error);
        return 0;
    }

    console.log(`Found ${properties.length} properties to migrate`);

    let migrated = 0;
    for (const prop of properties) {
        try {
            // Check if already exists
            const existing = await prisma.property.findUnique({ where: { id: prop.id } });
            if (existing) {
                console.log(`  Skipping ${prop.id} - already exists`);
                continue;
            }

            await prisma.property.create({
                data: {
                    id: prop.id,
                    title: prop.title || 'Untitled',
                    description: prop.description,
                    price: prop.price,
                    location: prop.location,
                    beds: prop.beds,
                    baths: prop.baths,
                    area: prop.area,
                    land_area: prop.land_area,
                    status: prop.status || 'active',
                    type: prop.type,
                    listing_type: prop.listing_type,
                    agent_id: prop.agent_id,
                    youtube_video: prop.youtube_video,
                    parkings: prop.parkings,
                    meta_title: prop.meta_title,
                    meta_description: prop.meta_description,
                    created_at: prop.created_at ? new Date(prop.created_at) : new Date(),
                    updated_at: prop.updated_at ? new Date(prop.updated_at) : new Date(),
                    // Create related images
                    images: {
                        create: (prop.images || []).map((url, index) => ({
                            url: url,
                            order: index,
                        })),
                    },
                    // Create related tags
                    tags: {
                        create: (prop.tags || []).map((tag) => ({
                            tag: tag,
                        })),
                    },
                },
            });
            migrated++;
            console.log(`  ✓ Migrated property: ${prop.title}`);
        } catch (err) {
            console.error(`  ✗ Failed to migrate property ${prop.id}:`, err.message);
        }
    }

    console.log(`✅ Properties migrated: ${migrated}/${properties.length}`);
    return migrated;
}

async function migrateTestimonials() {
    console.log('\n💬 Migrating Testimonials...');

    const { data: testimonials, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching testimonials:', error);
        return 0;
    }

    console.log(`Found ${testimonials.length} testimonials to migrate`);

    let migrated = 0;
    for (const test of testimonials) {
        try {
            const existing = await prisma.testimonial.findUnique({ where: { id: test.id } });
            if (existing) {
                console.log(`  Skipping ${test.id} - already exists`);
                continue;
            }

            await prisma.testimonial.create({
                data: {
                    id: test.id,
                    name: test.name || 'Anonymous',
                    role: test.role || '',
                    content: test.content || '',
                    rating: test.rating || 5,
                    image_url: test.image_url,
                    created_at: test.created_at ? new Date(test.created_at) : new Date(),
                },
            });
            migrated++;
            console.log(`  ✓ Migrated testimonial: ${test.name}`);
        } catch (err) {
            console.error(`  ✗ Failed to migrate testimonial ${test.id}:`, err.message);
        }
    }

    console.log(`✅ Testimonials migrated: ${migrated}/${testimonials.length}`);
    return migrated;
}

async function migratePageSeo() {
    console.log('\n🔍 Migrating Page SEO...');

    const { data: pages, error } = await supabase
        .from('page_seo')
        .select('*');

    if (error) {
        console.error('Error fetching page_seo:', error);
        return 0;
    }

    console.log(`Found ${pages.length} SEO pages to migrate`);

    let migrated = 0;
    for (const page of pages) {
        try {
            const existing = await prisma.pageSeo.findUnique({ where: { id: page.id } });
            if (existing) {
                console.log(`  Skipping ${page.route} - already exists`);
                continue;
            }

            await prisma.pageSeo.create({
                data: {
                    id: page.id,
                    route: page.route,
                    title: page.title || '',
                    description: page.description,
                    og_image: page.og_image,
                    updated_at: page.updated_at ? new Date(page.updated_at) : new Date(),
                },
            });
            migrated++;
            console.log(`  ✓ Migrated SEO: ${page.route}`);
        } catch (err) {
            console.error(`  ✗ Failed to migrate SEO ${page.route}:`, err.message);
        }
    }

    console.log(`✅ Page SEO migrated: ${migrated}/${pages.length}`);
    return migrated;
}

async function migratePageAssets() {
    console.log('\n🖼️ Migrating Page Assets...');

    const { data: assets, error } = await supabase
        .from('page_assets')
        .select('*');

    if (error) {
        console.error('Error fetching page_assets:', error);
        return 0;
    }

    console.log(`Found ${assets.length} page assets to migrate`);

    let migrated = 0;
    for (const asset of assets) {
        try {
            const existing = await prisma.pageAsset.findUnique({ where: { id: asset.id } });
            if (existing) {
                console.log(`  Skipping ${asset.section_key} - already exists`);
                continue;
            }

            await prisma.pageAsset.create({
                data: {
                    id: asset.id,
                    page_route: asset.page_route,
                    section_key: asset.section_key,
                    label: asset.label || '',
                    asset_url: asset.asset_url || '',
                    alt_text: asset.alt_text,
                    updated_at: asset.updated_at ? new Date(asset.updated_at) : new Date(),
                },
            });
            migrated++;
            console.log(`  ✓ Migrated asset: ${asset.section_key}`);
        } catch (err) {
            console.error(`  ✗ Failed to migrate asset ${asset.id}:`, err.message);
        }
    }

    console.log(`✅ Page Assets migrated: ${migrated}/${assets.length}`);
    return migrated;
}

async function migrateLeads() {
    console.log('\n📧 Migrating Leads...');

    const { data: leads, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching leads:', error);
        return 0;
    }

    console.log(`Found ${leads.length} leads to migrate`);

    let migrated = 0;
    for (const lead of leads) {
        try {
            const existing = await prisma.lead.findUnique({ where: { id: lead.id } });
            if (existing) {
                console.log(`  Skipping lead ${lead.id} - already exists`);
                continue;
            }

            await prisma.lead.create({
                data: {
                    id: lead.id,
                    name: lead.name || 'Unknown',
                    email: lead.email,
                    phone: lead.phone,
                    message: lead.message,
                    property_id: null, // We'll link this later if needed
                    source: lead.source || 'website',
                    created_at: lead.created_at ? new Date(lead.created_at) : new Date(),
                },
            });
            migrated++;
            console.log(`  ✓ Migrated lead: ${lead.name}`);
        } catch (err) {
            console.error(`  ✗ Failed to migrate lead ${lead.id}:`, err.message);
        }
    }

    console.log(`✅ Leads migrated: ${migrated}/${leads.length}`);
    return migrated;
}

async function main() {
    console.log('🚀 Starting Supabase to Hostinger Migration');
    console.log('==========================================\n');

    try {
        // Run all migrations
        const results = {
            properties: await migrateProperties(),
            testimonials: await migrateTestimonials(),
            pageSeo: await migratePageSeo(),
            pageAssets: await migratePageAssets(),
            leads: await migrateLeads(),
        };

        console.log('\n==========================================');
        console.log('📊 Migration Summary:');
        console.log('==========================================');
        console.log(`Properties:   ${results.properties}`);
        console.log(`Testimonials: ${results.testimonials}`);
        console.log(`Page SEO:     ${results.pageSeo}`);
        console.log(`Page Assets:  ${results.pageAssets}`);
        console.log(`Leads:        ${results.leads}`);
        console.log('==========================================');
        console.log('✅ Migration completed!');

    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Load environment variables and run
require('dotenv').config();
main();
