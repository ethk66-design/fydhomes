import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/properties/[id] - Get single property
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const property = await db.property.findUnique({
            where: { id },
            include: {
                images: { orderBy: { order: 'asc' } },
                tags: true,
            },
        });

        if (!property) {
            return NextResponse.json({ error: 'Property not found' }, { status: 404 });
        }

        // Transform to match existing Property type
        const transformed = {
            ...property,
            images: property.images.map((img) => img.url),
            tags: property.tags.map((t) => t.tag),
        };

        return NextResponse.json(transformed);
    } catch (error) {
        console.error('Error fetching property:', error);
        return NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 });
    }
}

// PUT /api/properties/[id] - Update property (admin only)
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
        const { images, tags, ...propertyData } = body;

        // Transactional update to ensure data integrity
        const property = await db.$transaction(async (tx) => {
            // Delete existing images and tags
            await tx.propertyImage.deleteMany({ where: { property_id: id } });
            await tx.propertyTag.deleteMany({ where: { property_id: id } });

            // Update property with new data
            return await tx.property.update({
                where: { id },
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
        });

        const transformed = {
            ...property,
            images: property.images.map((img) => img.url),
            tags: property.tags.map((t) => t.tag),
        };

        return NextResponse.json(transformed);
    } catch (error) {
        console.error('Error updating property:', error);
        return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
    }
}

// DELETE /api/properties/[id] - Delete property (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        await db.property.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting property:', error);
        return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
    }
}
