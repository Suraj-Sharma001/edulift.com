import Navbar from './components/Navbar.jsx'
import '@/app/globals.css'

export const MetaData = {
  title: "Student Aid Platform",
  description: "Empowering students to access education",
}

export default async function Layout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-r from-[#232946] to-[#121629] text-[#fffffe]">
          <Navbar />
          {children}
      </body>
    </html>
  )
}
