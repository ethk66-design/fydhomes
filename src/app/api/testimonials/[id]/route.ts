import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/testimonials/[id] - Get testimonial details
export async function GET(
    request: NextRequest,
    paramsObj: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await paramsObj.params;
        const testimonial = await db.testimonial.findUnique({ where: { id } });

        if (!testimonial) {
            return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
        }

        return NextResponse.json(testimonial);
    } catch (_error) {
        return NextResponse.json({ error: 'Failed to fetch testimonial' }, { status: 500 });
    }
}

// PUT /api/testimonials/[id] - Update testimonial
export async function PUT(
    request: NextRequest,
    paramsObj: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as { role?: string })?.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await paramsObj.params;
        const body = await request.json();
        const { name, role, content, rating, image_url } = body;

        const updated = await db.testimonial.update({
            where: { id },
            data: { name, role, content, rating, image_url }
        });

        return NextResponse.json(updated);
    } catch (_error) {
        return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
    }
}

// DELETE /api/testimonials/[id] - Delete testimonial (admin only)
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

        await db.testimonial.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
    }
}
