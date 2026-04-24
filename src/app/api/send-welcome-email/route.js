import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'Email service is not configured' }, { status: 503 });
    }

    const response = await resend.emails.send({
      from: process.env.RESEND_FROM || 'EduLift <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to EduLift',
      html: '<h1>Welcome to EduLift</h1><p>Thanks for joining us.</p>'
    });

    return NextResponse.json({ success: true, response }, { status: 200 });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: 'Email failed to send' }, { status: 500 });
  }
}
