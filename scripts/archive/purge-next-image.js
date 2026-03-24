const fs = require('fs');

const filesToUpdate = [
    'src/components/sections/why-choose-us.tsx',
    'src/components/sections/testimonials.tsx',
    'src/components/sections/PropertyTypes.tsx',
    'src/components/sections/page-title.tsx',
    'src/components/sections/our-team.tsx',
    'src/components/sections/Navigation.tsx',
    'src/components/sections/header.tsx',
    'src/components/sections/footer.tsx',
    'src/components/sections/cta-consultation.tsx',
    'src/app/projects/page.tsx'
];

let totalReplaced = 0;

filesToUpdate.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');

        const hasNextImageImport = content.includes("import Image from 'next/image'");

        if (hasNextImageImport) {
            // Replace the import
            content = content.replace(/import Image from 'next\/image';?/g, "import ImageWithFallback from '@/components/ui/image-with-fallback';");

            // Replace the component tags safely. Be careful not to replace things like `typeof Image` or `<ImageGallery`, just exactly `<Image ` or `<Image\n`
            content = content.replace(/<Image\s/g, '<ImageWithFallback ');
            content = content.replace(/<Image\n/g, '<ImageWithFallback\n');

            // Write back
            fs.writeFileSync(file, content);
            console.log(`Updated: ${file}`);
            totalReplaced++;
        }
    } catch (e) {
        console.error(`Error processing ${file}:`, e.message);
    }
});

console.log(`Done! Purged next/image from ${totalReplaced} files.`);
