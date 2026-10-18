const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function runTests() {
  console.log('====================================================');
  console.log('🚀 FYD HOMES — ADMIN & BACKEND AUTOMATED VERIFICATION');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  // Helper
  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // ----------------------------------------------------
    // TEST 1: Database Connectivity & Core Admin User
    // ----------------------------------------------------
    console.log('--- TEST 1: Database Connectivity & Admin User ---');
    const adminUser = await prisma.user.findUnique({
      where: { email: 'admin@fydhomes.in' },
    });
    assert(adminUser !== null, 'Admin user exists in database');
    assert(adminUser?.role === 'admin', 'Admin user has role="admin"');
    assert(Boolean(adminUser?.password_hash), 'Admin user has bcrypt password hash');

    // ----------------------------------------------------
    // TEST 2: Agent Creation, Hashing & Verification
    // ----------------------------------------------------
    console.log('\n--- TEST 2: Agent Creation & NextAuth Credentials Compatibility ---');
    const testEmail = `test_agent_${Date.now()}@fydhomes.test`;
    const testPassword = 'SecurePassword123!';
    const passwordHash = await bcrypt.hash(testPassword, 10);

    const createdAgent = await prisma.user.create({
      data: {
        email: testEmail,
        password_hash: passwordHash,
        full_name: 'Test Verification Agent',
        role: 'agent',
      },
    });
    assert(createdAgent.id !== null, 'Agent created in Prisma db.user');
    assert(createdAgent.role === 'agent', 'Agent has role="agent"');

    // Test bcrypt comparison (as done by NextAuth credentials authorize)
    const passwordMatches = await bcrypt.compare(testPassword, createdAgent.password_hash);
    assert(passwordMatches === true, 'NextAuth bcrypt password check succeeds');

    const wrongPasswordFails = await bcrypt.compare('WrongPassword', createdAgent.password_hash);
    assert(wrongPasswordFails === false, 'NextAuth rejects invalid password');

    // Clean up test agent
    await prisma.user.delete({ where: { id: createdAgent.id } });
    const agentCleaned = await prisma.user.findUnique({ where: { id: createdAgent.id } });
    assert(agentCleaned === null, 'Test agent cleaned up successfully');

    // ----------------------------------------------------
    // TEST 3: Contact Form & Lead Pipeline
    // ----------------------------------------------------
    console.log('\n--- TEST 3: Contact Form -> Lead Pipeline ---');
    const testLead = await prisma.lead.create({
      data: {
        name: 'Automated Test Prospect',
        email: 'prospect@test.com',
        phone: '+919999999999',
        message: '[City: Kochi | Area: Kakkanad | Type: Villa | Budget: 1.5 Cr]\nLooking for a 4BHK villa.',
        source: 'contact_page',
      },
    });
    assert(testLead.id !== null, 'Lead created in db.lead table');
    assert(testLead.source === 'contact_page', 'Lead has source="contact_page"');
    assert(testLead.phone === '+919999999999', 'Lead phone number recorded accurately');

    // Verify lead query format (with property relation)
    const fetchedLead = await prisma.lead.findUnique({
      where: { id: testLead.id },
      include: { property: { select: { id: true, title: true } } },
    });
    assert(fetchedLead !== null, 'Lead retrieved successfully with relation include');

    // Clean up test lead
    await prisma.lead.delete({ where: { id: testLead.id } });
    const leadCleaned = await prisma.lead.findUnique({ where: { id: testLead.id } });
    assert(leadCleaned === null, 'Test lead cleaned up successfully');

    // ----------------------------------------------------
    // TEST 4: Property CRUD with Extended Fields & Relations
    // ----------------------------------------------------
    console.log('\n--- TEST 4: Property Creation & Field Verification ---');
    const testProperty = await prisma.property.create({
      data: {
        title: 'Luxury Verification Villa',
        description: '<p>A stunning villa for end-to-end testing.</p>',
        price: '₹ 2.50 Cr',
        location: 'Kakkanad, Kochi',
        beds: 4,
        baths: 4,
        area: '3200',
        land_area: '6.5 Cents',
        parkings: 2,
        youtube_video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        status: 'featured',
        type: 'Villa',
        listing_type: 'Sale',
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800', order: 0 },
            { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800', order: 1 },
          ],
        },
        tags: {
          create: [
            { tag: 'Swimming Pool' },
            { tag: 'Gated Community' },
          ],
        },
      },
      include: {
        images: { orderBy: { order: 'asc' } },
        tags: true,
      },
    });

    assert(testProperty.id !== null, 'Property created with UUID');
    assert(testProperty.images.length === 2, 'Property has 2 attached images in order');
    assert(testProperty.tags.length === 2, 'Property has 2 amenity tags');
    assert(testProperty.land_area === '6.5 Cents', 'land_area field matches client specifications');
    assert(testProperty.parkings === 2, 'parkings field matches');
    assert(testProperty.youtube_video !== null, 'youtube_video field matches');

    // Verify status toggle
    const updatedProperty = await prisma.property.update({
      where: { id: testProperty.id },
      data: { status: 'sold', sold_at: new Date() },
    });
    assert(updatedProperty.status === 'sold', 'Property status updated to "sold"');
    assert(updatedProperty.sold_at !== null, 'Property sold_at timestamp recorded');

    // Clean up test property (cascade deletes images and tags)
    await prisma.propertyImage.deleteMany({ where: { property_id: testProperty.id } });
    await prisma.propertyTag.deleteMany({ where: { property_id: testProperty.id } });
    await prisma.property.delete({ where: { id: testProperty.id } });
    const propertyCleaned = await prisma.property.findUnique({ where: { id: testProperty.id } });
    assert(propertyCleaned === null, 'Test property cleaned up successfully');

    // ----------------------------------------------------
    // TEST 5: Hero Slide CRUD
    // ----------------------------------------------------
    console.log('\n--- TEST 5: Hero Slide CRUD ---');
    const testSlide = await prisma.heroSlide.create({
      data: {
        image_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1920',
        order: 99,
      },
    });
    assert(testSlide.id !== null, 'Hero slide created');
    await prisma.heroSlide.delete({ where: { id: testSlide.id } });
    const slideCleaned = await prisma.heroSlide.findUnique({ where: { id: testSlide.id } });
    assert(slideCleaned === null, 'Hero slide deleted cleanly');

    // ----------------------------------------------------
    // TEST 6: Testimonials CRUD
    // ----------------------------------------------------
    console.log('\n--- TEST 6: Testimonials CRUD ---');
    const testTestimonial = await prisma.testimonial.create({
      data: {
        name: 'Priya Varma',
        role: 'Villa Buyer, Kochi',
        content: 'FYD Homes provided unmatched service and transparency throughout our purchase.',
        rating: 5,
        image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
      },
    });
    assert(testTestimonial.id !== null, 'Testimonial created with 5-star rating');
    assert(testTestimonial.rating === 5, 'Rating stored as 5');
    await prisma.testimonial.delete({ where: { id: testTestimonial.id } });
    const testCleaned = await prisma.testimonial.findUnique({ where: { id: testTestimonial.id } });
    assert(testCleaned === null, 'Testimonial deleted cleanly');

    // ----------------------------------------------------
    // TEST 7: Page SEO & Page Assets Check
    // ----------------------------------------------------
    console.log('\n--- TEST 7: Page SEO & Page Assets Integrity ---');
    const homeSeo = await prisma.pageSeo.findUnique({ where: { route: '/' } });
    assert(homeSeo !== null, 'Home route ("/") SEO entry exists');

    const ctaAsset = await prisma.pageAsset.findFirst({ where: { section_key: 'cta_bg' } });
    assert(ctaAsset !== null, 'cta_bg asset exists in page_assets');

  } catch (err) {
    console.error('Unexpected test error:', err);
    failed++;
  } finally {
    await prisma.$disconnect();
  }

  console.log('\n====================================================');
  console.log(`📊 TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
