import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { createClient } from '@supabase/supabase-js';

// Force dynamic to ensure it runs fresh when called by Vercel cron
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    // 1. Authenticate the request (Securing the cron endpoint)
    // Vercel securely sends an Authorization header with the CRON_SECRET
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        // 2. Calculate the cutoff date (Exactly 15 days ago)
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - 15);

        // 3. Find properties that are 'sold' and whose sold_at is 15 days ago or older
        const propertiesToDelete = await db.property.findMany({
            where: {
                status: 'sold',
                sold_at: {
                    lte: cutoffDate
                }
            },
            include: { images: true }
        });

        if (propertiesToDelete.length === 0) {
            return NextResponse.json({ message: 'No properties to clean up' });
        }

        console.log(`[Cron] Found ${propertiesToDelete.length} sold properties to delete.`);

        // 4. Setup Supabase admin client for image deletion
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
        const supabase = createClient(supabaseUrl, supabaseServiceKey, {
            auth: { persistSession: false }
        });

        const BUCKET_NAME = 'property-images';
        let deletedImagesCount = 0;

        // 5. Delete images from Supabase storage first
        for (const property of propertiesToDelete) {
            const pathsToDelete: string[] = [];

            for (const img of property.images) {
                if (img.url.includes(BUCKET_NAME)) {
                    // Extract path: general/uuid.jpg
                    const urlParts = img.url.split(`${BUCKET_NAME}/`);
                    if (urlParts.length > 1) {
                        pathsToDelete.push(urlParts[1]);
                    }
                }
            }

            if (pathsToDelete.length > 0) {
                const { error } = await supabase.storage.from(BUCKET_NAME).remove(pathsToDelete);
                if (error) {
                    console.error(`[Cron] Failed to delete images for property ${property.id}:`, error);
                } else {
                    deletedImagesCount += pathsToDelete.length;
                }
            }
        }

        // 6. Delete properties from Database
        // Note: Prisma deletes the related property_images and property_tags due to `onDelete: Cascade` in schema
        const propertyIds = propertiesToDelete.map(p => p.id);
        const dbResult = await db.property.deleteMany({
            where: {
                id: { in: propertyIds }
            }
        });

        return NextResponse.json({
            success: true,
            message: `Successfully cleaned up ${dbResult.count} properties and ${deletedImagesCount} images.`,
            propertyIds: propertyIds
        });

    } catch (error) {
        console.error('[Cron] Error executing cleanup cron:', error);
        return NextResponse.json({ error: 'Cleanup process failed', details: String(error) }, { status: 500 });
    }
}
