import Navbar from './components/Navbar.jsx'
import '@/app/globals.css'

export const MetaData = {
  title: "Student Aid Platform",
  description: "Empowering students to access education",
}

export default async function Layout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
          <Navbar />
          {children}
      </body>
    </html>
  )
}
