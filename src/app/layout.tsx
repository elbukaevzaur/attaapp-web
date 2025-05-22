import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import StoreProvider from "@/app/StoreProvider";

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
        <html lang="en">
            <body>
                <StoreProvider>
                    {children}
                </StoreProvider>
            </body>
        </html>
    )
}
