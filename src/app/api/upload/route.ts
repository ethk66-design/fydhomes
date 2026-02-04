import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { randomUUID } from 'crypto';
import { existsSync } from 'fs';

// POST /api/upload - Upload file (admin only)
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;
        const folder = (formData.get('folder') as string) || 'general';
        const oldUrl = formData.get('oldUrl') as string | null;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
        }

        // Read file content
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generate unique filename
        const ext = file.name.split('.').pop();
        const filename = `${randomUUID()}.${ext}`;
        const uploadDir = join(process.cwd(), 'public', 'uploads', folder);
        const filepath = join(uploadDir, filename);

        // Create directory if it doesn't exist
        await mkdir(uploadDir, { recursive: true });

        // Write new file
        await writeFile(filepath, buffer);

        // Delete old file if provided and exists
        if (oldUrl && oldUrl.startsWith('/uploads/')) {
            const oldPath = join(process.cwd(), 'public', oldUrl);
            if (existsSync(oldPath)) {
                try {
                    await unlink(oldPath);
                } catch (e) {
                    console.warn('Failed to delete old file:', e);
                }
            }
        }

        const publicUrl = `/uploads/${folder}/${filename}`;

        return NextResponse.json({ url: publicUrl });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }
}
