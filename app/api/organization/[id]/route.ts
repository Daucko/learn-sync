import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth, ok, err } from '@/lib/api';
import { OrganizationUpdateSchema, zodErrorMessage } from '@/lib/validators';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = await prisma.organization.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            email: true,
            fullName: true,
            role: true,
            avatarUrl: true,
          }
        },
        subjects: true
      },
    });
    if (!item) return err('Not found', 404);
    return ok(item);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return err(message || 'Error fetching organization');
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id } = await params;
    const body = await req.json();
    const parsed = OrganizationUpdateSchema.parse(body);
    const updated = await prisma.organization.update({
      where: { id },
      data: parsed,
    });
    return ok(updated);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return err(
      zodErrorMessage(e) || message || 'Error updating organization',
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
    const { id } = await params;
    await prisma.organization.delete({ where: { id } });
    return ok({ id });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return err(message || 'Error deleting organization');
  }
}
