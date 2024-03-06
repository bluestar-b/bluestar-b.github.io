"use client"
import { useState } from "react"
import Todo from "./Todo"

const TodoList = () => {
  const [visibleLabels, setVisibleLabels] = useState(5) // Initial number of labels to display

  const todos = [
    { title: "Teacher's Day activity", date: "2023/06/25 00:00:00" },
    {
      title: "International Day Against Drug Abuse",
      date: "2023/06/26 00:00:00",
    },
    {
      title: "Scout Promise Review Ceremony",
      date: "2023/07/01 00:00:00",
    },
    { title: "Study trip to Phetchaburi", date: "2023/07/22 00:00:00" },
    {
      title: "Candlelight procession, Wat Dong Noi, Lopburi",
      date: "2023/07/27 00:00:00",
    },
    { title: "Scout camp", date: "2023/08/16 00:00:00" },
    { title: "Scout camp(end)", date: "2023/08/18 00:00:00" },
    {
      title: "Field trip to Bang Saen And Marine Science Museum",
      date: "2023/08/26 00:00:00",
    },
    { title: "Last activity (of the semester)", date: "2023/09/09 00:00:00" },
    { title: "Exams #1/2023", date: "2023/09/16 00:00:00" },
    { title: "Exams #2/2023", date: "2023/09/17 00:00:00" },
    { title: "Semester break starts", date: "2023/09/18 00:00:00" },
    { title: "Semester starts", date: "2023/11/05 00:00:00" },
    {
      title: "Teacher's Day and I got something!!",
      date: "2024/01/15 00:00:00",
    },
    { title: "Academic camp", date: "2024/01/20 00:00:00" },
    { title: "Field trip to Ayutthaya", date: "2024/02/20 00:00:00" },
    { title: "Trip from Lopburi to Chonburi.", date: "2024/02/29 06:00:00" },
    { title: "Exams #1/2024", date: "2024/03/02 06:00:00" },
    { title: "Exams #2/2024", date: "2024/03/03 06:00:00" },
  ].reverse()

  const loadMore = () => {
    setVisibleLabels((prev) => prev + 5)
  }

  
  return (
    <div>
      {todos.slice(0, visibleLabels).map((todo, index) => (
        <Todo key={index} title={todo.title} date={todo.date} />
      ))}
      {visibleLabels < todos.length && (
        <button className="text-blue-500" onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  )
}

export default TodoList
