
import { MetadataRoute } from 'next'
import { prisma } from '@/lib/db'

export const revalidate = 3600 // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://fydhomes.in'

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

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/listings`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        ...propertyUrls,
    ]
}
