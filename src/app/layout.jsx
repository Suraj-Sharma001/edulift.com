import Navbar from './components/Navbar.jsx'
import '@/app/globals.css'
import { Sora, Plus_Jakarta_Sans } from 'next/font/google'

const displayFont = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['600', '700', '800']
})

const bodyFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700']
})

export const metadata = {
  title: "Student Aid Platform",
  description: "Empowering students to access education",
}

export default async function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="description" content="Empowering students to access education through scholarships, internships, and community support" />
        <meta name="keywords" content="education, scholarships, internships, student aid, learning" />
        <meta name="author" content="EduLift" />
      </head>
      <body className={`${displayFont.variable} ${bodyFont.variable} app-shell text-[var(--foreground)]`}>
          <Navbar />
          {children}
      </body>
    </html>
  )
}
