import { prisma } from '@/lib/prisma';
import { requireAuth, ok, err } from '@/lib/api';
import { SubmissionCreateSchema, zodErrorMessage } from '@/lib/validators';

export async function GET() {
  try {
    const items = await prisma.submission.findMany();
    return ok(items);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return err(message || 'Error fetching submissions');
  }
}

export async function POST(req: Request) {
  try {
    await requireAuth();
    const body = await req.json();
    const parsed = SubmissionCreateSchema.parse(body);
    const created = await prisma.submission.create({ data: parsed });
    return ok(created);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return err(
      zodErrorMessage(e) || message || 'Error creating submission',
      422
    );
  }
}
