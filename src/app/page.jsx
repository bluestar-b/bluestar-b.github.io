import Tabs from "@/components/Tabs"
import Badge from "@/components/Badge"
import Weather from "@/components/Weather"
import Avatar from "@/components/Avatar"
import Profile from "@/components/Profile"

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-start justify-center p-12 md:flex-row md:p-20">
        <div className="flex-1 space-y-6">
          <div className="flex h-fit items-center space-x-4">
            <Avatar />
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
        {/* for additional content in future */}
      </main>
    </>
  )
}
