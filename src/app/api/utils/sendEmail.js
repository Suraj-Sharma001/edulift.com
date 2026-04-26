import nodemailer from "nodemailer";

let resend = null;

// Lazy load Resend to avoid initialization errors
const getResendClient = () => {
  if (!resend && process.env.RESEND_API_KEY) {
    try {
      const { Resend } = require("resend");
      resend = new Resend(process.env.RESEND_API_KEY);
    } catch (err) {
      console.warn("Failed to initialize Resend:", err.message);
      return null;
    }
  }
  return resend;
};

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    // Try Resend first if API key is available
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resendClient = new Resend(process.env.RESEND_API_KEY);
        const response = await resendClient.emails.send({
          from: process.env.RESEND_FROM || "EduLift <noreply@resend.dev>",
          to,
          subject,
          html: html || `<p>${text}</p>`
        });
        console.log("Email sent via Resend:", response.id);
        return response;
      } catch (resendError) {
        console.warn("Resend failed, falling back to Nodemailer:", resendError.message);
        // Continue to Nodemailer fallback
      }
    }

    // Fallback to Nodemailer
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
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
      return { success: true, method: "nodemailer" };
    }

    // If no email service is configured, just log and continue
    console.warn("No email service configured, skipping email notification");
    return { success: false, message: "Email service not configured" };
  } catch (error) {
    console.error("Error sending email:", error.message);
    // Don't throw - email should not block registration/login
    return { success: false, error: error.message };
  }
};
