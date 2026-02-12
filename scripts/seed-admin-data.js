require('dotenv').config({ path: '.env' });
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding Admin Data...');

    // --- 1. Seed Page SEO ---
    const seoPages = [
        { route: '/', title: 'FYD Homes | Luxury Villas in Kochi', description: 'Find your dream home with FYD Homes. We offer luxury villas, residential plots, and commercial spaces in Kochi and Kerala.' },
        { route: '/about', title: 'About Us | FYD Homes', description: 'Learn more about FYD Homes, our mission, vision, and the team behind our success.' },
        { route: '/projects', title: 'Our Projects | FYD Homes', description: 'Explore our latest completed and ongoing real estate projects in Kerala.' },
        { route: '/listings', title: 'Property Listings | FYD Homes', description: 'Browse our wide range of properties for sale and rent in Kochi, Kakkanad, and Aluva.' },
        { route: '/contact', title: 'Contact Us | FYD Homes', description: 'Get in touch with FYD Homes for inquiries about buying, selling, or developing properties.' },
        { route: '/services', title: 'Our Services | FYD Homes', description: 'We offer property management, construction, interior design, and real estate consultancy services.' },
    ];

    console.log('... seeding SEO pages');
    for (const page of seoPages) {
        const existing = await prisma.pageSeo.findUnique({
            where: { route: page.route },
        });

        if (!existing) {
            await prisma.pageSeo.create({
                data: page,
            });
            console.log(`   Created SEO for: ${page.route}`);
        } else {
            console.log(`   Skipped existing SEO: ${page.route}`);
        }
    }

    // --- 2. Seed Site Assets ---
    const siteAssets = [
        {
            page_route: '/',
            section_key: 'hero_bg',
            label: 'Home Hero Background',
            asset_url: 'https://images.unsplash.com/photo-1600596542815-2a4d9fdb01b9?q=80&w=2000&auto=format&fit=crop',
            alt_text: 'Luxury Villa Exterior'
        },
        {
            page_route: '/contact',
            section_key: 'cta_bg',
            label: 'Global CTA Background',
            asset_url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2000&auto=format&fit=crop',
            alt_text: 'Modern Living Room'
        },
        {
            page_route: '/projects',
            section_key: 'projects_hero',
            label: 'Projects Header Image',
            asset_url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2000&auto=format&fit=crop',
            alt_text: 'Construction Site or Finished Building'
        },
        {
            page_route: '/about',
            section_key: 'about_hero',
            label: 'About Page Hero',
            asset_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop',
            alt_text: 'Corporate Office Building'
        }
    ];

    console.log('... seeding Site Assets');
    for (const asset of siteAssets) {
        const existing = await prisma.pageAsset.findFirst({
            where: { page_route: asset.page_route, section_key: asset.section_key }
        });

        if (!existing) {
            await prisma.pageAsset.create({
                data: asset,
            });
            console.log(`   Created Asset: ${asset.label}`);
        } else {
            console.log(`   Skipped existing Asset: ${asset.label}`);
        }
    }

    console.log('✅ Seeding complete.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
