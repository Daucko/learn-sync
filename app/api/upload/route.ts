import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { requireAuth, ok, err } from '@/lib/api';
import { randomUUID } from 'crypto';

export async function POST(req: Request) {
    try {
        // 1. Authenticate user
        await requireAuth();

        // 2. Parse form data
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return err('No file uploaded', 400);
        }

        // 3. Prepare storage path
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create a unique filename to avoid collisions
        const fileExtension = file.name.split('.').pop();
        const fileName = `${randomUUID()}.${fileExtension}`;

        // Ensure uploads directory exists (just in case)
        const uploadDir = join(process.cwd(), 'public', 'uploads');
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) {
            // Ignore if directory exists
        }

        const filePath = join(uploadDir, fileName);

        // 4. Write file to disk
        await writeFile(filePath, buffer);

        // 5. Return the file URL
        const fileUrl = `/uploads/${fileName}`;

        return ok({
            url: fileUrl,
            originalName: file.name,
            size: file.size,
            type: file.type
        });

    } catch (e: unknown) {
        console.error('Upload error:', e);
        const message = e instanceof Error ? e.message : String(e);
        if (message === 'UNAUTHENTICATED') {
            return err('Unauthorized', 401);
        }
        return err(message || 'Error uploading file', 500);
    }
}
