
const fs = require('fs');
const path = require('path');

// Try to read .env file content if it exists to see if it's potentially conflicting
// (We won't print secrets, just existence)
if (fs.existsSync('.env')) {
    console.log(' [DEBUG] .env file FOUND in root directory.');
} else {
    console.log(' [DEBUG] .env file NOT found in root directory.');
}

const url = process.env.DATABASE_URL;

if (!url) {
    console.error(' [DEBUG] ERROR: DATABASE_URL is NOT defined in environment variables.');
} else {
    // Mask the password part of the URL: protocol://user:password@host...
    // Regex looks for :password@
    const maskedUrl = url.replace(/(:)([^:@]+)(@)/, '$1*****$3');
    console.log(` [DEBUG] DATABASE_URL is set: ${maskedUrl}`);

    // Parse and log distinct parts (safe version)
    try {
        // Need to handle potential lack of protocol for URL parsing if it's just a connection string
        // But usually it starts with mysql:// or postgresql://
        const parsed = new URL(url);
        console.log(` [DEBUG] Host: ${parsed.hostname}`);
        console.log(` [DEBUG] Port: ${parsed.port}`);
        console.log(` [DEBUG] User: ${parsed.username}`);
        console.log(` [DEBUG] DatabasePath: ${parsed.pathname}`);
    } catch (e) {
        console.log(' [DEBUG] Could not parse URL object:', e.message);
    }
}
