import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

// Prevent multiple instances of Prisma Client in development with HMR
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<PrismaClient['$extends']> | PrismaClient | undefined
}

function createClient() {
  const base = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
  })
  return base.$extends(withAccelerate())
}

export const prisma = (globalForPrisma.prisma as any) ?? createClient()

if (process.env.NODE_ENV !== 'production') (globalForPrisma as any).prisma = prisma

export default prisma
