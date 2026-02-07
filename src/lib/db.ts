import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Fail safe: Do not instantiate Prisma if environment is not ready (prevents boot loops)
const prismaClientSingleton = () => {
    return new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
};

export const db = globalForPrisma.prisma || prismaClientSingleton();
export const prisma = db; // Alias for compatibility

// CRITICAL: Always cache the singleton to prevent connection pool exhaustion
globalForPrisma.prisma = db;
