import { PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr"
import { Redis } from "@upstash/redis"

export const revalidate = 0
const redis = Redis.fromEnv()

export default async function Where() {
  const location = await redis.get<string>("location")
  return (
    <div className="flex text-sm font-medium items-center">
      <PaperPlaneTilt weight="bold" size={12} className="inline-block mr-1" />{" "}
      {location}
    </div>
  )
}
