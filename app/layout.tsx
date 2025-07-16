import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EHR System',
  description: 'EHR form interface for managing patient visits, orders, and clinical notes.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
