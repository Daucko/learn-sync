import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { currentUser, clerkClient } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    const current = await currentUser();
    const userId = current?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const body = await req.json();
    const role = (body?.role as string) ?? 'student';

    // fetch clerk user details to populate email/name
    const clerkUser = await clerkClient.users.getUser(userId);
    const email = clerkUser.emailAddresses?.[0]?.emailAddress ?? null;
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
          name: fullName,
          role: normalized as any,
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
