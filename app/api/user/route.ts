import { prisma } from '@/lib/prisma';
import { requireAuth, ok, err } from '@/lib/api';
import { UserCreateSchema, zodErrorMessage } from '@/lib/validators';

export async function GET() {
  try {
    const items = await prisma.user.findMany({
      include: { organization: true },
    });
    return ok(items);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return err(message || 'Error fetching users');
  }
}

export async function POST(req: Request) {
  try {
    await requireAuth();
    const body = await req.json();
    const parsed = UserCreateSchema.parse(body);
    const created = await prisma.user.create({ data: parsed });
    return ok(created);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return err(zodErrorMessage(e) || message || 'Error creating user', 422);
  }
}
