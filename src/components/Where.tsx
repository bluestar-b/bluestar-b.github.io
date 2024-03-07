import { PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr"
import { Redis } from "@upstash/redis"
import Link from "next/link"

export const revalidate = 0
const redis = Redis.fromEnv()

export default async function Where() {
  const location = await redis.get<string>("location")
  return (
    <div className="flex text-xs font-medium items-center">
      <Link href={`https://google.com/maps/search/${location}`}>
        <PaperPlaneTilt weight="bold" size={12} className="inline-block mr-1" />{" "}
        {location}
      </Link>
    </div>
  )
}
