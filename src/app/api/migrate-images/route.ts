import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import { join, dirname, basename } from 'path';

// Force dynamic to avoid static generation
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        // Security check (Optional: Add a secret key if needed, using a query param ?)
        // For now, assume admin session or temporary open route (User will delete after usage).
        // Let's at least check for a secret header or param to prevent random abuse if desired.
        // But for simplicity during this "Fix" session, we'll leave it open or check session.
        // Checking session might be tricky if I run it from a script without cookie.
        // I'll add a simple query param 'key=migration_secret'.

        const { searchParams } = new URL(request.url);
        if (searchParams.get('key') !== 'orchids_migration_2024') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const BATCH_SIZE = 5;

        // 1. Find images to migrate
        const images = await prisma.propertyImage.findMany({
            where: {
                url: { contains: 'supabase.co' }
            },
            take: BATCH_SIZE,
            include: { property: { select: { id: true } } }
        });

        if (images.length === 0) {
            return NextResponse.json({ message: 'No images left to migrate', count: 0 });
        }

        let successCount = 0;
        const errors: Array<{ id: string; error: string }> = [];

        for (const img of images) {
            try {
                const propId = img.property_id;
                const oldUrl = img.url;

                // Download
                const res = await fetch(oldUrl);
                if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

                const arrayBuffer = await res.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                // Determine filename
                let filename = basename(new URL(oldUrl).pathname);
                // Sanitize
                filename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
                if (!filename || filename.length < 5) filename = `image-${img.id}.jpg`;

                // Paths
                // Note: On Hostinger, process.cwd() is usually the project root.
                // We need to write to public/uploads
                const relativePath = `/uploads/properties/${propId}/${filename}`;
                const absolutePath = join(process.cwd(), 'public', 'uploads', 'properties', propId, filename);

                // Ensure dir exists
                await mkdir(dirname(absolutePath), { recursive: true });

                // Save File
                await writeFile(absolutePath, buffer);

                // Update DB
                await prisma.propertyImage.update({
                    where: { id: img.id },
                    data: { url: relativePath }
                });

                successCount++;
            } catch (err: unknown) {
                console.error(`Migration error for image ${img.id}:`, err);
                errors.push({ id: img.id, error: err instanceof Error ? err.message : String(err) });
            }
        }

        // Check remaining
        const remaining = await prisma.propertyImage.count({
            where: { url: { contains: 'supabase.co' } }
        });

        return NextResponse.json({
            success: true,
            migrated: successCount,
            errors,
            remaining,
            str: "Batch processed"
        });

    } catch (error: unknown) {
        console.error('Migration API Error:', error);
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}
