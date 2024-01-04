import Head from "next/head"
import Tabs from "@/components/Tabs"
import Badge from "@/components/Badge"
import Image from "next/image"

export default function Home() {
  return (
    <>
      <Head>
        <title>bluestar</title>
        <meta
          name="description"
          content="Life is boring, but life still has colors to explore."
        />
        <meta property="og:image" content="/20231206_173942.jpg" />
      </Head>
      <main className="flex min-h-screen flex-col items-start justify-center p-12 md:flex-row md:p-16">
        <div className="flex-1 space-y-6">
          <div className="h-32 w-32 md:h-48 md:w-48 ">
            <Image
              className="rounded-full"
              width={200}
              height={200}
              src="/pfp.jpeg"
              alt="Profile picture"
            />
          </div>
          <div className="space-y-2">
            <h1 className="inline-block text-3xl font-bold md:text-4xl">
              bluestar
            </h1>
            <h1 className="text-lg font-semibold">gayware developer</h1>
            <Badge Hoverable>They/Them</Badge>
            <Badge Hoverable>Pullstack dev</Badge>
          </div>
          <Tabs />
        </div>
        {/* for additional content in future */}
      </main>
    </>
  )
}
