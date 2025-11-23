import { prisma } from '@/lib/prisma';
import { requireAuth, ok, err } from '@/lib/api';
import { ContentUploadUpdateSchema, zodErrorMessage } from '@/lib/validators';

export async function GET(_req: Request, { params }: { params: any }) {
  try {
    const item = await prisma.contentUpload.findUnique({
      where: { id: params.id },
    });
    if (!item) return err('Not found', 404);
    return ok(item);
  } catch (e: any) {
    return err(e.message || 'Error fetching upload');
  }
}

export async function PUT(req: Request, { params }: { params: any }) {
  try {
    await requireAuth();
    const body = await req.json();
    const parsed = ContentUploadUpdateSchema.parse(body);
    const updated = await prisma.contentUpload.update({
      where: { id: params.id },
      data: parsed,
    });
    return ok(updated);
  } catch (e: any) {
    return err(zodErrorMessage(e) || e.message || 'Error updating upload', 422);
  }
}

export async function DELETE(_req: Request, { params }: { params: any }) {
  try {
    await requireAuth();
    await prisma.contentUpload.delete({ where: { id: params.id } });
    return ok({ id: params.id });
  } catch (e: any) {
    return err(e.message || 'Error deleting upload');
  }
}
