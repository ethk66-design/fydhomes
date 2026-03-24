const fs = require('fs');
const files = [
    'src/components/sections/why-choose-us.tsx',
    'src/components/sections/team-grid.tsx',
    'src/components/sections/PropertyTypes.tsx',
    'src/components/sections/property-gallery.tsx',
    'src/components/sections/newsletter.tsx',
    'src/components/sections/our-team.tsx',
    'src/components/sections/hero.tsx',
    'src/components/sections/ExpertGuidance.tsx',
    'src/components/sections/cta-consultation.tsx',
    'src/components/sections/about-hero.tsx',
    'src/app/page.tsx',
    'src/app/about/page.tsx'
];

let c = 0;
files.forEach(f => {
    if (fs.existsSync(f)) {
        let content = fs.readFileSync(f, 'utf8');
        if (content.includes('oxcvbyprrvbnmoyanpgu.supabase.co/storage/v1/object/public/property-images/general')) {
            content = content.replace(/oxcvbyprrvbnmoyanpgu\.supabase\.co\/storage\/v1\/object\/public\/property-images\/general/g, 'fydhomes.jiobase.com/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images');
            fs.writeFileSync(f, content);
            console.log('Fixed', f);
            c++;
        }
    }
});
console.log('Total files fixed:', c);
