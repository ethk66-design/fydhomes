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

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// -----------------------------------------------------------------------------
// DIAGNOSTIC LOGGING (Critical for debugging Hostinger 503s)
// -----------------------------------------------------------------------------
try {
    console.log("================================================================");
    console.log(`[SERVER-START] Starting server at ${new Date().toISOString()}`);
    console.log("----------------------------------------------------------------");

    // 1. OS Info
    console.log(`[OS-INFO] Platform: ${os.platform()} (${os.arch()})`);
    console.log(`[OS-INFO] Release:  ${os.release()}`);
    console.log(`[OS-INFO] Node Ver: ${process.version}`);
    try {
        const osRelease = fs.readFileSync('/etc/os-release', 'utf8').split('\n')[0];
        console.log(`[OS-INFO] Distro:   ${osRelease}`);
    } catch (e) {
        console.log(`[OS-INFO] Distro:   (Unavailable - ${e.code})`);
    }

    // 2. Environment Variables
    console.log("----------------------------------------------------------------");
    console.log(`[ENV] NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`[ENV] DATABASE_URL set: ${!!process.env.DATABASE_URL}`);
    console.log(`[ENV] DOTENV Loaded: ${!!dotenvResult.parsed}`);
    console.log(`[ENV] UV_THREADPOOL_SIZE: ${process.env.UV_THREADPOOL_SIZE}`);
    console.log(`[ENV] PRISMA_CLIENT_ENGINE_TYPE: ${process.env.PRISMA_CLIENT_ENGINE_TYPE || 'default (library)'}`);

    console.log("================================================================");
} catch (e) {
    console.error("[STARTUP-LOG-ERROR] Failed to log startup info:", e);
}
// -----------------------------------------------------------------------------

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        createServer(async (req, res) => {
            try {
                const parsedUrl = parse(req.url, true);
                await handle(req, res, parsedUrl);
            } catch (err) {
                console.error('[REQUEST-ERROR] Error occurred handling', req.url, err);
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
        })
            .once('error', (err) => {
                console.error("[SERVER-ERROR] Fatal:", err);
                process.exit(1);
            })
            .listen(port, () => {
                console.log(`> Ready on http://${hostname}:${port}`);
            });
    })
    .catch((err) => {
        console.error("[NEXT-PREPARE-ERROR] Failed to prepare Next.js app:", err);
        process.exit(1);
    });

// Global Error Handlers (Prevent silent exits)
process.on('uncaughtException', (err) => {
    console.error('[UNCAUGHT-EXCEPTION] Fatal:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('[UNHANDLED-REJECTION] at:', promise, 'reason:', reason);
});
