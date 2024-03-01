import { formatTimeAgo } from "@/lib/time"

interface TodoProps {
  title: string
  date: string
}

const Todo = ({ title, date }: TodoProps) => {
  return (
    <div>
      <span className="text-md">
        {title} - {formatTimeAgo(date)}
      </span>
    </div>
  )
}

export default Todo
