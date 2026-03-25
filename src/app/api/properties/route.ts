
// Force dynamic to ensure fresh data always
export const dynamic = 'force-dynamic';


import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { propertySchema } from '@/lib/validations/property';
import { rateLimit } from '@/lib/rate-limit';

// GET /api/properties - List properties with optional filters
export async function GET(request: NextRequest) {
    // Rate limit: 60 requests per minute
    const limitResponse = await rateLimit(request, 60, 60 * 1000);
    if (limitResponse) return limitResponse;

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
        const errorId = `ERR-${Date.now()}`;
        console.error(`[${errorId}] Error fetching properties:`, {
            error: error instanceof Error ? error.message : 'Unknown',
            stack: error instanceof Error ? error.stack : undefined,
        });
        return NextResponse.json({
            error: 'Failed to fetch properties',
            details: error instanceof Error ? error.message : 'Unknown error',
            errorId,
        }, { status: 500 });
    }
}

// POST /api/properties - Create new property (admin only)
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as { role?: string })?.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const parseResult = propertySchema.safeParse(body);

        if (!parseResult.success) {
            return NextResponse.json({ error: 'Validation failed', details: parseResult.error.flatten() }, { status: 400 });
        }

        const { images, tags, ...propertyData } = parseResult.data;

        // Ensure status and listing_type are valid explicitly to satisfy Prisma strict types if needed, 
        // though Zod handles the string validation.
        const property = await db.property.create({
            data: {
                ...propertyData,
                // Prisma expects strings for these, Zod ensures they match the enum values if provided
                status: propertyData.status,
                sold_at: propertyData.status === 'sold' ? new Date() : null,
                listing_type: propertyData.listing_type,
                images: {
                    create: (images || []).map((url, index) => ({ url, order: index })),
                },
                tags: {
                    create: (tags || []).map((tag) => ({ tag })),
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
