import { prisma } from '@/lib/db';

export async function getPageAsset(
    pageRoute: string,
    sectionKey: string,
    defaultUrl: string
): Promise<string> {
    const cacheKey = `${pageRoute}:${sectionKey}`;

    try {
        const asset = await prisma.pageAsset.findFirst({
            where: {
                page_route: pageRoute,
                section_key: sectionKey,
            },
            select: {
                asset_url: true,
            },
        });

        if (asset?.asset_url) {
            return asset.asset_url;
        }
    } catch (error) {
        // Silent fail to default
        console.warn(`Failed to fetch asset for ${cacheKey}`, error);
    }

    return defaultUrl;
}
