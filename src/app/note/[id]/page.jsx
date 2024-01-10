import { getNoteById } from "@/actions/db/getNotes"
import { formatDate } from "@/lib/formatDate"
import { truncateString } from "@/lib/truncateString"

export async function generateMetadata({ params }) {
  const note = await getNoteById(params.id)
  return {
    title: note[0].title,
    openGraph: {
      description: truncateString(note[0].note, 80),
    },
  }
}

export default async function Page({ params }) {
  const note = await getNoteById(params.id)
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="line-clamp-3 max-w-lg p-6">
        <div className="text-md mb-2 font-bold md:text-xl">{note[0].title}</div>
        <p className="text-sm md:text-lg">{note[0].note}</p>
      </div>
      <div className="mt-2 text-xs text-gray-500 md:text-sm dark:text-gray-400">
        {formatDate(note[0].createat)}
      </div>
    </div>
  )
}
