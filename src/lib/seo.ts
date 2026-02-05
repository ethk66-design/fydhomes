import { db as prisma } from "@/lib/db";
import { Metadata } from "next";

export async function getSeoMetadata(route: string, defaultTitle: string, defaultDescription: string): Promise<Metadata> {
    try {
        // Guard clause for debugging
        if (!prisma) {
            console.error('Prisma client is undefined in getSeoMetadata');
            return { title: defaultTitle, description: defaultDescription };
        }

        // Debugging: Check if model exists
        /* 
        const modelName = 'pageSeo';
        if (!(modelName in prisma)) {
             console.error(`Prisma model '${modelName}' not found. Available keys:`, Object.keys(prisma));
        }
         */

        if (!prisma.pageSeo) { // Corrected from page_seo to pageSeo based on Schema model name 'PageSeo'
            console.error('SEO model "prisma.pageSeo" is undefined. Check schema definitions.');
            return { title: defaultTitle, description: defaultDescription };
        }

        const data = await prisma.pageSeo.findFirst({
            where: { route },
            select: {
                title: true,
                description: true,
                og_image: true,
            },
        });

        if (data) {
            return {
                title: data.title || defaultTitle,
                description: data.description || defaultDescription,
                openGraph: {
                    title: data.title || defaultTitle,
                    description: data.description || defaultDescription,
                    images: data.og_image ? [data.og_image] : undefined,
                },
            };
        }
    } catch (error) {
        console.error(`Error fetching SEO for ${route}:`, error);
    }

    return {
        title: defaultTitle,
        description: defaultDescription,
    };
}
