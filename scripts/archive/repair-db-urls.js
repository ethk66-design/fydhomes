const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const OLD_URL_1 = 'vexsmxrfxbatpyelugch';
const OLD_URL_2 = 'slelguoygbfzlpylpxfs';
const NEW_URL = 'oxcvbyprrvbnmoyanpgu';

async function fix() {
    console.log('--- STARTING DB URL REPAIR ---');

    // 1. Fix PropertyImages
    const propImages = await prisma.propertyImage.findMany();
    let pCount = 0;

    for (const img of propImages) {
        if (img.url && (img.url.includes(OLD_URL_1) || img.url.includes(OLD_URL_2))) {
            let replaced = img.url.replace(/vexsmxrfxbatpyelugch/g, NEW_URL);
            replaced = replaced.replace(/slelguoygbfzlpylpxfs\.supabase\.co\/storage\/v1\/object\/public\/test-clones\/[^\/]+\/assets\/images/g, `${NEW_URL}.supabase.co/storage/v1/object/public/property-images/general`);
            replaced = replaced.replace(/slelguoygbfzlpylpxfs/g, NEW_URL);

            await prisma.propertyImage.update({
                where: { id: img.id },
                data: { url: replaced }
            });
            pCount++;
            console.log(`✅ Fixed PropertyImage: ${img.id}`);
        }
    }
    console.log(`\nFixed ${pCount} PropertyImage records.`);

    // 2. Fix PageAssets
    const assets = await prisma.pageAsset.findMany();
    let aCount = 0;

    for (const a of assets) {
        if (a.asset_url && (a.asset_url.includes(OLD_URL_1) || a.asset_url.includes(OLD_URL_2))) {
            let replaced = a.asset_url.replace(/vexsmxrfxbatpyelugch/g, NEW_URL);
            replaced = replaced.replace(/slelguoygbfzlpylpxfs\.supabase\.co\/storage\/v1\/object\/public\/test-clones\/[^\/]+\/assets\/images/g, `${NEW_URL}.supabase.co/storage/v1/object/public/property-images/general`);
            replaced = replaced.replace(/slelguoygbfzlpylpxfs/g, NEW_URL);

            await prisma.pageAsset.update({
                where: { id: a.id },
                data: { asset_url: replaced }
            });
            aCount++;
            console.log(`✅ Fixed PageAsset: ${a.id} (${a.section_key})`);
        }
    }
    console.log(`\nFixed ${aCount} PageAsset records.`);

    // 3. Fix PageSeo
    const metadata = await prisma.pageSeo.findMany();
    let mCount = 0;

    for (const meta of metadata) {
        if (meta.og_image && (meta.og_image.includes(OLD_URL_1) || meta.og_image.includes(OLD_URL_2))) {
            let replaced = meta.og_image.replace(/vexsmxrfxbatpyelugch/g, NEW_URL);
            replaced = replaced.replace(/slelguoygbfzlpylpxfs\.supabase\.co\/storage\/v1\/object\/public\/test-clones\/[^\/]+\/assets\/images/g, `${NEW_URL}.supabase.co/storage/v1/object/public/property-images/general`);
            replaced = replaced.replace(/slelguoygbfzlpylpxfs/g, NEW_URL);

            await prisma.pageSeo.update({
                where: { id: meta.id },
                data: { og_image: replaced }
            });
            mCount++;
            console.log(`✅ Fixed SEO Metadata: ${meta.id} (${meta.page_route})`);
        }
    }
    console.log(`\nFixed ${mCount} SEO Metadata records.`);

    console.log('\n--- DB REPAIR COMPLETE ---');
}

fix().catch(e => console.error(e)).finally(() => prisma.$disconnect());
