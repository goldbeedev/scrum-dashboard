import { NextResponse } from 'next/server';
import { sendEmail } from '@/app/lib/email';

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    // Your user creation logic here
    // const user = await createUser({ email, name });

    // Send welcome email
    await sendEmail(email, 'welcome', { name });

    // Also add to Mailchimp for marketing communications (optional)
    await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to create account. Please try again.' },
      { status: 500 }
    );
  }
} 