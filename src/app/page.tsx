import Heading from "@/components/Heading"
import FavoriteMusicList from "@/components/FavoriteMusicList"
import Link from "next/link"
import { compareDesc } from "date-fns"
import { allPosts, Post } from "contentlayer/generated"
import { PostListLn } from "@/components/PostListLn"

export default function Home() {
  const posts = allPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 16)

  return (
    <main>
      <div className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
        <Heading />
        <div className="mb-8">
          I joined the world on April 3rd, 2008, and became a space enthusiast,
          studying in a non-formal education because life is crazy to me 🧨. I
          started learning things in 2020 and began applying them in 2021.
          <div className="mb-4 mt-1">
            <div className="text-base font-light italic leading-relaxed text-gray-600 dark:text-gray-200">
              &quot;Life is boring, but life still has colors to explore. Find a
              new color or make that color yourself.&quot;
            </div>
            - 2023
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Favorite song</h2>
          <FavoriteMusicList />
        </div>
        <div className="mt-1 min-w-full overflow-hidden overflow-ellipsis">
          <h2 className="text-2xl font-semibold mb-2">Blog posts</h2>

          <div>
            {posts.map((post, idx) => (
              <PostListLn key={idx} {...post} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
