import { prisma } from '@/lib/db';

import { unstable_cache } from 'next/cache';

export const getPageAsset = unstable_cache(
    async (pageRoute: string, sectionKey: string, defaultUrl: string) => {
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

            return asset?.asset_url || defaultUrl;
        } catch (error) {
            console.warn(`Failed to fetch asset for ${pageRoute}:${sectionKey}`, error);
            return defaultUrl;
        }
    },
    ['page-assets'],
    { revalidate: 3600, tags: ['page-assets'] }
);
