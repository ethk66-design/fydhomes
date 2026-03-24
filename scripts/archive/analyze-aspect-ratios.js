require('dotenv').config();
process.env.DATABASE_URL = process.env.DIRECT_URL;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const sizeOf = require('image-size').imageSize || require('image-size').default || require('image-size');

async function getImageSize(url) {
  // Translate to Supabase direct URL if it's JioBase, to avoid any Cloudflare blocks on bots.
  const fetchUrl = url.replace('fydhomes.jiobase.com', 'vexsmxrfxbatpyelugch.supabase.co');
  
  const response = await fetch(fetchUrl);
  if (!response.ok) throw new Error(`HTTP ${response.status} - ${response.statusText}`);
  
  const buffer = Buffer.from(await response.arrayBuffer());
  return sizeOf(buffer);
}

async function main() {
  const images = await prisma.propertyImage.findMany({
    take: 100, // Fetch up to 100 images
    orderBy: { created_at: 'desc' } // Note: propertyImage model doesn't have created_at usually, we will fallback to simple findMany if it fails, wait, checking schema...
  }).catch(() => prisma.propertyImage.findMany({ take: 100 }));
  
  console.log(`Found ${images.length} images. Analyzing aspect ratios...`);
  
  const ratios = {};
  for(const img of images) {
    try {
        const dim = await getImageSize(img.url);
        let numericRatio = dim.width / dim.height;
        const ratioText = numericRatio.toFixed(2);
        
        // Let's bucket them loosely
        let ratioName = "Custom / Unknown";
        if (numericRatio >= 1.30 && numericRatio <= 1.38) ratioName = "4:3 (Desktop Standard)";
        else if (numericRatio >= 1.70 && numericRatio <= 1.85) ratioName = "16:9 (Widescreen)";
        else if (numericRatio >= 0.70 && numericRatio <= 0.80) ratioName = "3:4 (Vertical/Portrait)";
        else if (numericRatio >= 0.50 && numericRatio <= 0.65) ratioName = "9:16 (Phone Vertical)";
        else if (numericRatio >= 0.95 && numericRatio <= 1.05) ratioName = "1:1 (Square)";
        else if (numericRatio > 1.38 && numericRatio <= 1.55) ratioName = "3:2 (Classic Photo)";
        else ratioName = `Custom (${dim.width}x${dim.height})`;
        
        console.log(`URL: ...${img.url.substring(img.url.length - 25)} | ${dim.width}x${dim.height} | Ratio: ${ratioText} (${ratioName})`);
        
        const key = `${ratioName}`;
        ratios[key] = (ratios[key] || 0) + 1;
    } catch (e) {
        console.log(`Failed for ...${img.url.substring(img.url.length - 25)} - ${e.message}`);
    }
  }
  
  console.log('\n--- Summary of Aspect Ratios (Sample of ~100) ---');
  for(const [ratio, count] of Object.entries(ratios)) {
      console.log(`- ${ratio}: ${count} images`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
