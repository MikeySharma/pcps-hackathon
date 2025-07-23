"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"

/**
 * Toggle between light / dark mode.
 * Uses next-themes via the ThemeProvider already configured in layout.tsx.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => setTheme(isDark ? "light" : "dark")}>
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
