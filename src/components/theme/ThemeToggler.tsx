"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { MoonStars, Sun } from "@phosphor-icons/react"

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
      <button className="w-7 h-7 text-md" onClick={toggleTheme}>
        {theme === "light" ? <MoonStars size={20} /> : <Sun size={20} />}
      </button>
    </div>
  )
}

export default ThemeToggler
