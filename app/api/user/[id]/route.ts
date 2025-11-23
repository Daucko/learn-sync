import { prisma } from '@/lib/prisma';
import { requireAuth, ok, err } from '@/lib/api';

export async function GET(_req: Request, { params }: { params: any }) {
  try {
    const item = await prisma.user.findUnique({ where: { id: params.id } });
    if (!item) return err('Not found', 404);
    return ok(item);
  } catch (e: any) {
    return err(e.message || 'Error fetching user');
  }
}

export async function PUT(req: Request, { params }: { params: any }) {
  try {
    await requireAuth();
    const body = await req.json();
    const updated = await prisma.user.update({
      where: { id: params.id },
      data: body,
    });
    return ok(updated);
  } catch (e: any) {
    return err(e.message || 'Error updating user');
  }
}

export async function DELETE(_req: Request, { params }: { params: any }) {
  try {
    await requireAuth();
    await prisma.user.delete({ where: { id: params.id } });
    return ok({ id: params.id });
  } catch (e: any) {
    return err(e.message || 'Error deleting user');
  }
}
