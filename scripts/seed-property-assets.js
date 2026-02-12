const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ASSETS_TO_SEED = [
    {
        page_route: '/',
        section_key: 'property_type_villa',
        label: 'Property Type - Villa',
        asset_url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-1-758x564-11.jpeg',
        alt_text: 'Villa Property Type'
    },
    {
        page_route: '/',
        section_key: 'property_type_residential',
        label: 'Property Type - Residential',
        asset_url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-758x564-12.jpeg',
        alt_text: 'Residential Property Type'
    },
    {
        page_route: '/',
        section_key: 'property_type_plot',
        label: 'Property Type - Plot',
        asset_url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-1-758x564-11.jpeg',
        alt_text: 'Plot Property Type'
    },
    {
        page_route: '/',
        section_key: 'property_type_commercial',
        label: 'Property Type - Commercial',
        asset_url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-758x564-12.jpeg',
        alt_text: 'Commercial Property Type'
    },
    {
        page_route: '/',
        section_key: 'property_type_office',
        label: 'Property Type - Office',
        asset_url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-1-758x564-11.jpeg',
        alt_text: 'Office Property Type'
    },
    {
        page_route: '/',
        section_key: 'property_type_rent',
        label: 'Property Type - Rent',
        asset_url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-758x564-12.jpeg',
        alt_text: 'Rent Property Type'
    }
];

async function seedAssets() {
    console.log('Seeding Property Type Assets...');
    for (const asset of ASSETS_TO_SEED) {
        const existing = await prisma.pageAsset.findFirst({
            where: { section_key: asset.section_key }
        });

        if (!existing) {
            await prisma.pageAsset.create({ data: asset });
            console.log(`✅ Created: ${asset.label}`);
        } else {
            console.log(`ℹ️ Already exists: ${asset.label}`);
        }
    }
    console.log('Seeding complete.');
}

seedAssets()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
