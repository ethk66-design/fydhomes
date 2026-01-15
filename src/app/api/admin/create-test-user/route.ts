import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const testEmail = 'admin@fydhomes.com';
  const testPassword = 'FydAdmin@2024';

  const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
  const userExists = existingUsers?.users?.some(u => u.email === testEmail);

  if (userExists) {
    return NextResponse.json({ 
      message: 'Test admin user already exists',
      email: testEmail,
      password: testPassword 
    });
  }

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: testEmail,
    password: testPassword,
    email_confirm: true,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    message: 'Test admin user created successfully',
    email: testEmail,
    password: testPassword,
    userId: data.user?.id,
  });
}
