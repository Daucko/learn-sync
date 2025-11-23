import { prisma } from '@/lib/prisma';
import { requireAuth, ok, err } from '@/lib/api';

export async function GET() {
  try {
    const items = await prisma.course.findMany();
    return ok(items);
  } catch (e: any) {
    return err(e.message || 'Error fetching courses');
  }
}

export async function POST(req: Request) {
  try {
    await requireAuth();
    const body = await req.json();
    const created = await prisma.course.create({ data: body });
    return ok(created);
  } catch (e: any) {
    return err(e.message || 'Error creating course');
  }
}
