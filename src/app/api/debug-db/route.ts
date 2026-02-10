import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const url = process.env.DATABASE_URL || 'NOT_SET';
        // Mask password for safety
        const maskedUrl = url.replace(/:([^:@]+)@/, ':****@');

        // Test 1: Raw Connection
        await db.$queryRaw`SELECT 1`;
        const latencyRaw = Date.now() - startTime;

        // Test 2: Prisma Model Query (The real test)
        const startTimeModel = Date.now();
        const propertyCount = await db.property.count();
        const firstProperty = await db.property.findFirst({
            select: { id: true, title: true }
        });
        const latencyModel = Date.now() - startTimeModel;

        return NextResponse.json({
            status: 'success',
            message: 'Full Database Access Successful',
            checks: {
                rawConnection: 'OK',
                modelQuery: 'OK',
                propertyCount,
                firstPropertyFound: !!firstProperty
            },
            latency: {
                raw: `${latencyRaw}ms`,
                model: `${latencyModel}ms`
            },
            databaseUrlParam: maskedUrl,
            env: process.env.NODE_ENV,
        });
    } catch (error: any) {
        console.error('Debug DB Error:', error);
        return NextResponse.json({
            status: 'error',
            message: 'Database Check Failed',
            step: error.message?.includes('SELECT 1') ? 'Raw Connection' : 'Model Query',
            details: error.message,
            stack: error.stack,
            code: error.code,
            databaseUrlParam: process.env.DATABASE_URL ? process.env.DATABASE_URL.replace(/:([^:@]+)@/, ':****@') : 'NOT_SET'
        }, { status: 500 });
    }
}
