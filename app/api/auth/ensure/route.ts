import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { currentUser, clerkClient } from '@clerk/nextjs/server';
import z, { zodErrorMessage } from '@/lib/validators';
import type { UserRole } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const current = await currentUser();
    const userId = current?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const body = await req.json();
    let role = 'student';
    try {
      const parsed = z.object({ role: z.string().optional() }).parse(body);
      role = (parsed.role as string | undefined) ?? 'student';
    } catch (e: unknown) {
      return NextResponse.json({ error: zodErrorMessage(e) }, { status: 422 });
    }

    // fetch clerk user details to populate email/name
    const clerkUser = await clerkClient.users.getUser(userId);
    const email =
      clerkUser.emailAddresses?.[0]?.emailAddress ?? `${userId}@clerk.local`;
    const fullName = clerkUser.fullName ?? null;

    // find or create the app user
    let user = await prisma.user.findUnique({ where: { clerkId: userId } });
    const normalized = role.replace(/-/g, '_').toUpperCase();
    if (!user) {
      // New user: create with chosen role
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email,
          fullName,
          role: normalized as unknown as UserRole,
        },
      });
      // Set Clerk public metadata role as slug (e.g. 'school-admin')
      const slugRole = normalized.toLowerCase().replace(/_/g, '-');
      await clerkClient.users.updateUser(userId, {
        publicMetadata: { role: slugRole },
      });
    } else {
      // Existing user: do not allow role change during sign-in
      if (user.role !== normalized) {
        const expectedSlug = String(user.role).toLowerCase().replace(/_/g, '-');
        return NextResponse.json(
          { error: 'ROLE_MISMATCH', expected: user.role, expectedSlug },
          { status: 403 }
        );
      }
      // role matches — ensure Clerk metadata is present
      const slugRole = normalized.toLowerCase().replace(/_/g, '-');
      await clerkClient.users.updateUser(userId, {
        publicMetadata: { role: slugRole },
      });
    }

    return NextResponse.json({ user });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
