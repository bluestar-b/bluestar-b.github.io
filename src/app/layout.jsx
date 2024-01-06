import { Inter } from "next/font/google"
import "./styles/globals.css"

const inter = Inter({ subsets: ["greek"], weight: "500" })

export const metadata = {
  title: "bluestar",
  metadataBase: new URL("https://mac.notmycode.dev/"),
  openGraph: {
    title: "bluestar",
    description: "It works on my machine",
    siteName: "bluestar",
    locale: "en_US",
    type: "website",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
