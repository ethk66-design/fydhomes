const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function checkImageDomains() {
    console.log('🔍 Checking Image Domains...');

    try {
        const images = await prisma.propertyImage.findMany({
            select: { url: true }
        });

        const domains = new Set();
        const examples = {};

        images.forEach(img => {
            try {
                const url = new URL(img.url);
                if (!domains.has(url.hostname)) {
                    domains.add(url.hostname);
                    examples[url.hostname] = img.url;
                }
            } catch (e) {
                console.log(`❌ Invalid URL found: ${img.url}`);
            }
        });

        console.log('\n📊 Unique Domains Found:');
        domains.forEach(d => {
            console.log(`- ${d}`);
            console.log(`  Example: ${examples[d]}`);
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkImageDomains();
