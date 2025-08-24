import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET
    })
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user }) {
      try {
        // Use localStorage or DB to track if email is sent; for now always send
        if (process.env.NEXTAUTH_URL) {
          await fetch(`${process.env.NEXTAUTH_URL}/api/send-welcome-email`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: user.email })
          });
        }
      } catch (err) {
        console.error("Failed to send welcome email", err);
      }

      return true;
    }
  }
});

export const { GET, POST } = handlers;
