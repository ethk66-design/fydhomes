const { PrismaClient } = require('@prisma/client');

async function verify() {
    const prisma = new PrismaClient();

    try {
        console.log('=== DATABASE VERIFICATION ===\n');

        // Properties
        const total = await prisma.property.count();
        const featured = await prisma.property.count({ where: { status: 'featured' } });
        const active = await prisma.property.count({ where: { status: 'active' } });
        const sale = await prisma.property.count({ where: { listing_type: 'Sale' } });
        const rent = await prisma.property.count({ where: { listing_type: 'Rent' } });

        console.log('PROPERTIES:');
        console.log('  Total:', total);
        console.log('  status=featured:', featured);
        console.log('  status=active:', active);
        console.log('  listing_type=Sale:', sale);
        console.log('  listing_type=Rent:', rent);

        // Images
        const images = await prisma.propertyImage.count();
        console.log('\nIMAGES:', images);

        // Users
        const users = await prisma.user.findMany({ select: { id: true, email: true, role: true } });
        console.log('\nUSERS:', users.length);
        users.forEach(u => console.log('  -', u.email, `(${u.role})`));

        // SEO
        const seo = await prisma.pageSeo.count();
        console.log('\nPAGE SEO:', seo);

        // Assets
        const assets = await prisma.pageAsset.count();
        console.log('PAGE ASSETS:', assets);

        // Testimonials
        const testimonials = await prisma.testimonial.count();
        console.log('TESTIMONIALS:', testimonials);

        // Leads
        const leads = await prisma.lead.count();
        console.log('LEADS:', leads);

        console.log('\n=== END VERIFICATION ===');

    } finally {
        await prisma.$disconnect();
    }
}

verify().catch(console.error);
