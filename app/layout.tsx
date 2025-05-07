import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Sidebar from "@/components/sidebar/sidebar"
import Header from "@/components/header/header"
import MobileNavigation from "@/components/mobile-navigation/mobile-navigation"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "ATTAAPP",
  description: "Система управления клиентами и сделками"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <div className="app-container">
          <Sidebar />
          <main className="main-content">
            <Header />
            <div className="content-wrapper">{children}</div>
          </main>
          <MobileNavigation />
        </div>
      </body>
    </html>
  )
}
