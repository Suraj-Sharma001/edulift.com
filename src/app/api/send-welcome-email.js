import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      const response = await resend.emails.send({
        from: 'Your App <onboarding@yourdomain.com>',
        to: email,
        subject: '🎉 Welcome to Our App!',
        html: `<h1>Hi there!</h1><p>Thanks for joining us. We’re happy to have you.</p>`
      });

      res.status(200).json({ success: true, response });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Email failed to send' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
