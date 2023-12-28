import Image from "next/image"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-black/5 flex flex-col items-start justify-center p-12 md:p-16">
        <div className="space-y-6">
          <div className="h-32 w-32 md:h-48 md:w-48 ">
            <Image
              className="rounded-full"
              width={256}
              height={256}
              src="/pfp.webp"
            />
          </div>
          <div className="space-y-2">
            <h1 className="font-bold text-4xl inline-block">bluestar</h1>
            <h1 className="font-semibold text-lg">gayware developer</h1>
          </div>
          <div className="space-x-4 text-md max-w-md md:max-w-lg overflow-hidden overflow-ellipsis">
            Hello, I'm Mac (bluestar), a 16 y/o space enthusiast 🚀. I've been
            speedrunning the process of learning Python and JavaScript for a
            year now. Golang has been my best friend for a moment. I enjoy
            network programming, cycling stuff.
          </div>
        </div>
      </main>
    </>
  )
}
