import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const url = process.env.DATABASE_URL || 'NOT_SET';
        // Mask password for safety
        const maskedUrl = url.replace(/:([^:@]+)@/, ':****@');

        // Test 1: Raw Connection
        const startTime = Date.now();
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
    } catch (error: unknown) {
        console.error('Debug DB Error:', error);
        const errMsg = error instanceof Error ? error.message : String(error);
        const errCode = (error as Record<string, unknown>)?.code;
        const errStack = error instanceof Error ? error.stack : undefined;
        return NextResponse.json({
            status: 'error',
            message: 'Database Check Failed',
            step: errMsg?.includes('SELECT 1') ? 'Raw Connection' : 'Model Query',
            details: errMsg,
            stack: errStack,
            code: errCode,
            databaseUrlParam: process.env.DATABASE_URL ? process.env.DATABASE_URL.replace(/:([^:@]+)@/, ':****@') : 'NOT_SET'
        }, { status: 500 });
    }
}
