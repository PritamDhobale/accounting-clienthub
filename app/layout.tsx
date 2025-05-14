"use client" // ✅ forces client-side check

import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { usePathname } from "next/navigation"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/login" // ✅ correct on client

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {isLoginPage ? (
            <>
              {children}
              <Toaster />
            </>
          ) : (
            <SidebarProvider>
              {children}
              <Toaster />
            </SidebarProvider>
          )}
        </ThemeProvider>
      </body>
    </html>
  )
}
