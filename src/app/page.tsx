
import Heading from "@/components/Heading";
import Link from "next/link"
import { ReactNode } from "react"

export default function Home() {
  return (
    <main>
      <div className="max-w-md md:max-w-2xl mx-auto py-12 px-6">
        <Heading />
        <div className="mb-8">
          Hello, I&apos;m Mac (aka bluestar),
          <br />A 15 y/o(April 3rd, 2008) space enthusiast and a non-formal
          student 🚀. Back in 2020, since I discovered what programming is and
          started learning more about it, I incredibly understood it faster. I
          focused on it too much, and this way, I&apos;ve been speedrunning the
          process of learning
          <ExternalLink href="https://python.org/">Python</ExternalLink>
          and
          <ExternalLink href="#">JavaScript</ExternalLink>for a year now.
          <ExternalLink href="https://go.dev/">Golang</ExternalLink>
          has been my best friend for a moment. I enjoy network programming,
          cycling stuff.
          <div className="mb-4 mt-1">
            <div className="text-base font-light italic leading-relaxed text-pink-600 dark:text-pink-300">
              &quot;Life is boring, but life still has colors to explore. Find a
              new color or make that color yourself.&quot;
            </div>
            - 2023
          </div>
        </div>
      </div>
    </main>
  )
}

interface ExternalLinkProps {
  children: ReactNode
  href: string
}

const ExternalLink = ({ children, href }: ExternalLinkProps) => {
  return (
    <Link href={href || ""} as={href || ""}>
      <p className="ml-1 mr-1 inline-flex items-center rounded p-1 underline leading-4 text-black dark:text-white">
        {children}
      </p>
    </Link>
  )
}
