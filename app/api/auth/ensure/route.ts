import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth, clerkClient } from '@clerk/nextjs';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const body = await req.json();
    const role = body?.role ?? 'student';

    // fetch clerk user details to populate email/name
    const clerkUser = await clerkClient.users.getUser(userId);
    const email = clerkUser.emailAddresses?.[0]?.emailAddress ?? null;
    const name = clerkUser.fullName ?? null;

    // find or create the app user
    let user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email,
          name,
          role: role.toUpperCase(),
        },
      });
    } else {
      // update role if provided and different
      const normalized = role.toUpperCase();
      if (user.role !== normalized) {
        user = await prisma.user.update({
          where: { clerkId: userId },
          data: { role: normalized },
        });
      }
    }

    return NextResponse.json({ user });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
