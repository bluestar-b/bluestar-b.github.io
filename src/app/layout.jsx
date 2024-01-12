import { Inter } from "next/font/google"
import "./styles/globals.css"

const font = Inter({ subsets: ["latin"], weight: "400" })

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
      <body className={font.className}>{children}</body>
    </html>
  )
}
