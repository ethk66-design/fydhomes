import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    const startTime = Date.now();

    try {
        // Test database connection
        const propertyCount = await db.property.count();
        const userCount = await db.user.count();

        const responseTime = Date.now() - startTime;

        return NextResponse.json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            database: {
                connected: true,
                responseTimeMs: responseTime,
                properties: propertyCount,
                users: userCount,
            },
            environment: {
                nodeEnv: process.env.NODE_ENV,
                hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
                hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
                hasDatabaseUrl: !!process.env.DATABASE_URL,
            },
        });
    } catch (error) {
        const responseTime = Date.now() - startTime;
        console.error('[Health Check] Database connection failed:', error);

        return NextResponse.json({
            status: 'unhealthy',
            timestamp: new Date().toISOString(),
            database: {
                connected: false,
                responseTimeMs: responseTime,
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            environment: {
                nodeEnv: process.env.NODE_ENV,
                hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
                hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
                hasDatabaseUrl: !!process.env.DATABASE_URL,
            },
        }, { status: 503 });
    }
}
