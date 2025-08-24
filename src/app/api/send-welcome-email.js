import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const response = await resend.emails.send({
      from: 'Your App <onboarding@yourdomain.com>',
      to: email,
      subject: '🎉 Welcome to Our App!',
      html: `<h1>Hi there!</h1><p>Thanks for joining us. We're happy to have you.</p>`
    });

    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Email failed to send' },
      { status: 500 }
    );
  }
}
