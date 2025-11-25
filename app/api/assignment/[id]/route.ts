// app/api/assignment/[id]/route.ts
import { prisma } from '@/lib/prisma';
import { requireAuth, ok, err } from '@/lib/api';
import { AssignmentUpdateSchema, zodErrorMessage } from '@/lib/validators';
import { NextRequest } from 'next/server';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // Await the params
    const item = await prisma.assignment.findUnique({
      where: { id },
    });
    if (!item) return err('Not found', 404);
    return ok(item);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return err(message || 'Error fetching assignment');
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id } = await params; // Await the params
    const body = await req.json();
    const parsed = AssignmentUpdateSchema.parse(body);
    const updated = await prisma.assignment.update({
      where: { id },
      data: parsed,
    });
    return ok(updated);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return err(
      zodErrorMessage(e) || message || 'Error updating assignment',
      422
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id } = await params; // Await the params
    await prisma.assignment.delete({ where: { id } });
    return ok({ id });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return err(message || 'Error deleting assignment');
  }
}
