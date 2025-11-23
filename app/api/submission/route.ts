import { prisma } from '@/lib/prisma';
import { requireAuth, ok, err } from '@/lib/api';
import { SubmissionCreateSchema, zodErrorMessage } from '@/lib/validators';

export async function GET() {
  try {
    const items = await prisma.submission.findMany();
    return ok(items);
  } catch (e: any) {
    return err(e.message || 'Error fetching submissions');
  }
}

export async function POST(req: Request) {
  try {
    await requireAuth();
    const body = await req.json();
    const parsed = SubmissionCreateSchema.parse(body);
    const created = await prisma.submission.create({ data: parsed });
    return ok(created);
  } catch (e: any) {
    return err(
      zodErrorMessage(e) || e.message || 'Error creating submission',
      422
    );
  }
}
