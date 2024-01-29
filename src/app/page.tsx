import Heading from "@/components/Heading"
import { ExternalLink } from "@/components/ExternalLink"

export default function Home() {
  return (
    <main>
      <div className="max-w-md md:max-w-2xl mx-auto py-12 px-6">
        <Heading />
        <div className="mb-8">
          I joined the world on April 3rd, 2008, and became a space enthusiast,
          studying in a non-formal setting because life is crazy to me 🧨. I
          started learning things in 2020 and began applying them in 2021, and
          I'm still soaring through the zero gravity of life. How about you?
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
