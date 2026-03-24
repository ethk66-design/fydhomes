const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const existing = await prisma.pageAsset.findFirst({
        where: {
            page_route: '/',
            section_key: 'newsletter_bg'
        }
    });

    if (existing) {
        await prisma.pageAsset.update({
            where: { id: existing.id },
            data: {
                label: 'Newsletter Background',
                asset_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
            }
        });
        console.log('Successfully updated existing Newsletter asset in DB!');
    } else {
        await prisma.pageAsset.create({
            data: {
                page_route: '/',
                section_key: 'newsletter_bg',
                label: 'Newsletter Background',
                asset_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
                alt_text: 'Newsletter Background'
            }
        });
        console.log('Successfully inserted Newsletter asset into DB!');
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
