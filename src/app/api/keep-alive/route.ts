import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * Keep-Alive API Route
 * 
 * This endpoint pings the Supabase PostgreSQL database to prevent
 * the Supabase Free Tier project from being paused due to inactivity.
 * 
 * Supabase pauses free projects after 7 days of no database activity.
 * 
 * Set up a cron job (e.g., Vercel Cron, cron-job.org, or UptimeRobot)
 * to call this endpoint every 6 days:
 *   GET https://fydhomes.in/api/keep-alive
 */
export async function GET() {
    try {
        // Simple query to keep the database active
        const result = await prisma.$queryRaw`SELECT 1 as ping`;

        return NextResponse.json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            database: 'connected',
            result,
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error('[Keep-Alive] Database ping failed:', message);

        return NextResponse.json(
            {
                status: 'error',
                timestamp: new Date().toISOString(),
                database: 'disconnected',
                error: message,
            },
            { status: 500 }
        );
    }
}
