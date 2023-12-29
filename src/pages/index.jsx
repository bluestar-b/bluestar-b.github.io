import Image from "next/image"
import Head from "next/head"
import { Inter } from "next/font/google"
import Tabs from "@/components/Tabs"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <>
      <Head>
        <title>bluestar</title>
        <meta
          name="description"
          content="I struggle with myself, but it always ends with me, and things aren't getting better."
        />
        <meta property="og:image" content="/20231206_173942.jpg" />
      </Head>
      <main className="min-h-screen bg-black/25 flex flex-col items-start justify-center p-12 md:p-16">
        <div className="space-y-6">
          <div className="h-32 w-32 md:h-48 md:w-48 ">
            P.S. I WILL PUT IT BACK LATER
           {/* <Image
              className="rounded-full"
              width={256}
              height={256}
              src="/pfp.webp"
              alt="Profile picture"
            />
  */}
          </div>
          <div className="space-y-2">
            <h1 className="font-bold text-4xl inline-block">bluestar</h1>
            <h1 className="font-semibold text-lg">gayware developer</h1>
          </div>
          <Tabs />
        </div>
      </main>
    </>
  )
}
