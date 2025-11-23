import { prisma } from '@/lib/prisma';
import { requireAuth, ok, err } from '@/lib/api';
import { ContentUploadCreateSchema, zodErrorMessage } from '@/lib/validators';

export async function GET() {
  try {
    const items = await prisma.contentUpload.findMany();
    return ok(items);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return err(message || 'Error fetching uploads');
  }
}

export async function POST(req: Request) {
  try {
    await requireAuth();
    const body = await req.json();
    const parsed = ContentUploadCreateSchema.parse(body);
    const created = await prisma.contentUpload.create({ data: parsed });
    return ok(created);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return err(zodErrorMessage(e) || message || 'Error creating upload', 422);
  }
}
