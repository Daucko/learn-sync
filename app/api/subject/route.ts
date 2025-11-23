import { prisma } from '@/lib/prisma';
import { requireAuth, ok, err } from '@/lib/api';
import { SubjectCreateSchema, zodErrorMessage } from '@/lib/validators';

export async function GET() {
  try {
    const items = await prisma.subject.findMany();
    return ok(items);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return err(message || 'Error fetching subjects');
  }
}

export async function POST(req: Request) {
  try {
    await requireAuth();
    const body = await req.json();
    const parsed = SubjectCreateSchema.parse(body);
    const created = await prisma.subject.create({ data: parsed });
    return ok(created);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return err(zodErrorMessage(e) || message || 'Error creating subject', 422);
  }
}
