import { ExternalLinkProps } from "@/lib/interfaces"
import Link from "next/link"

export function ExternalLink({ children, href }: ExternalLinkProps) {
  return (
    <Link href={href || ""} as={href || ""}>
      <p className="ml-1 mr-1 inline-flex items-center rounded p-1 underline leading-4 text-black dark:text-white">
        {children}
      </p>
    </Link>
  )
}
