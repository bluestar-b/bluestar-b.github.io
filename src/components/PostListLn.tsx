import { Post } from "contentlayer/generated"
import Link from "next/link"

export function PostListLn(post: Post) {
  return (
    <div className="mb-1 text-md">
      <Link aria-label={post.title} href={post.url}>
        {post.title}
      </Link>
    </div>
  )
}
