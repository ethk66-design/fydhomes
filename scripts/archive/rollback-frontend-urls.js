const fs = require('fs');
const path = require('path');

const DIRECTORY_TO_SCAN = path.join(__dirname, '../src');

const PROXY_URL = 'https://fydhomes.jiobase.com/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/';
const US_URL = 'https://oxcvbyprrvbnmoyanpgu.supabase.co/storage/v1/object/public/property-images/general/';
const NATIVE_INDIA_URL = 'https://vexsmxrfxbatpyelugch.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/';

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

let modifiedFiles = 0;

walkDir(DIRECTORY_TO_SCAN, function (filePath) {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        let fileContent = fs.readFileSync(filePath, 'utf8');
        let originalContent = fileContent;

        // Replace proxy URLs
        fileContent = fileContent.replace(new RegExp(PROXY_URL, 'g'), NATIVE_INDIA_URL);
        fileContent = fileContent.replace(/https:\/\/fydhomes\.jiobase\.com/g, 'https://vexsmxrfxbatpyelugch.supabase.co');

        // Replace US URLs
        fileContent = fileContent.replace(new RegExp(US_URL, 'g'), NATIVE_INDIA_URL);
        fileContent = fileContent.replace(/https:\/\/oxcvbyprrvbnmoyanpgu\.supabase\.co\/storage\/v1\/object\/public\/property-images\/general/g, NATIVE_INDIA_URL);

        if (originalContent !== fileContent) {
            fs.writeFileSync(filePath, fileContent, 'utf8');
            console.log(`✅ Reverted URLs in: ${filePath}`);
            modifiedFiles++;
        }
    }
});

console.log(`\n🎉 Frontend URL Rollback Complete. Modified ${modifiedFiles} files.`);
