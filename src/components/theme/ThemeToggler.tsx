"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

const ThemeToggler = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  return (
    <div>
      <button onClick={toggleTheme}>{theme === "light" ? "🌙" : "☀️"}</button>
    </div>
  )
}

export default ThemeToggler
