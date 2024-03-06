import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "@radix-ui/themes/styles.css"
import { Theme } from "@radix-ui/themes"
import ThemeProvider from "@/components/theme/ThemeProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "bluestar",
  description: "nothing is impossible🚀",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased max-w-2xl mb-40 flex flex-col md:flex-row mx-auto`}
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          <Theme>{children}</Theme>
        </ThemeProvider>
      </body>
    </html>
  )
}
