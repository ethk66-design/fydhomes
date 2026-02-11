import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/testimonials - List all testimonials (public)
export async function GET() {
    try {
        const testimonials = await db.testimonial.findMany({
            orderBy: { created_at: 'desc' },
        });

        return NextResponse.json(testimonials);
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
    }
}

// POST /api/testimonials - Create testimonial (admin only)
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as { role?: string })?.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { name, role, content, rating, image_url } = body;

        if (!name || !content || !rating) {
            return NextResponse.json({ error: 'Name, content, and rating are required' }, { status: 400 });
        }

        const testimonial = await db.testimonial.create({
            data: {
                name,
                role: role || '',
                content,
                rating: parseInt(rating),
                image_url: image_url || null,
            },
        });

        return NextResponse.json(testimonial, { status: 201 });
    } catch (error) {
        console.error('Error creating testimonial:', error);
        return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
    }
}
