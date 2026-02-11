import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/page-assets - List all page assets (public for frontend)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page_route = searchParams.get('page_route');

        const assets = await db.pageAsset.findMany({
            where: page_route ? { page_route } : undefined,
            orderBy: { section_key: 'asc' },
        });

        return NextResponse.json(assets);
    } catch (error) {
        console.error('Error fetching page assets:', error);
        return NextResponse.json({ error: 'Failed to fetch page assets' }, { status: 500 });
    }
}
