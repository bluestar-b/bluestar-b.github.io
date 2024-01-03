import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light")
    } else if (theme === "light") {
      setTheme("system")
    } else {
      setTheme("dark")
    }
  }

  const getThemeCharacter = () => {
    if (theme === "dark") {
      return "Dark"
    } else if (theme === "light") {
      return "White"
    } else {
      return "System"
    }
  }

  return (
    <button
      className="fixed top-2 right-2 rounded-lg md:text-lg font-bold border p-2 items-center h-fit focus:outline-none"
      onClick={toggleTheme}
    >
      <span className=" dark:text-white">{getThemeCharacter()}</span>
    </button>
  )
}

export default ThemeSwitch
