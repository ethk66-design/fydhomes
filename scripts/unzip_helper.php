<?php
// unzip_helper.php
// Unzips deployment.zip and moves contents to root

$zipFile = 'deployment.zip';
$extractTo = './temp_extract';

header('Content-Type: text/plain');

if (!file_exists($zipFile)) {
    die("Error: $zipFile not found.\n");
}

$zip = new ZipArchive;
if ($zip->open($zipFile) === TRUE) {
    // 1. Extract to temp folder
    if (!is_dir($extractTo)) mkdir($extractTo);
    $zip->extractTo($extractTo);
    $zip->close();
    echo "Extracted $zipFile successfully.\n";

    // 2. Move files from .next/standalone to root
    // The zip contains .next/standalone/ structure
    $source = $extractTo . '/.next/standalone';
    
    if (is_dir($source)) {
        // Use rsync-like logic or simple move
        // Since PHP move is tricky with folders, we'll try to move critical folders
        
        // Function to recursively copy/move
        function moveDir($src, $dest) {
            if(!is_dir($dest)) mkdir($dest, 0755, true);
            foreach (scandir($src) as $file) {
                if ($file == '.' || $file == '..') continue;
                $s = "$src/$file";
                $d = "$dest/$file";
                if (is_dir($s)) {
                    moveDir($s, $d);
                } else {
                    copy($s, $d);
                }
            }
        }

        echo "Moving files from standalone to root...\n";
        moveDir($source, '.');
        echo "Files moved.\n";

        // 3. Cleanup
        // Recursive delete temp folder
        function delTree($dir) {
            $files = array_diff(scandir($dir), array('.','..'));
            foreach ($files as $file) {
                (is_dir("$dir/$file")) ? delTree("$dir/$file") : unlink("$dir/$file");
            }
            return rmdir($dir);
        }
        delTree($extractTo);
        unlink($zipFile);
        echo "Cleanup complete. Deployment Ready.\n";
    } else {
        echo "Error: Standalone directory not found in zip.\n";
    }

} else {
    echo "Error: Failed to open zip file.\n";
}
?>
