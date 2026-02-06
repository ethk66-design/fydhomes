# Hostinger Deployment Guide

To fix the 503 errors and resource exhaustion, we need to switch from "Development Mode" to "Production Mode".

## 1. Update Code on Server

If you are pushing code via Git:

1. Push the latest changes (including `next.config.mjs` and `package.json`).
2. Pull changes on the Hostinger server.

If you are uploading files manually:

1. Upload `next.config.mjs`, `package.json`, `server.js`, and `.env`.

## 2. Rebuild the Application

Go to your Hostinger Terminal or SSH and run:

```bash
npm run build:prod
```

This will run `prisma generate` and `next build`.
*Note: We use `build:prod` to skip the `hostinger-init` script during the build for cleaner troubleshooting.*

## 3. Configure Startup Command

**CRITICAL STEP**: You must tell Hostinger to use our optimized server instead of the default `npm run dev`.

1. Go to **Hostinger Panel > VPS / Web Hosting > Node.js Application**.
2. Find the **"Startup Command"** or **"Application Startup File"** setting.
3. Change it to:

```bash
npm start
```

*Why? `npm start` runs `node server.js` which is optimized for production and limits resource usage.*

## 4. Restart Application

Click the **Restart** button in the Hostinger panel.

## 5. Verify

Check the **Application Logs** or `runtime-debug.log` file. You should see:
`[STARTUP] .env loaded successfully`
`> Ready on http://localhost:3000`
