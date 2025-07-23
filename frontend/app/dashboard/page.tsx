import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { BookOpen, FileText, Search, MessageCircle, Target, Award, Clock, TrendingUp, Bell } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const skillProgress = [
    { skill: "Digital Marketing", progress: 75, level: "Intermediate" },
    { skill: "Basic Computer", progress: 90, level: "Advanced" },
    { skill: "English Communication", progress: 60, level: "Beginner" },
    { skill: "Customer Service", progress: 45, level: "Beginner" },
  ]

  const jobAlerts = [
    {
      title: "Digital Marketing Assistant",
      company: "Tech Solutions Pvt. Ltd.",
      location: "Kathmandu",
      posted: "2 hours ago",
      match: "85%",
    },
    {
      title: "Customer Service Representative",
      company: "Call Center Nepal",
      location: "Lalitpur",
      posted: "5 hours ago",
      match: "78%",
    },
    {
      title: "Data Entry Operator",
      company: "Business Hub",
      location: "Bhaktapur",
      posted: "1 day ago",
      match: "72%",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Rajesh! 👋</h1>
          <p className="text-muted-foreground">Ready to take the next step in your career journey?</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Career Recommendation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Recommended Career Path
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">Digital Marketing Specialist</h3>
                    <p className="text-muted-foreground mb-4">
                      Based on your interests in technology and business, this career offers great opportunities in
                      Nepal's growing digital economy.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        6-12 months
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        Rs. 25,000 - 45,000/month
                      </span>
                    </div>
                    <Link href="/career-roadmap">
                      <Button>View Career Roadmap</Button>
                    </Link>
                  </div>
                  <Badge variant="secondary" className="ml-4">
                    92% Match
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Skill Progress Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Your Skill Progress
                </CardTitle>
                <CardDescription>Track your learning journey and skill development</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillProgress.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{item.skill}</span>
                        <Badge variant="outline">{item.level}</Badge>
                      </div>
                      <Progress value={item.progress} className="h-2" />
                      <p className="text-sm text-muted-foreground">{item.progress}% Complete</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/resume-builder">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <FileText className="h-4 w-4 mr-2" />
                    Resume Builder
                  </Button>
                </Link>
                <Link href="/job-search">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Search className="h-4 w-4 mr-2" />
                    Job Search
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Start Course
                  </Button>
                </Link>
                <Link href="/ai-mentor">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Ask AI Mentor
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Job Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Job Alerts
                </CardTitle>
                <CardDescription>New opportunities matching your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobAlerts.map((job, index) => (
                    <div key={index} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm">{job.title}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {job.match}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                      <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                        <span>{job.location}</span>
                        <span>{job.posted}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/job-search">
                  <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                    View All Jobs
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
