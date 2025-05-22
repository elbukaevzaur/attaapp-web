import type React from "react"
import { Inter } from "next/font/google"
import Sidebar from "@/components/sidebar/sidebar"
import Header from "@/components/header/header"
import MobileNavigation from "@/components/mobile-navigation/mobile-navigation"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Header />
          <div className="content-wrapper">{children}</div>
        </main>
        <MobileNavigation />
      </div>
  )
}
