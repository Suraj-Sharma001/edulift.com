import Navbar from './components/Navbar.jsx'
import '@/app/globals.css'

export const MetaData = {
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
        <title>EduLift - Student Aid Platform</title>
      </head>
      <body className="min-h-screen bg-gradient-to-r from-[#232946] to-[#121629] text-[#fffffe]">
          <Navbar />
          {children}
      </body>
    </html>
  )
}
