import { db as prisma } from "@/lib/db";
import { Metadata } from "next";

export async function getSeoMetadata(route: string, defaultTitle: string, defaultDescription: string): Promise<Metadata> {
    try {
        const data = await prisma.page_seo.findFirst({
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
