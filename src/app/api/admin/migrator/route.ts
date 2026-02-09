
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// Force node runtime for filesystem access
export const runtime = 'nodejs';
// Increase timeout for long migration process
export const maxDuration = 300;

export async function POST(request: NextRequest) {
    // 1. Auth Check
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action } = await request.json(); // action: 'analyze' | 'migrate'

    // 2. Fetch all properties
    const properties = await db.property.findMany({
        select: { id: true, title: true, images: { orderBy: { order: 'asc' } } }
    });

    const migrationStats = {
        totalProperties: properties.length,
        totalImages: 0,
        needsMigration: 0,
        migrated: 0,
        errors: 0,
        logs: [] as string[]
    };

    if (action === 'analyze') {
        // Just report what needs to be done
        for (const p of properties) {
            for (const img of p.images) {
                migrationStats.totalImages++;
                // Check if external (http/https) and not already local (/uploads)
                if (img.url.startsWith('http') && !img.url.includes('/uploads/')) {
                    migrationStats.needsMigration++;
                }
            }
        }
        return NextResponse.json(migrationStats);
    }

    if (action === 'migrate') {
        const propertiesToProcess = properties.filter(p =>
            p.images.some(img => img.url.startsWith('http') && !img.url.includes('/uploads/'))
        );

        for (const p of propertiesToProcess) {
            const propertyDir = join(process.cwd(), 'public', 'uploads', 'properties', p.id);
            if (!existsSync(propertyDir)) {
                await mkdir(propertyDir, { recursive: true });
            }

            for (const img of p.images) {
                if (img.url.startsWith('http') && !img.url.includes('/uploads/')) {
                    try {
                        migrationStats.logs.push(`Migrating: ${p.title} - ${img.url}`);

                        // Download
                        const response = await fetch(img.url);
                        if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
                        const buffer = Buffer.from(await response.arrayBuffer());

                        // Generate safe filename
                        const urlObj = new URL(img.url);
                        let filename = urlObj.pathname.split('/').pop() || `image-${Date.now()}.jpg`;
                        // Remove special chars
                        filename = filename.replace(/[^a-z0-9.]/gi, '_');

                        // Ensure unique name if collision
                        if (existsSync(join(propertyDir, filename))) {
                            filename = `${Date.now()}-${filename}`;
                        }

                        // Save to disk
                        await writeFile(join(propertyDir, filename), buffer);

                        // Update DB
                        const newPath = `/uploads/properties/${p.id}/${filename}`;
                        await db.propertyImage.update({
                            where: { id: img.id },
                            data: { url: newPath }
                        });

                        migrationStats.migrated++;
                    } catch (e: any) {
                        migrationStats.errors++;
                        migrationStats.logs.push(`ERROR: ${img.url} - ${e.message}`);
                    }
                }
            }
        }
        return NextResponse.json(migrationStats);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}
