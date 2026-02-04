import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// PUT /api/page-assets/[id] - Update page asset (admin only)
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
        const { asset_url, alt_text } = body;

        const asset = await db.pageAsset.update({
            where: { id },
            data: {
                asset_url,
                alt_text: alt_text || null,
            },
        });

        return NextResponse.json(asset);
    } catch (error) {
        console.error('Error updating page asset:', error);
        return NextResponse.json({ error: 'Failed to update page asset' }, { status: 500 });
    }
}
