import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST() {
  try {
    const testEmail = 'admin@fydhomes.com';
    const testPassword = 'FydAdmin@2024';

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email: testEmail },
    });

    if (existingUser) {
      return NextResponse.json({
        message: 'Test admin user already exists',
        email: testEmail,
        password: testPassword,
        userId: existingUser.id
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(testPassword, 10);

    // Create user
    const user = await db.user.create({
      data: {
        email: testEmail,
        password_hash: passwordHash,
        full_name: 'FYD Admin',
        role: 'admin',
      },
    });

    return NextResponse.json({
      message: 'Test admin user created successfully',
      email: testEmail,
      password: testPassword,
      userId: user.id,
    });
  } catch (error: any) {
    console.error('Error creating test user:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
