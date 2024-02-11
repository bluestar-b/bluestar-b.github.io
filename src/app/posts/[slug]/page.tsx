import { format, parseISO } from "date-fns"
import { allPosts } from "contentlayer/generated"
import { useMDXComponent } from "next-contentlayer/hooks"

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)
  return { title: post.title }
}

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)
  const MDXContent = useMDXComponent(post.body.code)

  return (
    <main className="px-4 py-6 md:py-12 lg:py-16">
      <article className="prose prose-zinc max-w-none mx-auto lg:max-w-6xl dark:prose-invert prose-pre:border prose-pre:bg-zinc-200 prose-pre:text-gray-800 dark:prose-pre:border-gray-700 dark:prose-pre:text-gray-200 dark:prose-pre:bg-zinc-900 rounded-lg">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {post.title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Posted on{" "}
          <time dateTime={post.date}>
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </time>
        </p>
        <MDXContent />
      </article>
    </main>
  )
}

export default PostLayout
