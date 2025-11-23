import { prisma } from '@/lib/prisma';
import { requireAuth, ok, err } from '@/lib/api';
import { AssignmentCreateSchema, zodErrorMessage } from '@/lib/validators';

export async function GET() {
  try {
    const items = await prisma.assignment.findMany();
    return ok(items);
  } catch (e: any) {
    return err(e.message || 'Error fetching assignments');
  }
}

export async function POST(req: Request) {
  try {
    await requireAuth();
    const body = await req.json();
    const parsed = AssignmentCreateSchema.parse(body);
    const created = await prisma.assignment.create({ data: parsed });
    return ok(created);
  } catch (e: any) {
    return err(zodErrorMessage(e) || e.message || 'Error creating assignment', 422);
  }
}
