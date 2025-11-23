import { clerkClient } from '@clerk/nextjs/server';
import { prisma } from './prisma';

export async function ensureAppUser(clerkUserId: string) {
  const existing = await prisma.user.findUnique({
    where: { clerkId: clerkUserId },
  });
  if (existing) return existing;

  const u = await clerkClient.users.getUser(clerkUserId);
  const email = u.emailAddresses?.[0]?.emailAddress ?? null;
  const name = u.fullName ?? null;

  return prisma.user.create({
    data: {
      clerkId: clerkUserId,
      email,
      name,
    },
  });
}
