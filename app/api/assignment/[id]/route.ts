import { prisma } from '@/lib/prisma';
import { requireAuth, ok, err } from '@/lib/api';
import { AssignmentUpdateSchema, zodErrorMessage } from '@/lib/validators';
import { ZodError } from 'zod';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = await prisma.assignment.findUnique({
      where: { id },
    });
    if (!item) return err('Not found', 404);
    return ok(item);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return err(message || 'Error fetching assignment');
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id } = await params;
    const body = await req.json();
    const parsed = AssignmentUpdateSchema.parse(body);
    const updated = await prisma.assignment.update({
      where: { id },
      data: parsed,
    });
    return ok(updated);
  } catch (error: unknown) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      return err(zodErrorMessage(error) || 'Validation error', 422);
    }

    const message = error instanceof Error ? error.message : String(error);
    return err(message || 'Error updating assignment', 422);
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id } = await params;
    await prisma.assignment.delete({ where: { id } });
    return ok({ id });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return err(message || 'Error deleting assignment');
  }
}
