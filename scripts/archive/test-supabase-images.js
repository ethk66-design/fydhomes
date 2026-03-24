import fetch from 'node-fetch';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkSupabaseTransforms() {
    try {
        const img = await prisma.propertyImage.findFirst({ select: { url: true } });
        console.log('Test Image URL:', img.url);

        // Attempt native Supabase Image Transformation route
        const transformUrl = img.url.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/') + '?width=400&quality=80';
        console.log('Transformation URL:', transformUrl);

        const res = await fetch(transformUrl);
        console.log('HTTP Status:', res.status);
        console.log('Response Headers:', Object.fromEntries(res.headers.entries()));

        if (res.status === 200) {
            console.log('SUCCESS: Supabase Pro Image Transformations are active!');
        } else {
            console.log('FAILED: Supabase Image Transformations are NOT active on this tier.');
            const text = await res.text();
            console.log('Error Body:', text.slice(0, 200));
        }
    } catch (e) {
        console.error('Fatal Error:', e.message);
    } finally {
        await prisma.$disconnect();
    }
}

checkSupabaseTransforms();
