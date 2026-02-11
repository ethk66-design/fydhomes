import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                console.log('[Auth] Attempting login for:', credentials?.email);
                console.log('[Auth] NEXTAUTH_SECRET Check:', process.env.NEXTAUTH_SECRET ? 'Present' : 'MISSING');

                try {
                    if (!credentials?.email || !credentials?.password) {
                        console.log('[Auth] Missing credentials');
                        return null;
                    }

                    const user = await db.user.findUnique({
                        where: { email: credentials.email },
                    });

                    if (!user) {
                        console.log('[Auth] User not found in DB');
                        return null;
                    }

                    console.log('[Auth] User found, verifying password...');
                    const isValid = await bcrypt.compare(credentials.password, user.password_hash);

                    if (!isValid) {
                        console.log('[Auth] Invalid password');
                        return null;
                    }

                    console.log('[Auth] Login successful for user:', user.id);
                    return {
                        id: user.id,
                        email: user.email,
                        name: user.full_name,
                        role: user.role,
                    };
                } catch (error) {
                    console.error('[Auth] Authorization ERROR:', error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
        },
    },
    pages: {
        signIn: '/admin/login',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
};
