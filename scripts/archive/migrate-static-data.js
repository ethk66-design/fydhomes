const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function migrateStaticData() {
    console.log('--- STARTING STATIC DATA MIGRATION ---');

    try {
        // 1. Testimonials
        console.log('\nMigrating Testimonials...');
        const testimonials = [
            {
                name: "Sarah Johnson",
                role: "Home Buyer",
                content: "FYD Homes made finding our dream villa incredibly easy. The team was professional and transparent throughout the process.",
                rating: 5,
                image_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"
            },
            {
                name: "Rahul Nair",
                role: "Property Investor",
                content: "I have purchased multiple plots through FYD. Their due diligence and legal support are unmatched in Kochi.",
                rating: 5,
                image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
            },
            {
                name: "Emily Davis",
                role: "Tenant",
                content: "Found a perfect rental apartment near InfoPark. The listing was exactly as described, no hidden surprises.",
                rating: 4,
                image_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200"
            }
        ];

        for (const t of testimonials) {
            // Check if similar exists (by name)
            const exists = await prisma.testimonial.findFirst({ where: { name: t.name } });
            if (!exists) {
                await prisma.testimonial.create({ data: t });
                console.log(`  + Created testimonial: ${t.name}`);
            } else {
                console.log(`  . Skipped testimonial: ${t.name} (Exists)`);
            }
        }

        // 2. Page SEO
        console.log('\nMigrating Page SEO...');
        const seoPages = [
            { route: '/', title: 'FYD Homes | Find Your Dream Home in Kerala', description: 'Premier real estate agency in Kochi offering luxury villas, apartments, and plots. Trusted by thousands.' },
            { route: '/about', title: 'About Us | FYD Homes', description: 'Learn about our journey, values, and the team behind FYD Homes.' },
            { route: '/contact', title: 'Contact Us | FYD Homes', description: 'Get in touch with us for property inquiries, site visits, or legal consultation.' },
            { route: '/listings', title: 'Calculated Properties | FYD Homes', description: 'Browse our extensive collection of properties for sale and rent in Kerala.' },
            { route: '/sell', title: 'Sell Your Property | FYD Homes', description: 'List your property with us and reach thousands of potential buyers.' },
            { route: '/legal/privacy-policy', title: 'Privacy Policy | FYD Homes', description: 'Our commitment to protecting your privacy.' },
            { route: '/legal/terms-conditions', title: 'Terms & Conditions | FYD Homes', description: 'Terms of service for using FYD Homes.' },
        ];

        for (const page of seoPages) {
            const exists = await prisma.pageSeo.findUnique({ where: { route: page.route } });
            if (!exists) {
                await prisma.pageSeo.create({ data: page });
                console.log(`  + Created SEO for: ${page.route}`);
            } else {
                console.log(`  . Skipped SEO for: ${page.route} (Exists)`);
            }
        }

        // 3. Page Assets (Site Images)
        console.log('\nMigrating Site Assets...');
        const siteAssets = [
            {
                page_route: '/',
                section_key: 'hero_bg',
                label: 'Home Hero Background',
                asset_url: 'https://images.unsplash.com/photo-1600596542815-e328701100f4?auto=format&fit=crop&q=80&w=2000',
                alt_text: 'Luxury Villa Exterior'
            },
            {
                page_route: '/about',
                section_key: 'hero_bg',
                label: 'About Page Hero',
                asset_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=2000',
                alt_text: 'Modern Office Architecture'
            },
            {
                page_route: '/contact',
                section_key: 'hero_bg',
                label: 'Contact Page Hero',
                asset_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000',
                alt_text: 'City Skyline'
            }
        ];

        for (const asset of siteAssets) {
            const exists = await prisma.pageAsset.findFirst({
                where: {
                    page_route: asset.page_route,
                    section_key: asset.section_key
                }
            });

            if (!exists) {
                await prisma.pageAsset.create({ data: asset });
                console.log(`  + Created Asset: ${asset.label}`);
            } else {
                console.log(`  . Skipped Asset: ${asset.label} (Exists)`);
            }
        }

        console.log('\n--- MIGRATION COMPLETE ---');

    } catch (e) {
        console.error('Migration Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

migrateStaticData();
