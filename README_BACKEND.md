# Prisma schema & Clerk integration

This file explains how to initialize the database and integrate Clerk for authentication.

## Quick setup

1. Copy `.env.example` to `.env` and fill in `DATABASE_URL` and Clerk keys.

2. Install dependencies:

```bash
npm install
```

3. Generate Prisma client and run migrations (development):

```bash
npm run prisma:generate
npm run prisma:migrate:dev
```

4. Start the Next.js dev server:

```bash
npm run dev
```

## Notes about Clerk integration

- This project uses Clerk for authentication. The Prisma `User` model stores a `clerkId` (the Clerk user id) so you can link application data to Clerk-managed users.
- Use the `@clerk/nextjs` package on the frontend and backend. Typical patterns:
  - On first sign-in, create an application `User` row that references `clerkId`.
  - Use Clerk server-side SDK or webhooks to keep user data in sync.

Example: create app user on first sign-in (pseudo-code)

```ts
import { clerkClient } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function ensureAppUser(clerkUserId: string) {
  const existing = await prisma.user.findUnique({
    where: { clerkId: clerkUserId },
  });
  if (existing) return existing;

  const u = await clerkClient.users.getUser(clerkUserId);
  return prisma.user.create({
    data: {
      clerkId: clerkUserId,
      email: u.emailAddresses?.[0]?.emailAddress,
      name: u.fullName,
    },
  });
}
```

## Background jobs & uploads

- For large uploads, generate signed S3 (or compatible) URLs from the backend, upload directly from the client, then call an endpoint to mark completion and enqueue processing.
- Use Redis/BullMQ or a managed queue for heavy processing (video transcoding, thumbnails).

If you want, I can now:

- Add a small `lib/prisma.ts` helper that exports a singleton Prisma client for server use.
- Add an example `app/api/auth/route.ts` or server-side handler showing how to use Clerk to create/ensure the app user.
