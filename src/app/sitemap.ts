import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://fydhomes.in';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // 1. Static Routes
    const staticRoutes = [
        '',
        '/listings',
        '/projects',
        '/about',
        '/contact',
        '/privacy-policy', // Added privacy policy
        '/terms',          // Added terms if it exists, otherwise just privacy
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));

    // 2. Dynamic Property Routes
    let propertyRoutes: MetadataRoute.Sitemap = [];

    try {
        const properties = await prisma.property.findMany({
            where: {
                status: 'active', // Only index active properties
            },
            select: {
                id: true,
                updated_at: true,
            },
            orderBy: {
                updated_at: 'desc',
            },
        });

        propertyRoutes = properties.map((property) => ({
            url: `${BASE_URL}/listings/${property.id}`,
            lastModified: property.updated_at,
            changeFrequency: 'daily' as const,
            priority: 0.9, // High priority for individual listings
        }));
    } catch (error) {
        console.error("Error generating sitemap for properties:", error);
    }

    return [...staticRoutes, ...propertyRoutes];
}
