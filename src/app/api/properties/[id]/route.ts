import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
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
        if (!session || (session.user as { role?: string })?.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        const { images, tags, ...propertyData } = body;

        // Sanitize propertyData to exclude fields that shouldn't be updated manually
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _id, created_at, updated_at, ...cleanPropertyData } = propertyData;

        // Use array-based transaction for better stability
        // This executes queries sequentially but within a single transaction
        const [, , property] = await db.$transaction([
            db.propertyImage.deleteMany({ where: { property_id: id } }),
            db.propertyTag.deleteMany({ where: { property_id: id } }),
            db.property.update({
                where: { id },
                data: {
                    ...cleanPropertyData,
                    images: {
                        create: (images || []).map((url: string, index: number) => ({ url, order: index })),
                    },
                    tags: {
                        create: (tags || []).map((tag: string) => ({ tag })),
                    },
                },
                include: { images: true, tags: true },
            })
        ]);

        // Revalidate cache to show updates instantly
        revalidatePath('/');
        revalidatePath('/listings');
        revalidatePath(`/listings/${id}`);
        revalidatePath('/admin');

        const transformed = {
            ...property,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            images: property.images.map((img: any) => img.url),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            tags: property.tags.map((t: any) => t.tag),
        };

        return NextResponse.json(transformed);
    } catch (error: unknown) {
        console.error('Error updating property:', error);
        return NextResponse.json(
            { error: 'Failed to update property', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}

// DELETE /api/properties/[id] - Delete property (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as { role?: string })?.role !== 'admin') {
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
