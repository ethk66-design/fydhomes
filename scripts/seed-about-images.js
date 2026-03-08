const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const assetsToSeed = [
        { key: 'about_team_agent_1', label: 'About Us - Agent 1 Image', defaultUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
        { key: 'about_team_agent_2', label: 'About Us - Agent 2 Image', defaultUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
        { key: 'about_team_agent_3', label: 'About Us - Agent 3 Image', defaultUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
        { key: 'about_team_agent_4', label: 'About Us - Agent 4 Image', defaultUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
        { key: 'about_feature_img_1', label: 'About Us - Digital Reach Image', defaultUrl: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80' },
        { key: 'about_feature_img_2', label: 'About Us - Kochi Connected Image', defaultUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80' },
        { key: 'about_feature_img_3', label: 'About Us - Transparent Service Image', defaultUrl: 'https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80' },
    ];

    for (const asset of assetsToSeed) {
        const existing = await prisma.pageAsset.findFirst({
            where: {
                page_route: '/about',
                section_key: asset.key
            }
        });

        if (existing) {
            await prisma.pageAsset.update({
                where: { id: existing.id },
                data: {
                    label: asset.label,
                    asset_url: asset.defaultUrl
                }
            });
            console.log(`Updated existing asset: ${asset.key}`);
        } else {
            await prisma.pageAsset.create({
                data: {
                    page_route: '/about',
                    section_key: asset.key,
                    label: asset.label,
                    asset_url: asset.defaultUrl,
                    alt_text: asset.label
                }
            });
            console.log(`Inserted new asset: ${asset.key}`);
        }
    }
    console.log('Successfully completed About Us DB asset seeding!');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
