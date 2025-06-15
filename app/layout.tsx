import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react" // Import Vercel Analytics
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  // Your existing metadata for the layout can go here
  // This is often more general than page-specific metadata
  title: "Vibetunnel",
  description: "Your Mac Terminal in Any Browser.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense>{children}</Suspense>
        <Analytics /> {/* Add the Analytics component here */}
      </body>
    </html>
  )
}
