import { Post } from "contentlayer/generated"
import Link from "next/link"

export function PostListLn(post: Post) {
  return (
    <div className="mb-8">
      <h2 className="mb-1 text-md hover:underline">
        <Link href={post.url}>{post.title}</Link>
      </h2>
    </div>
  )
}
