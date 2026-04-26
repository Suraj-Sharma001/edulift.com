import nodemailer from "nodemailer";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    // Try Resend first if API key is available
    if (process.env.RESEND_API_KEY) {
      const response = await resend.emails.send({
        from: process.env.RESEND_FROM || "EduLift <noreply@resend.dev>",
        to,
        subject,
        html: html || `<p>${text}</p>`
      });
      console.log("Email sent via Resend:", response);
      return response;
    }

    // Fallback to Nodemailer for local development
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"EduLift" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html: html || `<p>${text}</p>`
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent via Nodemailer");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
