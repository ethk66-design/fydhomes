export async function register() {
    // CRITICAL: Set this as early as possible for Hostinger stability
    process.env.UV_THREADPOOL_SIZE = '1';

    if (process.env.NEXT_RUNTIME === 'nodejs') {
        const os = await import('os');
        const fs = await import('fs');

        console.log("----------------------------------------");
        console.log("[INSTRUMENTATION] Next.js is starting...");
        console.log(`[INSTRUMENTATION] Env: ${process.env.NODE_ENV}`);
        console.log(`[INSTRUMENTATION] Thread Pool: ${process.env.UV_THREADPOOL_SIZE}`);
        console.log(`[INSTRUMENTATION] Node: ${process.version}`);
        console.log(`[INSTRUMENTATION] Platform: ${os.platform()} ${os.arch()}`);

        try {
            const release = fs.readFileSync('/etc/os-release', 'utf8').split('\n')[0];
            console.log(`[INSTRUMENTATION] Distro: ${release}`);
        } catch (e) {
            console.log(`[INSTRUMENTATION] Distro: (Unavailable)`);
        }
        console.log("----------------------------------------");
    }
}
