
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');

    // Simple authentication mechanism to prevent public access to debug info
    if (secret !== 'fydhomes-debug-2024') {
        return NextResponse.json(
            { status: 'error', message: 'Unauthorized access to system diagnostics.' },
            { status: 401 }
        );
    }

    try {
        const startTime = Date.now();

        // 1. Environment Check
        const envCheck = {
            NODE_ENV: process.env.NODE_ENV,
            DATABASE_provider: 'mysql', // From schema knowledge
            DATABASE_URL_CONFIGURED: !!process.env.DATABASE_URL,
            // Log connection details (safely masked)
            DATABASE_HOST: process.env.DB_HOST || 'via-url',
            DATABASE_USER: process.env.DB_USER || 'via-url',
        };

        // 2. Database Connectivity Check
        console.log('[HEALTH-CHECK] Attempting database connection...');

        // Simple query to verify connection
        const userCount = await prisma.user.count();

        // Also try a raw query to verify basic SQL execution
        const rawResult = await prisma.$queryRaw`SELECT 1 as check_val`;

        const duration = Date.now() - startTime;

        return NextResponse.json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            duration: `${duration}ms`,
            environment: envCheck,
            database: {
                connected: true,
                userCount,
                queryResult: rawResult ? 'success' : 'failed'
            }
        });

    } catch (error: any) {
        console.error('[HEALTH-CHECK-FAILED]', error);

        // Deep inspection of the error
        return NextResponse.json({
            status: 'critical_failure',
            timestamp: new Date().toISOString(),
            error: {
                message: error.message,
                code: error.code,
                meta: error.meta,
                name: error.name,
                // In production, stack traces are usually hidden, but for this authenticated
                // diagnostic route, we explicitly want to see it.
                stack: error.stack
            },
            environment: {
                DATABASE_URL_CONFIGURED: !!process.env.DATABASE_URL,
                // Crucial: check if the URL looks malformed (without revealing password)
                DATABASE_URL_VALID_FORMAT: process.env.DATABASE_URL ?
                    (process.env.DATABASE_URL.startsWith('mysql://') ? 'yes (mysql)' : 'no (wrong protocol)') : 'N/A'
            }
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
