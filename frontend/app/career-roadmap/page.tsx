import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Navigation } from "@/components/navigation"
import { CheckCircle, Circle, Clock, DollarSign, BookOpen, Award, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

export default function CareerRoadmapPage() {
  const roadmapSteps = [
    {
      id: 1,
      title: "Foundation Skills",
      description: "Learn basic computer skills and digital literacy",
      duration: "2-4 weeks",
      status: "completed",
      skills: ["Basic Computer", "Internet Usage", "Email Communication"],
    },
    {
      id: 2,
      title: "Marketing Fundamentals",
      description: "Understand marketing principles and consumer behavior",
      duration: "3-4 weeks",
      status: "in-progress",
      skills: ["Marketing Basics", "Consumer Psychology", "Brand Awareness"],
    },
    {
      id: 3,
      title: "Digital Marketing Tools",
      description: "Master essential digital marketing platforms and tools",
      duration: "4-6 weeks",
      status: "upcoming",
      skills: ["Social Media Marketing", "Google Ads", "Analytics", "Content Creation"],
    },
    {
      id: 4,
      title: "Practical Experience",
      description: "Apply skills through real projects and internships",
      duration: "8-12 weeks",
      status: "upcoming",
      skills: ["Campaign Management", "Client Communication", "Project Management"],
    },
    {
      id: 5,
      title: "Specialization",
      description: "Choose your specialization area and become an expert",
      duration: "6-8 weeks",
      status: "upcoming",
      skills: ["SEO/SEM", "Social Media Strategy", "Content Marketing", "E-commerce"],
    },
  ]

  const careerInfo = {
    title: "Digital Marketing Specialist",
    salaryRange: "Rs. 25,000 - 45,000/month",
    totalDuration: "6-12 months",
    demandLevel: "High",
    growthRate: "+15% annually",
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Career Roadmap</h1>
          <p className="text-muted-foreground">Your personalized path to becoming a {careerInfo.title}</p>
        </div>

        {/* Career Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">{careerInfo.title}</CardTitle>
            <CardDescription>A comprehensive roadmap tailored for your success in digital marketing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-sm text-muted-foreground">Expected Salary</p>
                <p className="font-semibold">{careerInfo.salaryRange}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-semibold">{careerInfo.totalDuration}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <p className="text-sm text-muted-foreground">Job Demand</p>
                <p className="font-semibold">{careerInfo.demandLevel}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-orange-600" />
                </div>
                <p className="text-sm text-muted-foreground">Growth Rate</p>
                <p className="font-semibold">{careerInfo.growthRate}</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">25% Complete</span>
              </div>
              <Progress value={25} className="h-2" />
            </div>

            <Link href="/courses">
              <Button size="lg" className="w-full md:w-auto">
                Start Learning Journey
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Roadmap Steps */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Learning Path</h2>

          {roadmapSteps.map((step, index) => (
            <Card
              key={step.id}
              className={`relative ${
                step.status === "completed"
                  ? "border-green-200 bg-green-50/50 dark:bg-green-950/20"
                  : step.status === "in-progress"
                    ? "border-blue-200 bg-blue-50/50 dark:bg-blue-950/20"
                    : "border-muted"
              }`}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {step.status === "completed" ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : step.status === "in-progress" ? (
                      <div className="h-6 w-6 rounded-full border-2 border-blue-600 bg-blue-600/20 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-blue-600" />
                      </div>
                    ) : (
                      <Circle className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">
                        Step {step.id}: {step.title}
                      </CardTitle>
                      <Badge
                        variant={
                          step.status === "completed"
                            ? "default"
                            : step.status === "in-progress"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {step.status === "completed"
                          ? "Completed"
                          : step.status === "in-progress"
                            ? "In Progress"
                            : "Upcoming"}
                      </Badge>
                    </div>
                    <CardDescription className="mb-3">{step.description}</CardDescription>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {step.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {step.skills.length} skills
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="ml-10">
                  <h4 className="font-medium mb-2">Skills you'll learn:</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {step.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {step.status === "in-progress" && (
                    <Link href="/courses">
                      <Button size="sm">Continue Learning</Button>
                    </Link>
                  )}

                  {step.status === "upcoming" && (
                    <Button size="sm" variant="outline" disabled>
                      Coming Next
                    </Button>
                  )}

                  {step.status === "completed" && (
                    <div className="flex items-center gap-2 text-green-600">
                      <Award className="h-4 w-4" />
                      <span className="text-sm font-medium">Completed</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="mt-8 text-center">
          <CardContent className="pt-6">
            <h3 className="text-xl font-bold mb-2">Ready to Start Your Journey?</h3>
            <p className="text-muted-foreground mb-4">
              Join thousands of Nepali youth who have successfully transformed their careers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses">
                <Button size="lg">Enroll Now</Button>
              </Link>
              <Link href="/ai-mentor">
                <Button size="lg" variant="outline">
                  Ask AI Mentor
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
