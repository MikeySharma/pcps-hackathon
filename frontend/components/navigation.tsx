"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

export const Navigation = () => {
  return (
    <header className="bg-background py-4 border-b">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          KaamSathi
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/courses">
            <Button variant="ghost">Courses</Button>
          </Link>
          <Link href="/job-search">
            <Button variant="ghost">Job Search</Button>
          </Link>
          <Link href="/ai-mentor">
            <Button variant="ghost">AI Mentor</Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
