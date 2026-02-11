import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/page-seo - List all SEO pages (admin only)
export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const pages = await db.pageSeo.findMany({
            orderBy: { route: 'asc' },
        });

        return NextResponse.json(pages);
    } catch (error) {
        console.error('Error fetching SEO pages:', error);
        return NextResponse.json({ error: 'Failed to fetch SEO pages' }, { status: 500 });
    }
}
