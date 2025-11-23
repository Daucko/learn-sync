import { prisma } from '@/lib/prisma';
import { requireAuth, ok, err } from '@/lib/api';
import { CourseCreateSchema, zodErrorMessage } from '@/lib/validators';

export async function GET() {
  try {
    const items = await prisma.course.findMany();
    return ok(items);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return err(e.message || 'Error fetching courses');
  }
}

export async function POST(req: Request) {
  try {
    await requireAuth();
    const body = await req.json();
    const parsed = CourseCreateSchema.parse(body);
    const created = await prisma.course.create({ data: parsed });
    return ok(created);
  } catch (e: any) {
    return err(
      zodErrorMessage(e) ||
        (e instanceof Error ? e.message : String(e)) ||
        'Error creating course',
      422
    );
  }
}
