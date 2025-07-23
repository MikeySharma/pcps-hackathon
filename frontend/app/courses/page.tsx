"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation } from "@/components/navigation"
import { BookOpen, Clock, Users, Award, Play, Search, Star } from "lucide-react"

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [levelFilter, setLevelFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const courses = [
    {
      id: 1,
      title: "Digital Marketing Fundamentals",
      description:
        "Learn the basics of digital marketing including social media, email marketing, and online advertising.",
      duration: "4 weeks",
      level: "beginner",
      category: "marketing",
      students: 1250,
      rating: 4.8,
      progress: 65,
      status: "in-progress",
      instructor: "Priya Sharma",
      price: "Free",
      certificate: true,
    },
    {
      id: 2,
      title: "Basic Computer Skills",
      description: "Essential computer skills for the modern workplace including MS Office, internet usage, and email.",
      duration: "3 weeks",
      level: "beginner",
      category: "technology",
      students: 2100,
      rating: 4.9,
      progress: 100,
      status: "completed",
      instructor: "Rajesh Thapa",
      price: "Free",
      certificate: true,
    },
    {
      id: 3,
      title: "English Communication for Work",
      description: "Improve your English speaking and writing skills for professional environments.",
      duration: "6 weeks",
      level: "intermediate",
      category: "language",
      students: 890,
      rating: 4.7,
      progress: 0,
      status: "not-started",
      instructor: "Sarah Johnson",
      price: "Rs. 2,000",
      certificate: true,
    },
    {
      id: 4,
      title: "Customer Service Excellence",
      description: "Master the art of customer service and build strong customer relationships.",
      duration: "2 weeks",
      level: "beginner",
      category: "business",
      students: 650,
      rating: 4.6,
      progress: 30,
      status: "in-progress",
      instructor: "Amit Gurung",
      price: "Free",
      certificate: true,
    },
    {
      id: 5,
      title: "Social Media Marketing",
      description: "Advanced strategies for marketing on Facebook, Instagram, and other social platforms.",
      duration: "5 weeks",
      level: "intermediate",
      category: "marketing",
      students: 420,
      rating: 4.8,
      progress: 0,
      status: "not-started",
      instructor: "Sita Rai",
      price: "Rs. 3,500",
      certificate: true,
    },
    {
      id: 6,
      title: "Basic Accounting & Finance",
      description: "Learn fundamental accounting principles and financial management for small businesses.",
      duration: "4 weeks",
      level: "beginner",
      category: "finance",
      students: 780,
      rating: 4.5,
      progress: 0,
      status: "not-started",
      instructor: "Krishna Shrestha",
      price: "Rs. 2,500",
      certificate: true,
    },
  ]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = levelFilter === "all" || course.level === levelFilter
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter

    return matchesSearch && matchesLevel && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getButtonText = (status: string) => {
    switch (status) {
      case "completed":
        return "Review Course"
      case "in-progress":
        return "Continue"
      default:
        return "Start Course"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Micro-Courses</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Short, practical courses designed to help you build job-ready skills quickly. Perfect for busy schedules and
            immediate career impact.
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="language">Language</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="capitalize">
                    {course.level}
                  </Badge>
                  <Badge className={getStatusColor(course.status)}>
                    {course.status === "in-progress"
                      ? "In Progress"
                      : course.status === "completed"
                        ? "Completed"
                        : "New"}
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                <CardDescription className="text-sm">{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Course Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {course.students.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {course.rating}
                    </span>
                  </div>

                  {/* Progress Bar (if in progress or completed) */}
                  {course.status !== "not-started" && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}

                  {/* Instructor and Price */}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">By {course.instructor}</span>
                    <span className="font-semibold text-primary">{course.price}</span>
                  </div>

                  {/* Certificate Badge */}
                  {course.certificate && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Award className="h-4 w-4" />
                      <span>Certificate included</span>
                    </div>
                  )}

                  {/* Action Button */}
                  <Button className="w-full" variant={course.status === "completed" ? "outline" : "default"}>
                    <Play className="h-4 w-4 mr-2" />
                    {getButtonText(course.status)}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or filters to find more courses.</p>
            </CardContent>
          </Card>
        )}

        {/* Call to Action */}
        <Card className="mt-12 text-center">
          <CardContent className="pt-6">
            <h3 className="text-xl font-bold mb-2">Can't find what you're looking for?</h3>
            <p className="text-muted-foreground mb-4">
              Our AI mentor can help you find the perfect course for your career goals.
            </p>
            <Button size="lg" variant="outline">
              Ask AI Mentor for Recommendations
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
