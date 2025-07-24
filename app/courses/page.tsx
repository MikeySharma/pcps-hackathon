"use client"

import React, { useState, useEffect } from "react"
import axios from "@/lib/axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Bookmark, BookmarkCheck, ImageOff } from "lucide-react"
import useDebounce from "@/lib/useDebounce"
import { motion } from 'framer-motion';

interface Course {
  id: string
  title: string
  description: string
  imageUrl: string
  url: string
  provider: string
  isFree: boolean
  isBookmarked: boolean
  categories: string[]
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query, 500)
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedFree, setSelectedFree] = useState<"all" | "free" | "paid">("all")
  const [loading, setLoading] = useState(false)

  const fetchCourses = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (debouncedQuery) params.append("query", debouncedQuery)
      if (selectedCategory) params.append("query", selectedCategory)

      const url = debouncedQuery || selectedCategory !== "all"
        ? `api/courses/search?${params.toString()}`
        : `api/courses/featured`
      console.log(url)
      const res = await axios.get(url)
      setCourses(res.data.data)
    } catch (err) {
      console.error("Failed to load courses", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCourses() }, [debouncedQuery, selectedCategory])

  const toggleBookmark = (id: string) => {
    setCourses(c => c.map(x => x.id === id ? { ...x, isBookmarked: !x.isBookmarked } : x))
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Courses Search</h1>
        <p className="text-gray-600">Find your desired courses accross different platforms.</p>
      </motion.div>
      <div className="flex flex-wrap gap-2 mb-6">
        <Input
          placeholder="Search courses..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="flex-1 min-w-[200px]"
        />

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem >All</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedFree} onValueChange={setSelectedFree}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Free/Paid" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : courses.length === 0 ? (
        <p className="text-gray-500">No courses found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(selectedFree === "free" || selectedFree === "all") && courses.map(course => (
            course.isFree && <div key={course.id} className="border rounded-xl p-4 bg-white shadow-md hover:shadow-lg transition">
              <div className="flex justify-between items-start relative">
                <img src={course.imageUrl} alt={course.title} className="w-full h-64 object-contain rounded-md" />
                <button className="absolute top-2 right-2" onClick={() => toggleBookmark(course.id)}>
                  {course.isBookmarked ? (
                    <BookmarkCheck className="text-blue-600" />
                  ) : (
                    <Bookmark className="text-gray-400" />
                  )}
                </button>
              </div>
              <h3 className="font-semibold text-lg mt-2">{course.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-3">{course.description}</p>

              <div className="mt-2 flex items-center justify-between">
                <a
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Go to Course →
                </a>
                <span className={`px-2 py-1 text-xs font-semibold rounded-sm ${course.isFree ? "bg-green-400" : "bg-red-400"}`}> {course.isFree ? "Free" : "Paid"} </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Provider: {course.provider}
              </p>
            </div>
          ))}
          {(selectedFree === "paid" || selectedFree === "all") && courses.map(course => (
            !course.isFree && <div key={course.id} className="border rounded-xl p-4 bg-white shadow-md hover:shadow-lg transition">
              <div className="flex justify-between items-start relative">
                {course.imageUrl && <img src={course.imageUrl} alt={course.title} className="w-full h-64 object-contain rounded-md" />}
                {!course.imageUrl && <ImageOff height={200} width={200} className="w-full h-64 object-contain rounded-md" strokeWidth={1} />}
                <button className="absolute top-2 right-2" onClick={() => toggleBookmark(course.id)}>
                  {course.isBookmarked ? (
                    <BookmarkCheck className="text-blue-600" />
                  ) : (
                    <Bookmark className="text-gray-400" />
                  )}
                </button>
              </div>
              <h3 className="font-semibold text-lg mt-2">{course.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-3">{course.description}</p>

              <div className="mt-2 flex items-center justify-between">
                <a
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Go to Course →
                </a>
                <span className={`px-2 py-1 text-xs font-semibold rounded-sm ${course.isFree ? "bg-green-400" : "bg-red-400"}`}> {course.isFree ? "Free" : "Paid"} </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Provider: {course.provider}
              </p>
            </div>
          ))}

        </div>
      )}
    </div>
  )
}
