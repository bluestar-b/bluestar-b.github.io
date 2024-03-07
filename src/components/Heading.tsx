import { GithubLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr"
import ThemeToggler from "./theme/ThemeToggler"
import Link from "next/link"
import Where from "./Where"

const Heading = () => {
  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <div className="text-xl font-bold">bluestar</div>
        <Where />
        {/* 
        <div className="text-sm">I created bugs🤯</div>*/}
      </div>
      <div className="flex items-center">
        <div className="space-x-3">
          <div className="inline-block">
            <Link href="https://github.com/bluestar-b/" aria-label="Github">
              <GithubLogo size={20} />
            </Link>
          </div>
          <div className="inline-block">
            <Link
              href="https://instagram.com/bluestar.pics"
              aria-label="Instagram"
            >
              <InstagramLogo size={20} />
            </Link>
          </div>
          <div className="inline-block">
            <ThemeToggler />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Heading
