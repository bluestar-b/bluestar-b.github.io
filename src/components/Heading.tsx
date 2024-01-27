import {
  GithubLogo,
  InstagramLogo,
  TwitterLogo,
} from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"

const Heading = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between items-center mb-4">
      <div className="text-3xl md:text-4xl font-bold mb-2 md:mb-0 text-center md:text-left">
        bluestar
      </div>
      <div className="flex space-x-4">
        <Link href="https://github.com" aria-label="Github">
          <GithubLogo
            size={28}
            weight="bold"
            className="text-black dark:text-white"
          />
        </Link>
        <Link href="https://instagram.com/" aria-label="Instagram">
          <InstagramLogo
            size={28}
            weight="bold"
            className="text-black dark:text-white"
          />
        </Link>
        <Link href="https://x.com/" aria-label="Twitter/X">
          <TwitterLogo
            size={28}
            weight="bold"
            className="text-black dark:text-white"
          />
        </Link>
      </div>
    </div>
  )
}

export default Heading
