const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '..', 'src');

// Color mapping (from old green/red themes to new Homiva Navy/Coral theme)
const colorMap = {
    // Old greens & teals -> Coral
    '#1db954': '#E3572D',
    '#1DB954': '#E3572D',
    '#2d7a8c': '#E3572D',
    '#2D7A8C': '#E3572D',
    '#205c6d': '#E3572D',
    '#205C6D': '#E3572D',

    // Old reds & brand blues -> Coral & Navy
    '#D32F2F': '#E3572D',
    '#d32f2f': '#E3572D',
    '#CC0000': '#16243E', // change darker red hover to Navy
    '#cc0000': '#16243E',
    '#00AEEF': '#16243E',
    '#00aeef': '#16243E',

    // Specific header fixes
    "bg-white border-b border-[#EAEAEA] sticky top-0": "bg-[#16243E] border-b border-[#0F172A] sticky top-0",
    "text-black hover:text-[#D32F2F]": "text-white hover:text-[#E3572D]",
    "p-2 text-black hover:text-[#D32F2F]": "p-2 text-white hover:text-[#E3572D]",
    "text-black hover:text-[#1db954]": "text-white hover:text-[#E3572D]"
};

// Recursive file walker
function walkSync(dir, filelist) {
    let files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function (file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist = walkSync(path.join(dir, file), filelist);
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
                filelist.push(path.join(dir, file));
            }
        }
    });
    return filelist;
}

const files = walkSync(directoryPath);

let modifiedCount = 0;

files.forEach(file => {
    let original = fs.readFileSync(file, 'utf8');
    let content = original;

    // Apply color regex replacements
    for (const [oldVal, newVal] of Object.entries(colorMap)) {
        const regex = new RegExp(oldVal, 'g');
        content = content.replace(regex, newVal);
    }

    // Special case for global.css structural changes
    if (file.endsWith('globals.css')) {
        content = content
            .replace(/--color-brand-primary: #E3572D;/g, '--color-brand-primary: #E3572D;\n  --color-brand-orange: #E3572D;\n  --color-brand-navy: #16243E;')
            .replace(/--primary: #000000;/g, '--primary: #16243E;')
            .replace(/--color-primary: #000000;/g, '--color-primary: #16243E;');
    }

    // Special case for footer and navigation
    if (file.endsWith('footer.tsx')) {
        content = content.replace(/bg-white/g, 'bg-[#0F172A]');
        content = content.replace(/text-black/g, 'text-white');
        content = content.replace(/text-\[\#666666\]/g, 'text-gray-300');
    }
    if (file.endsWith('Navigation.tsx')) {
        content = content.replace(/'bg-white shadow-md py-2' : 'bg-white py-4'/g, "'bg-[#16243E] shadow-xl py-2' : 'bg-[#16243E] py-4'");
        content = content.replace(/text-black/g, 'text-white');
    }

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        modifiedCount++;
    }
});

console.log(`Replaced themes in ${modifiedCount} files.`);
