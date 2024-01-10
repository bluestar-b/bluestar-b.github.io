import Tabs from "@/components/Tabs"
import Badge from "@/components/Badge"
import Weather from "@/components/Weather"
import Profile from "@/components/Profile"

export default function Home() {
  return (
    <>
      <main className="flex h-screen flex-col items-center justify-center p-8 md:flex-row md:p-16">
        <div className="mt-6">
          <Profile />

          <div className="mb-2">
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
