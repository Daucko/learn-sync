// lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// Create a PrismaClient and apply extensions. Cast the extended client
// back to PrismaClient to provide a stable exported type and avoid
// union-overload call signature issues in TypeScript.
function createClient(): PrismaClient {
  const base = new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });
  // $extends can produce a different client type; cast to PrismaClient
  // so consumers see a consistent API surface for typing purposes.
  return base.$extends(withAccelerate()) as unknown as PrismaClient;
}

type GlobalPrisma = typeof globalThis & {
  prisma?: PrismaClient;
};

const globalForPrisma = globalThis as GlobalPrisma;

export const prisma: PrismaClient = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
