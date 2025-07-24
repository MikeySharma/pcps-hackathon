"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Clock, Users, Star, Search, Filter } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  level: "Beginner" | "Intermediate" | "Advanced"
  category: string
  price: number
  rating: number
  students: number
  image: string
  tags: string[]
}

const courses: Course[] = [
  {
    id: "digital-literacy",
    title: "Digital Literacy for Modern Workplace",
    description: "Master essential digital skills including computer basics, internet usage, and office software.",
    instructor: "Rajesh Sharma",
    duration: "4 weeks",
    level: "Beginner",
    category: "Technology",
    price: 0,
    rating: 4.8,
    students: 1250,
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Computer Skills", "Office Software", "Internet"],
  },
  {
    id: "interview-skills",
    title: "Interview Skills & Communication",
    description: "Build confidence and master interview techniques for landing your dream job in Nepal.",
    instructor: "Priya Thapa",
    duration: "2 weeks",
    level: "Beginner",
    category: "Career Development",
    price: 1500,
    rating: 4.9,
    students: 890,
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Communication", "Interview Prep", "Confidence"],
  },
  {
    id: "web-development",
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, and React to become a full-stack web developer.",
    instructor: "Amit Gurung",
    duration: "12 weeks",
    level: "Intermediate",
    category: "Technology",
    price: 8000,
    rating: 4.7,
    students: 456,
    image: "/placeholder.svg?height=200&width=300",
    tags: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    id: "business-english",
    title: "Business English for Professionals",
    description: "Improve your English communication skills for professional environments.",
    instructor: "Sarah Johnson",
    duration: "6 weeks",
    level: "Intermediate",
    category: "Language",
    price: 3000,
    rating: 4.6,
    students: 678,
    image: "/placeholder.svg?height=200&width=300",
    tags: ["English", "Communication", "Business"],
  },
  {
    id: "data-analysis",
    title: "Data Analysis with Excel & Python",
    description: "Learn to analyze data using Excel and Python for business insights.",
    instructor: "Dr. Binod Shrestha",
    duration: "8 weeks",
    level: "Advanced",
    category: "Data Science",
    price: 5500,
    rating: 4.8,
    students: 234,
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Excel", "Python", "Data Analysis", "Statistics"],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Mastery",
    description: "Master social media marketing, SEO, and online advertising strategies.",
    instructor: "Sita Rai",
    duration: "10 weeks",
    level: "Intermediate",
    category: "Marketing",
    price: 4500,
    rating: 4.7,
    students: 567,
    image: "/placeholder.svg?height=200&width=300",
    tags: ["SEO", "Social Media", "Advertising", "Analytics"],
  },
]

const categories = ["All", "Technology", "Career Development", "Language", "Data Science", "Marketing"]
const levels = ["All", "Beginner", "Intermediate", "Advanced"]

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All")

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory
    const matchesLevel = selectedLevel === "All" || course.level === selectedLevel

    return matchesSearch && matchesCategory && matchesLevel
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Skill Development Courses</h1>
          <p className="text-gray-600">
            Build in-demand skills with our curated courses designed for the Nepali job market
          </p>
        </motion.div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow group">
                <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge
                      variant={
                        course.level === "Beginner"
                          ? "secondary"
                          : course.level === "Intermediate"
                            ? "default"
                            : "destructive"
                      }
                    >
                      {course.level}
                    </Badge>
                    <div className="text-right">
                      {course.price === 0 ? (
                        <span className="text-lg font-bold text-green-600">Free</span>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">NPR {course.price.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                  <CardDescription className="text-sm">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                    <span className="text-sm text-gray-600">• {course.instructor}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {course.tags.slice(0, 3).map((tag, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {course.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{course.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <Button asChild className="w-full bg-gray-800 hover:bg-gray-700">
                    <Link href={`/courses/${course.id}`}>
                      <BookOpen className="h-4 w-4 mr-2" />
                      {course.price === 0 ? "Enroll Free" : "Enroll Now"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or browse all courses</p>
          </div>
        )}
      </div>
    </div>
  )
}
