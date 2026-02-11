import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

// Initialize Supabase Admin Client (Service Role)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error("❌ Missing Supabase credentials in .env");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        persistSession: false,
        autoRefreshToken: false,
    },
});

const BUCKET_NAME = 'property-images';

// POST /api/upload - Upload file to Supabase Storage
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
        // Clean folder name to be safe
        const safeFolder = folder.replace(/[^a-zA-Z0-9-_]/g, '');
        const storagePath = `${safeFolder}/${filename}`;

        // Upload to Supabase
        const { error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(storagePath, buffer, {
                contentType: file.type,
                upsert: false
            });

        if (error) {
            console.error('Supabase Upload Error:', error);
            throw new Error(`Upload failed: ${error.message}`);
        }

        // Get Public URL
        const { data: publicUrlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(storagePath);

        const publicUrl = publicUrlData.publicUrl;

        // Delete old file if provided (and it's a Supabase URL)
        // We only attempt to delete if it looks like it belongs to our bucket
        if (oldUrl && oldUrl.includes(BUCKET_NAME)) {
            try {
                // Extract path from URL (rough attempt)
                const urlParts = oldUrl.split(`${BUCKET_NAME}/`);
                if (urlParts.length > 1) {
                    const oldPath = urlParts[1];
                    await supabase.storage.from(BUCKET_NAME).remove([oldPath]);
                }
            } catch (_e) {
                console.warn('Failed to delete old remote file:', _e);
            }
        }

        return NextResponse.json({ url: publicUrl });

    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }
}
