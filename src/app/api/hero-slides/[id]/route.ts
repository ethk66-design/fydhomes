import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession();
        if (!session) return new NextResponse("Unauthorized", { status: 401 });
        const { id } = await params;

        await prisma.heroSlide.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error('Failed to delete slide', error);
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}
