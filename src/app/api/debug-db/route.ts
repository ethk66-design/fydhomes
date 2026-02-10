import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const url = process.env.DATABASE_URL || 'NOT_SET';
        // Mask password for safety
        const maskedUrl = url.replace(/:([^:@]+)@/, ':****@');

        const startTime = Date.now();
        // Test connection
        await db.$queryRaw`SELECT 1`;
        const duration = Date.now() - startTime;

        return NextResponse.json({
            status: 'success',
            message: 'Database connection successful',
            databaseUrlParam: maskedUrl,
            latency: `${duration}ms`,
            env: process.env.NODE_ENV,
            timestamp: new Date().toISOString()
        });
    } catch (error: any) {
        console.error('Debug DB Error:', error);
        return NextResponse.json({
            status: 'error',
            message: 'Database connection failed',
            details: error.message,
            code: error.code,
            databaseUrlParam: process.env.DATABASE_URL ? process.env.DATABASE_URL.replace(/:([^:@]+)@/, ':****@') : 'NOT_SET'
        }, { status: 500 });
    }
}
