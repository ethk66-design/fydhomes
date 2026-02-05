import { NextResponse } from 'next/server';
import os from 'os';
import fs from 'fs';

export const dynamic = 'force-dynamic';

export async function GET() {
    let osRelease = 'Unknown';
    try {
        osRelease = fs.readFileSync('/etc/os-release', 'utf8');
    } catch (e: any) {
        osRelease = `Read Error: ${e.message}`;
    }

    // Checking if Prisma Client is loadable
    let prismaStatus = 'Not Loaded';
    try {
        const { prisma } = await import('@/lib/db');
        prismaStatus = prisma ? 'Instance Created' : 'Null';
    } catch (e: any) {
        prismaStatus = `Import Error: ${e.message}`;
    }

    return NextResponse.json({
        system: {
            platform: os.platform(),
            arch: os.arch(),
            release: os.release(),
            node: process.version,
            osReleaseFile: osRelease,
        },
        env: {
            NODE_ENV: process.env.NODE_ENV,
            // Masking secrets
            HAS_DB_URL: !!process.env.DATABASE_URL,
            PRISMA_ENGINE: process.env.PRISMA_CLIENT_ENGINE_TYPE,
            THREAD_POOL: process.env.UV_THREADPOOL_SIZE,
            NEXT_RUNTIME: process.env.NEXT_RUNTIME,
        },
        app: {
            prismaStatus
        }
    });
}
