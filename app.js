/* eslint-disable no-console */
// CRITICAL: Limit thread pool to prevent crashes on limited Hostinger containers
process.env.UV_THREADPOOL_SIZE = '1';

// Load environment variables immediately
const dotenv = require('dotenv');
const dotenvResult = dotenv.config();

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const os = require('os');

// FILE LOGGING FOR DEBUGGING (Since Console Logs are missing)
function logToFile(message) {
    try {
        const logLine = `[${new Date().toISOString()}] ${message}\n`;
        fs.appendFileSync('runtime-debug.log', logLine);
    } catch (e) {
        // failed to write
    }
}

logToFile("STARTUP: app.js initialized");

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

logToFile(`CONFIG: PORT=${port}, NODE_ENV=${process.env.NODE_ENV}`);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        logToFile("NEXT: App prepared. Starting server...");
        createServer(async (req, res) => {
            try {
                const parsedUrl = parse(req.url, true);
                await handle(req, res, parsedUrl);
            } catch (err) {
                logToFile(`ERROR: Request failed ${req.url} - ${err.message}`);
                console.error('[REQUEST-ERROR] Error occurred handling', req.url, err);
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
        })
            .once('error', (err) => {
                logToFile(`FATAL: Server Error - ${err.message}`);
                console.error("[SERVER-ERROR] Fatal:", err);
                process.exit(1);
            })
            .listen(port, () => {
                logToFile(`READY: Listening on port ${port}`);
                console.log(`> Ready on http://${hostname}:${port}`);
            });
    })
    .catch((err) => {
        logToFile(`FATAL: Prepare Error - ${err.message}`);
        console.error("[NEXT-PREPARE-ERROR] Failed to prepare Next.js app:", err);
        process.exit(1);
    });

// Global Error Handlers
process.on('uncaughtException', (err) => {
    logToFile(`FATAL: Uncaught Exception - ${err.message}`);
    console.error('[UNCAUGHT-EXCEPTION] Fatal:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    logToFile(`FATAL: Unhandled Rejection - ${reason}`);
    console.error('[UNHANDLED-REJECTION] at:', promise, 'reason:', reason);
});
