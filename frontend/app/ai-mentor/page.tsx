"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Navigation } from "@/components/navigation"
import { Send, Mic, Bot, User, Lightbulb, MessageCircle, Clock } from "lucide-react"

interface Message {
  id: number
  type: "user" | "ai"
  content: string
  timestamp: string
}

export default function AIMentorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "ai",
      content:
        "Hello! I'm your AI Career Mentor. I'm here to help you with career guidance, job search tips, skill development advice, and answer any questions about your professional journey in Nepal. How can I assist you today?",
      timestamp: "10:00 AM",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const promptSuggestions = [
    "What job is best after +2?",
    "How to apply for foreign job?",
    "What skills should I learn for digital marketing?",
    "How to prepare for job interviews?",
    "Best career options in Nepal?",
    "How to write a good resume?",
    "What are high-demand jobs in Nepal?",
    "How to improve English for jobs?",
  ]

  const sendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        type: "ai",
        content: getAIResponse(inputMessage),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)

    setInputMessage("")
  }

  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase()

    if (lowerQuestion.includes("after +2") || lowerQuestion.includes("plus 2")) {
      return "Great question! After completing +2, you have several excellent career options in Nepal:\n\n1. **Technology Sector**: Digital marketing, web development, data entry\n2. **Business & Finance**: Banking, accounting, sales\n3. **Healthcare**: Medical assistant, pharmacy assistant\n4. **Education**: Teaching assistant, tutoring\n5. **Government Jobs**: Various entry-level positions\n\nI recommend taking our career assessment to get personalized recommendations based on your interests and skills. Would you like me to guide you through that?"
    }

    if (lowerQuestion.includes("foreign job") || lowerQuestion.includes("abroad")) {
      return "For foreign employment opportunities, here's what you need to know:\n\n**Popular Destinations for Nepalis:**\n- Gulf countries (UAE, Saudi Arabia, Qatar)\n- Malaysia, South Korea, Japan\n- Australia, Canada (for skilled workers)\n\n**Steps to Apply:**\n1. Get proper documentation (passport, certificates)\n2. Learn basic language skills of destination country\n3. Apply through licensed recruitment agencies\n4. Complete required training and orientation\n5. Obtain work permit and visa\n\n**Important**: Always use government-approved agencies and be aware of your rights. Would you like specific information about any particular country?"
    }

    if (lowerQuestion.includes("digital marketing") || lowerQuestion.includes("marketing")) {
      return "Digital marketing is a growing field in Nepal! Here are the key skills you should develop:\n\n**Essential Skills:**\n- Social media marketing (Facebook, Instagram, TikTok)\n- Content creation and copywriting\n- Basic graphic design\n- Google Ads and Facebook Ads\n- Email marketing\n- Analytics and reporting\n\n**Learning Path:**\n1. Start with our Digital Marketing Fundamentals course\n2. Practice with real projects\n3. Build a portfolio\n4. Get certified (Google, Facebook)\n\n**Salary Range**: Rs. 25,000 - 45,000/month for beginners\n\nWould you like me to create a personalized learning roadmap for you?"
    }

    return "Thank you for your question! Based on your query, I'd recommend exploring our courses and career roadmaps. I can provide specific guidance on:\n\n- Career planning and goal setting\n- Skill development recommendations\n- Job search strategies\n- Interview preparation\n- Resume building tips\n- Industry insights for Nepal\n\nCould you be more specific about what aspect you'd like help with? I'm here to provide personalized advice for your career journey!"
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">AI Career Mentor</h1>
          <p className="text-muted-foreground">Get personalized career guidance and advice 24/7</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  Career Mentor Chat
                </CardTitle>
                <CardDescription>Ask me anything about careers, jobs, and skills in Nepal</CardDescription>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 flex flex-col">
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.type === "ai" && (
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                              <Bot className="h-4 w-4 text-primary-foreground" />
                            </div>
                          </div>
                        )}

                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                        </div>

                        {message.type === "user" && (
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                              <User className="h-4 w-4" />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="mt-4 flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Type your question here..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      className="pr-12"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    >
                      <Mic className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button onClick={sendMessage} disabled={!inputMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lightbulb className="h-5 w-5" />
                  Quick Questions
                </CardTitle>
                <CardDescription>Click to ask common questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {promptSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full text-left justify-start h-auto py-2 px-3 bg-transparent"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <MessageCircle className="h-3 w-3 mr-2 flex-shrink-0" />
                      <span className="text-xs">{suggestion}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Capabilities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">I can help you with:</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Badge variant="secondary" className="mt-0.5">
                      Career
                    </Badge>
                    <p className="text-sm">Career planning and guidance</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="secondary" className="mt-0.5">
                      Skills
                    </Badge>
                    <p className="text-sm">Skill development recommendations</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="secondary" className="mt-0.5">
                      Jobs
                    </Badge>
                    <p className="text-sm">Job search and application tips</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="secondary" className="mt-0.5">
                      Interview
                    </Badge>
                    <p className="text-sm">Interview preparation</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="secondary" className="mt-0.5">
                      Resume
                    </Badge>
                    <p className="text-sm">Resume and CV writing</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5" />
                  Recent Chats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-muted rounded">
                    <p className="font-medium">Digital Marketing Career</p>
                    <p className="text-muted-foreground text-xs">2 hours ago</p>
                  </div>
                  <div className="p-2 bg-muted rounded">
                    <p className="font-medium">Foreign Job Application</p>
                    <p className="text-muted-foreground text-xs">Yesterday</p>
                  </div>
                  <div className="p-2 bg-muted rounded">
                    <p className="font-medium">Resume Writing Tips</p>
                    <p className="text-muted-foreground text-xs">3 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
