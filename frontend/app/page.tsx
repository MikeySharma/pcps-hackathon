import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { Navigation } from "@/components/navigation"
import { BookOpen, Brain, FileText, Search, Star, Target } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const features = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Career Guidance",
      description: "AI-powered career recommendations based on your skills and interests",
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Micro-Skilling",
      description: "Short, practical courses designed for quick skill development",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Resume Builder",
      description: "Professional resume templates tailored for Nepali job market",
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI Mentor",
      description: "24/7 AI assistant for career advice and guidance",
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Smart Job Search",
      description: "Intelligent job matching from multiple platforms",
    },
  ]

  const testimonials = [
    {
      name: "Rajesh Shrestha",
      role: "+2 Graduate",
      content:
        "KaamSathi helped me find the right career path after my +2. Now I'm working as a digital marketing specialist!",
      rating: 5,
    },
    {
      name: "Sita Gurung",
      role: "Informal Worker",
      content:
        "The micro-courses were perfect for my schedule. I learned new skills while working and got a better job.",
      rating: 5,
    },
    {
      name: "Bikash Tamang",
      role: "Youth",
      content: "The AI mentor answered all my questions about foreign employment. Very helpful!",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            Empowering Nepali Youth
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            KaamSathi
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            AI-Powered Career Guidance for Nepal's Future
          </p>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Designed for +2 graduates, unskilled youth, and informal workers. Get personalized career guidance, learn
            new skills, and find better opportunities.
          </p>
          <Link href="/onboarding">
            <Button size="lg" className="text-lg px-8 py-3">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools and guidance to help you build a successful career in Nepal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-lg text-muted-foreground">
              See how KaamSathi has helped young Nepalis build better careers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">KaamSathi</h3>
              <p className="text-muted-foreground mb-4">
                Empowering Nepali youth with AI-powered career guidance and skill development.
              </p>
              <div className="flex items-center gap-4">
                <ThemeToggle />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/courses" className="hover:text-foreground">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link href="/resume-builder" className="hover:text-foreground">
                    Resume Builder
                  </Link>
                </li>
                <li>
                  <Link href="/job-search" className="hover:text-foreground">
                    Job Search
                  </Link>
                </li>
                <li>
                  <Link href="/ai-mentor" className="hover:text-foreground">
                    AI Mentor
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 KaamSathi. Made with ❤️ for Nepal's youth.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
