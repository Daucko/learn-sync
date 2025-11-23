import { prisma } from '@/lib/prisma';
import { requireAuth, ok, err } from '@/lib/api';
import { UserCreateSchema, zodErrorMessage } from '@/lib/validators';

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
    const parsed = UserCreateSchema.parse(body);
    const created = await prisma.user.create({ data: parsed });
    return ok(created);
  } catch (e: any) {
    return err(zodErrorMessage(e) || e.message || 'Error creating user', 422);
  }
}
