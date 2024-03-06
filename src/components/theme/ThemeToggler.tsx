"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { TbMoon, TbSun } from "react-icons/tb"
import { Button } from "@radix-ui/themes"

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
        {theme === "light" ? <TbMoon /> : <TbSun />}
      </button>
    </div>
  )
}

export default ThemeToggler
