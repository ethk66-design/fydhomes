import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});
export const prisma = db; // Alias for compatibility

// CRITICAL: Always cache the singleton to prevent connection pool exhaustion
globalForPrisma.prisma = db;
