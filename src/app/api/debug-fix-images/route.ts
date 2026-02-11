import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        // 1. Find properties with NO images
        const emptyProperties = await prisma.property.findMany({
            where: {
                images: {
                    none: {}
                }
            },
            select: {
                id: true,
                title: true
            }
        });

        if (emptyProperties.length === 0) {
            return NextResponse.json({ message: '✅ No repair needed. All properties have images.' });
        }

        // 2. Fetch from Supabase
        const { data: sourceProperties, error } = await supabase
            .from('properties')
            .select('id, images')
            .in('id', emptyProperties.map(p => p.id));

        if (error) {
            return NextResponse.json({ error: `Supabase fetch failed: ${error.message}` }, { status: 500 });
        }

        // 3. Update in Transaction
        let fixedCount = 0;
        const logs: string[] = [];

        await prisma.$transaction(async (tx) => {
            for (const sourceProp of sourceProperties || []) {
                if (!sourceProp.images || !Array.isArray(sourceProp.images) || sourceProp.images.length === 0) {
                    logs.push(`⚠️ Property ${sourceProp.id} has no source images.`);
                    continue;
                }

                const imageCreates = sourceProp.images.map((url: string, index: number) => ({
                    property_id: sourceProp.id,
                    url: url,
                    order: index
                }));

                await tx.propertyImage.createMany({
                    data: imageCreates
                });

                fixedCount++;
                logs.push(`✅ Fixed ${sourceProp.id}: Added ${sourceProp.images.length} images.`);
            }
        });

        return NextResponse.json({
            success: true,
            fixedCount,
            logs
        });

    } catch (error: unknown) {
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}
