import { Inter } from "next/font/google"
import "./styles/globals.css"

const inter = Inter({ subsets: ["greek"], weight: "500" })

export const metadata = {
  title: "bluestar",
  metadataBase: new URL("https://mac.notmycode.dev/"),
  openGraph: {
    title: "bluestar",
    description: "Life is boring, but life still has colors to explore.",
    siteName: "bluestar",
    images: [
      {
        url: "./20231206_173942.jpg",
        width: 1800,
        height: 1600,
      },
    ],
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
