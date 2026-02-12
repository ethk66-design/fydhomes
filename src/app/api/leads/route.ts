import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

// POST /api/leads - Create new lead (public)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, message, property_id, source } = body;

        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        const lead = await db.lead.create({
            data: {
                name,
                email: email || null,
                phone: phone || null,
                message: message || null,
                property_id: property_id || null,
                source: source || 'website',
            },
        });

        return NextResponse.json(lead, { status: 201 });
    } catch (error) {
        console.error('Error creating lead:', error);
        return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
    }
}

// GET /api/leads - List leads (admin only)
export async function GET(_request: NextRequest) {
    try {
        // Note: Add auth check in production
        const leads = await db.lead.findMany({
            include: {
                property: {
                    select: { id: true, title: true },
                },
            },
            orderBy: { created_at: 'desc' },
        });

        return NextResponse.json(leads);
    } catch (error) {
        console.error('Error fetching leads:', error);
        return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
    }
}
