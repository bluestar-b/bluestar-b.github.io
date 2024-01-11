import Link from "next/link"
export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <p className="text-md font-bold md:text-2xl">
        Oops! The page you&apos;re looking for is lost in space.
      </p>
      <Link
        href="/"
        className="text-md p-2 font-bold underline-offset-2 hover:underline"
      >
        Back to launch pad
      </Link>
    </div>
  )
}
