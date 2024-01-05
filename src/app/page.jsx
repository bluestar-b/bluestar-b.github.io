import Tabs from "@/components/Tabs"
import Badge from "@/components/Badge"
import Weather from "@/components/Weather"
import Profile from "@/components/Profile"
import Image from "next/image"
export default function Home() {
  return (
    <>
      <main className="flex h-screen flex-col justify-center p-12 md:flex-row md:p-20">
        <div className="space-y-6">
          <div className="flex h-fit items-center space-x-4">
            <Profile />
          </div>
          <div className="">
            <Badge Hoverable>They/Them</Badge>
            <Badge Hoverable>Pullstack dev</Badge>
            <Badge Hoverable>
              <Weather />
            </Badge>
          </div>
          <Tabs />
        </div>
      </main>
    </>
  )
}
