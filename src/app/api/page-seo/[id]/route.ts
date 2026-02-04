import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/page-seo/[id] - Get single SEO page
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        const page = await db.pageSeo.findUnique({ where: { id } });

        if (!page) {
            return NextResponse.json({ error: 'Page not found' }, { status: 404 });
        }

        return NextResponse.json(page);
    } catch (error) {
        console.error('Error fetching SEO page:', error);
        return NextResponse.json({ error: 'Failed to fetch SEO page' }, { status: 500 });
    }
}

// PUT /api/page-seo/[id] - Update SEO page
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        const { title, description, og_image } = body;

        const page = await db.pageSeo.update({
            where: { id },
            data: {
                title,
                description: description || null,
                og_image: og_image || null,
            },
        });

        return NextResponse.json(page);
    } catch (error) {
        console.error('Error updating SEO page:', error);
        return NextResponse.json({ error: 'Failed to update SEO page' }, { status: 500 });
    }
}
