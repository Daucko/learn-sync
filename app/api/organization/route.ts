import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth, ok, err } from '@/lib/api';

export async function GET() {
  try {
    const items = await prisma.organization.findMany({
      include: { users: true, subjects: true },
    });
    return ok(items);
  } catch (e: any) {
    return err(e.message || 'Error fetching organizations');
  }
}

export async function POST(req: Request) {
  try {
    await requireAuth();
    const body = await req.json();
    const created = await prisma.organization.create({ data: body });
    return ok(created);
  } catch (e: any) {
    return err(e.message || 'Error creating organization');
  }
}
