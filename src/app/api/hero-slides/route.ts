import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';

export async function GET() {
    try {
        const slides = await prisma.heroSlide.findMany({
            orderBy: { order: 'asc' },
        });
        return NextResponse.json(slides);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch slides' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession();
        if (!session) return new NextResponse("Unauthorized", { status: 401 });

        const body = await request.json();
        const { image_url, order } = body;

        const slide = await prisma.heroSlide.create({
            data: {
                image_url,
                order: order || 0,
            }
        });

        return NextResponse.json(slide);
    } catch (error) {
        console.error('Failed to create slide', error);
        return NextResponse.json({ error: 'Failed to create slide' }, { status: 500 });
    }
}
