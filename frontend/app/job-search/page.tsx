"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Search, MapPin, Clock, DollarSign, ExternalLink, Building, Star, Filter } from "lucide-react"

export default function JobSearchPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const suggestedTags = [
    "Electrician Kathmandu",
    "Foreign Jobs",
    "+2 Jobs",
    "Data Entry",
    "Customer Service",
    "Sales Assistant",
    "Security Guard",
    "Driver Jobs",
    "Hotel Jobs",
    "Teaching Jobs",
  ]

  const jobPlatforms = [
    {
      name: "LinkedIn",
      logo: "/placeholder.svg?height=40&width=40",
      description: "Professional networking and job search",
      url: "#",
    },
    {
      name: "MeroJob",
      logo: "/placeholder.svg?height=40&width=40",
      description: "Nepal's leading job portal",
      url: "#",
    },
    {
      name: "JobsNepal",
      logo: "/placeholder.svg?height=40&width=40",
      description: "Find jobs across Nepal",
      url: "#",
    },
    {
      name: "Kumarijob",
      logo: "/placeholder.svg?height=40&width=40",
      description: "Career opportunities in Nepal",
      url: "#",
    },
    {
      name: "JobAxle",
      logo: "/placeholder.svg?height=40&width=40",
      description: "Connect with employers",
      url: "#",
    },
    {
      name: "Ramrojob",
      logo: "/placeholder.svg?height=40&width=40",
      description: "Good jobs for everyone",
      url: "#",
    },
  ]

  const jobResults = [
    {
      id: 1,
      title: "Digital Marketing Assistant",
      company: "Tech Solutions Pvt. Ltd.",
      location: "Kathmandu, Nepal",
      salary: "Rs. 25,000 - 35,000",
      type: "Full-time",
      posted: "2 days ago",
      description:
        "We are looking for a motivated Digital Marketing Assistant to join our growing team. Experience with social media marketing and basic computer skills required.",
      requirements: ["Basic computer skills", "Social media knowledge", "Good communication"],
      match: 92,
    },
    {
      id: 2,
      title: "Customer Service Representative",
      company: "Call Center Nepal",
      location: "Lalitpur, Nepal",
      salary: "Rs. 20,000 - 28,000",
      type: "Full-time",
      posted: "1 day ago",
      description:
        "Handle customer inquiries via phone and email. Training provided. Good English communication skills required.",
      requirements: ["English communication", "Computer basics", "Customer service attitude"],
      match: 85,
    },
    {
      id: 3,
      title: "Data Entry Operator",
      company: "Business Hub Pvt. Ltd.",
      location: "Bhaktapur, Nepal",
      salary: "Rs. 18,000 - 25,000",
      type: "Full-time",
      posted: "3 days ago",
      description:
        "Accurate data entry and basic administrative tasks. Must have good typing speed and attention to detail.",
      requirements: ["Typing skills", "MS Office", "Attention to detail"],
      match: 78,
    },
    {
      id: 4,
      title: "Sales Assistant",
      company: "Retail Store Chain",
      location: "Pokhara, Nepal",
      salary: "Rs. 15,000 - 22,000",
      type: "Full-time",
      posted: "4 days ago",
      description:
        "Assist customers, handle transactions, and maintain store appearance. Previous retail experience preferred.",
      requirements: ["Customer service", "Basic math", "Friendly personality"],
      match: 72,
    },
    {
      id: 5,
      title: "Teaching Assistant",
      company: "ABC School",
      location: "Chitwan, Nepal",
      salary: "Rs. 20,000 - 30,000",
      type: "Full-time",
      posted: "5 days ago",
      description:
        "Support teachers in classroom activities and student supervision. +2 completed candidates preferred.",
      requirements: ["+2 completed", "Good communication", "Patience with children"],
      match: 68,
    },
  ]

  const getMatchColor = (match: number) => {
    if (match >= 90) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    if (match >= 80) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    if (match >= 70) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Smart Job Search</h1>
          <p className="text-muted-foreground">
            Find the perfect job opportunities across Nepal with AI-powered matching
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search job here... (e.g., Digital Marketing, Customer Service)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Button size="lg" className="px-8">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>

            {/* Suggested Tags */}
            <div>
              <p className="text-sm font-medium mb-3">Popular Searches:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => setSearchQuery(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Results */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Job Results</h2>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            <div className="space-y-4">
              {jobResults.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{job.title}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <Building className="h-4 w-4" />
                            {job.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {job.posted}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1 text-green-600">
                            <DollarSign className="h-4 w-4" />
                            {job.salary}
                          </span>
                          <Badge variant="outline">{job.type}</Badge>
                        </div>
                      </div>
                      <Badge className={getMatchColor(job.match)}>{job.match}% Match</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{job.description}</p>

                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Requirements:</p>
                      <div className="flex flex-wrap gap-1">
                        {job.requirements.map((req, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1">Apply Now</Button>
                      <Button variant="outline">Save Job</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Jobs
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Platforms */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5" />
                  Job Platforms
                </CardTitle>
                <CardDescription>Search on popular job sites</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {jobPlatforms.map((platform, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <img src={platform.logo || "/placeholder.svg"} alt={platform.name} className="w-8 h-8 rounded" />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{platform.name}</h4>
                        <p className="text-xs text-muted-foreground">{platform.description}</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Job Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Job Search Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <p>Update your resume regularly with new skills and experiences</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <p>Apply to jobs within 24-48 hours of posting for better chances</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <p>Customize your application for each job position</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <p>Follow up with employers after applying</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Mentor CTA */}
            <Card>
              <CardContent className="pt-6 text-center">
                <h3 className="font-semibold mb-2">Need Help with Job Search?</h3>
                <p className="text-sm text-muted-foreground mb-4">Get personalized advice from our AI mentor</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Ask AI Mentor
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
