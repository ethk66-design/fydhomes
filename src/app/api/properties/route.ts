import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/properties - List properties with optional filters
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const listing_type = searchParams.get('listing_type');
        const status = searchParams.get('status');
        const type = searchParams.get('type');
        const limit = parseInt(searchParams.get('limit') || '50');
        const featured = searchParams.get('featured') === 'true';

        const properties = await db.property.findMany({
            where: {
                ...(listing_type && { listing_type }),
                ...(status && { status }),
                ...(type && { type }),
                ...(featured && { status: 'featured' }),
            },
            include: {
                images: { orderBy: { order: 'asc' } },
                tags: true,
            },
            take: limit,
            orderBy: { created_at: 'desc' },
        });

        // Transform to match existing Property type (arrays instead of relations)
        const transformed = properties.map((p) => ({
            ...p,
            images: p.images.map((img) => img.url),
            tags: p.tags.map((t) => t.tag),
        }));

        return NextResponse.json(transformed);
    } catch (error) {
        console.error('Error fetching properties:', error);
        return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
    }
}

// POST /api/properties - Create new property (admin only)
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { images, tags, ...propertyData } = body;

        const property = await db.property.create({
            data: {
                ...propertyData,
                images: {
                    create: (images || []).map((url: string, index: number) => ({ url, order: index })),
                },
                tags: {
                    create: (tags || []).map((tag: string) => ({ tag })),
                },
            },
            include: { images: true, tags: true },
        });

        // Transform response
        const transformed = {
            ...property,
            images: property.images.map((img) => img.url),
            tags: property.tags.map((t) => t.tag),
        };

        return NextResponse.json(transformed, { status: 201 });
    } catch (error) {
        console.error('Error creating property:', error);
        return NextResponse.json({ error: 'Failed to create property' }, { status: 500 });
    }
}
