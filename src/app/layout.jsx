"use client";

import Navbar from './components/Navbar.jsx'
import '@/app/globals.css'
import { SessionProvider } from 'next-auth/react'

export const MataData = {
  title: "Student Aid Platform",
  description: "Empowering students to access education",
}

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
