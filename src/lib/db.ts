import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Fail safe: Do not instantiate Prisma if environment is not ready (prevents boot loops)
const prismaClientSingleton = () => {
    // Hostinger specific: Ensure env is loaded
    if (!process.env.DATABASE_URL) {
        try {
            // Try loading from root
            // Note: In Next.js prod, process.cwd() is usually the project root
            const dotenv = require('dotenv');
            const path = require('path');
            dotenv.config({ path: path.join(process.cwd(), '.env') });
            console.log('[DB] Attempted manual .env load in db.ts');
        } catch (e) {
            console.error('[DB] Failed to load dotenv:', e);
        }
    }

    return new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
        datasources: {
            db: {
                url: process.env.DATABASE_URL,
            },
        },
    });
};

export const db = globalForPrisma.prisma || prismaClientSingleton();
export const prisma = db; // Alias for compatibility

// CRITICAL: Always cache the singleton to prevent connection pool exhaustion
globalForPrisma.prisma = db;
