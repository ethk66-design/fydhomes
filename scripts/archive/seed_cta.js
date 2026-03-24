const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.pageAsset.upsert({
    where: {
      id: "cta-consult-bg-about-placeholder" 
    },
    update: {},
    create: {
      id: "cta-consult-bg-about-placeholder", // Just a UUID-like or unique string
      page_route: "/about",
      section_key: "about_cta_bg",
      label: "About Us - CTA Background",
      asset_url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      alt_text: "Sunset Architecture Background"
    }
  });
  
  console.log("Registered:", result.section_key);
}

main().catch(console.error).finally(() => prisma.$disconnect());
