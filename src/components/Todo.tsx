import { formatTimeAgo } from "@/lib/time"

interface TodoCardProps {
  title: string
  date: string
}

const TodoCard = ({ title, date }: TodoCardProps) => {
  return (
    <div>
      <span>
        {title} {formatTimeAgo(date)}
      </span>
    </div>
  )
}

export default TodoCard
