import { NextResponse } from 'next/server';
import { sendEmail } from '../utils/sendEmail';

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await sendEmail({
      to: email,
      subject: 'Welcome to EduLift 🎉',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e6fd0;">Welcome to EduLift</h1>
          <p>Hi there!</p>
          <p>Thanks for joining us. We're excited to have you as part of the EduLift community.</p>
          <p>You can now:</p>
          <ul>
            <li>Browse internship opportunities</li>
            <li>Apply for scholarships</li>
            <li>Connect with other students</li>
            <li>Build your professional profile</li>
          </ul>
          <p>Get started by exploring our opportunities today!</p>
          <p>Best regards,<br/>The EduLift Team</p>
        </div>
      `
    });

    return NextResponse.json({ success: true, message: 'Welcome email sent' }, { status: 200 });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: 'Email failed to send', details: error.message }, { status: 500 });
  }
}
