const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '..', 'src', 'components', 'sections');

// These were missed green variations found in contact forms
const colorMap = {
    '#1db345': '#E3572D',
    '#17a33d': '#16243E', // hover
    '#1db945': '#E3572D',
    '#1db043': '#E3572D',
    '#199438': '#16243E' // hover
};

function walkSync(dir, filelist) {
    let files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function (file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist = walkSync(path.join(dir, file), filelist);
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
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

    for (const [oldVal, newVal] of Object.entries(colorMap)) {
        const regex = new RegExp(oldVal, 'gi');
        content = content.replace(regex, newVal);
    }

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        modifiedCount++;
    }
});

console.log(`Replaced secondary greens in ${modifiedCount} files.`);
