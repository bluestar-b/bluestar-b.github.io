import { formatDistanceToNowStrict, parse } from "date-fns"

export function formatTimeAgo(date: Date | string): string {
  const parsedDate =
    typeof date === "string"
      ? parse(date, "yyyy/MM/dd HH:mm:ss", new Date())
      : date
  const formattedDistance = formatDistanceToNowStrict(parsedDate, {
    addSuffix: true,
  })

  if (parsedDate > new Date()) {
    return `${formattedDistance}`
  } else {
    return formattedDistance.replace("ago", "ago")
  }
}
