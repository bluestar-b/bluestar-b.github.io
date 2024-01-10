import { getNotes } from "@/actions/db/getNotes"
import { formatDate } from "@/lib/formatDate"
import Link from "next/link"
export default async function Page() {
  const noteList = await getNotes()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="h-fit p-2">
        <p className="mb-2 text-xl font-bold md:text-2xl">My notes</p>
        {noteList.map((note) => (
          <div key={note.createat}>
            <div>
              <span className="line-clamp-2 text-sm md:text-lg">
                <Link
                  className="text-xs hover:underline hover:underline-offset-1 md:text-base"
                  href={`/note/${note.id}`}
                >
                  {note.title} - {formatDate(note.createat)}
                </Link>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
