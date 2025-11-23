import { clerkClient } from '@clerk/nextjs/server';
import { prisma } from './prisma';

export async function ensureAppUser(clerkUserId: string) {
  const existing = await prisma.user.findUnique({
    where: { clerkId: clerkUserId },
  });
  if (existing) return existing;

  const u = await clerkClient.users.getUser(clerkUserId);
  // Ensure we don't pass nullable email to Prisma if the schema requires it.
  const email =
    u.emailAddresses?.[0]?.emailAddress ?? `${clerkUserId}@clerk.local`;
  const fullName = u.fullName ?? null;

  return prisma.user.create({
    data: {
      clerkId: clerkUserId,
      email,
      fullName,
    },
  });
}
