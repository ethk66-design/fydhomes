const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const US_DOMAIN = 'oxcvbyprrvbnmoyanpgu.supabase.co/storage/v1/object/public/property-images/general';
const PROXY_DOMAIN = 'fydhomes.jiobase.com/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images';

async function pointToProxy() {
    console.log('--- STARTING DB PROXY REDIRECT ---');

    const propImages = await prisma.propertyImage.findMany();
    let pCount = 0;

    for (const img of propImages) {
        if (img.url && img.url.includes('oxcvbyprrvbnmoyanpgu.supabase.co')) {
            let replaced = img.url.replace(/https:\/\/oxcvbyprrvbnmoyanpgu\.supabase\.co\/storage\/v1\/object\/public\/property-images\/general/g, `https://${PROXY_DOMAIN}`);
            replaced = replaced.replace(/oxcvbyprrvbnmoyanpgu\.supabase\.co\/storage\/v1\/object\/public\/property-images\/general/g, PROXY_DOMAIN);
            replaced = replaced.replace(/https:\/\/oxcvbyprrvbnmoyanpgu\.supabase\.co/g, `https://fydhomes.jiobase.com`);

            await prisma.propertyImage.update({
                where: { id: img.id },
                data: { url: replaced }
            });
            pCount++;
            console.log(`✅ Proxy Fixed PropertyImage: ${img.id}`);
        }
    }
    console.log(`\nFixed ${pCount} PropertyImage records.`);

    const assets = await prisma.pageAsset.findMany();
    let aCount = 0;

    for (const asset of assets) {
        if (asset.asset_url && asset.asset_url.includes('oxcvbyprrvbnmoyanpgu.supabase.co')) {
            let replaced = asset.asset_url.replace(/https:\/\/oxcvbyprrvbnmoyanpgu\.supabase\.co\/storage\/v1\/object\/public\/property-images\/general/g, `https://${PROXY_DOMAIN}`);
            replaced = replaced.replace(/oxcvbyprrvbnmoyanpgu\.supabase\.co\/storage\/v1\/object\/public\/property-images\/general/g, PROXY_DOMAIN);
            replaced = replaced.replace(/https:\/\/oxcvbyprrvbnmoyanpgu\.supabase\.co/g, `https://fydhomes.jiobase.com`);

            await prisma.pageAsset.update({
                where: { id: asset.id },
                data: { asset_url: replaced }
            });
            aCount++;
            console.log(`✅ Proxy Fixed PageAsset: ${asset.id} (${asset.section_key})`);
        }
    }
    console.log(`\nFixed ${aCount} PageAsset records.`);

    const metadata = await prisma.pageSeo.findMany();
    let mCount = 0;

    for (const meta of metadata) {
        if (meta.og_image && meta.og_image.includes('oxcvbyprrvbnmoyanpgu.supabase.co')) {
            let replaced = meta.og_image.replace(/https:\/\/oxcvbyprrvbnmoyanpgu\.supabase\.co\/storage\/v1\/object\/public\/property-images\/general/g, `https://${PROXY_DOMAIN}`);
            replaced = replaced.replace(/oxcvbyprrvbnmoyanpgu\.supabase\.co\/storage\/v1\/object\/public\/property-images\/general/g, PROXY_DOMAIN);
            replaced = replaced.replace(/https:\/\/oxcvbyprrvbnmoyanpgu\.supabase\.co/g, `https://fydhomes.jiobase.com`);

            await prisma.pageSeo.update({
                where: { id: meta.id },
                data: { og_image: replaced }
            });
            mCount++;
            console.log(`✅ Proxy Fixed PageSeo: ${meta.id} (${meta.route})`);
        }
    }
    console.log(`\nFixed ${mCount} PageSeo records.`);
    console.log('--- DB PROXY REDIRECT COMPLETE ---');
}

pointToProxy().catch(console.error).finally(() => prisma.$disconnect());
