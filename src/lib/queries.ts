import { db } from './db';
import { unstable_cache } from 'next/cache';

export const getPropertyCounts = unstable_cache(
    async () => {
        const [typeGroups, rentCount] = await Promise.all([
            db.property.groupBy({
                by: ['type'],
                where: { status: { in: ['active', 'featured'] } },
                _count: true,
            }),
            db.property.count({
                where: { status: { in: ['active', 'featured'] }, listing_type: 'Rent' }
            })
        ]);
        return { typeGroups, rentCount };
    },
    ['property-counts'],
    { revalidate: 3600, tags: ['properties', 'property-counts'] }
);

export const getFeaturedProperties = unstable_cache(
    async (listingType: 'Sale' | 'Rent', limit: number = 4) => {
        const properties = await db.property.findMany({
            where: { status: 'featured', listing_type: listingType },
            include: { images: { orderBy: { order: 'asc' } }, tags: true },
            take: limit,
            orderBy: { created_at: 'desc' }
        });

        // Transform to match Property interface
        return properties.map(p => ({
            ...p,
            created_at: p.created_at.toISOString(),
            updated_at: p.updated_at.toISOString(),
            images: p.images.map(img => img.url),
            tags: p.tags.map(t => t.tag),
        }));
    },
    ['featured-properties'],
    { revalidate: 3600, tags: ['properties', 'featured-properties'] }
);
