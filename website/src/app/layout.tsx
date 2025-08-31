import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Volunteer Finder - High School Volunteer Opportunities',
  description: 'Find meaningful volunteer opportunities perfect for high school students. Filter by location, skills, and interests.',
  keywords: 'volunteer, high school, community service, opportunities, students',
  authors: [{ name: 'Volunteer Finder' }],
  openGraph: {
    title: 'Volunteer Finder - High School Volunteer Opportunities',
    description: 'Find meaningful volunteer opportunities perfect for high school students.',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
