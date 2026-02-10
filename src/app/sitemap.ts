
import { MetadataRoute } from 'next'
import { prisma } from '@/lib/db'

export const revalidate = 3600 // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://fydhomes.in'

    const staticRoutes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/listings`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
    ]

    try {
        // Fetch all properties using Prisma
        const properties = await prisma.property.findMany({
            select: {
                id: true,
                updated_at: true,
            },
        })

        const propertyUrls = properties.map((property) => ({
            url: `${baseUrl}/listings/${property.id}`,
            lastModified: new Date(property.updated_at || Date.now()),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }))

        return [...staticRoutes, ...propertyUrls]
    } catch (error) {
        console.warn('Database connection failed during sitemap generation. Returning only static routes.', error)
        return staticRoutes
    }
}
