import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const assets = await prisma.page_asset.findMany({
            orderBy: { page_route: 'asc' },
        });
        return NextResponse.json(assets);
    } catch (error) {
        console.error('Error fetching assets:', error);
        return NextResponse.json({ error: 'Failed to fetch assets' }, { status: 500 });
    }
}
