import { prisma } from '@/lib/prisma';
import { requireAuth, ok, err } from '@/lib/api';

export async function GET() {
  try {
    const items = await prisma.user.findMany();
    return ok(items);
  } catch (e: any) {
    return err(e.message || 'Error fetching users');
  }
}

export async function POST(req: Request) {
  try {
    await requireAuth();
    const body = await req.json();
    const created = await prisma.user.create({ data: body });
    return ok(created);
  } catch (e: any) {
    return err(e.message || 'Error creating user');
  }
}
