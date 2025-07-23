"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Navigation } from "@/components/navigation"
import { Play, Pause, RotateCcw, Mic, Video, MessageSquare, Clock, CheckCircle, AlertCircle, Star } from "lucide-react"

export default function MockInterviewPage() {
  const [interviewStarted, setInterviewStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const interviewQuestions = [
    {
      id: 1,
      question: "Tell me about yourself and why you're interested in this position.",
      category: "Introduction",
      timeLimit: 120,
      tips: "Keep it concise, focus on relevant experience and skills",
    },
    {
      id: 2,
      question: "What are your greatest strengths and how do they relate to this job?",
      category: "Strengths",
      timeLimit: 90,
      tips: "Provide specific examples and connect to job requirements",
    },
    {
      id: 3,
      question: "Describe a challenging situation you faced and how you handled it.",
      category: "Problem Solving",
      timeLimit: 120,
      tips: "Use the STAR method: Situation, Task, Action, Result",
    },
    {
      id: 4,
      question: "Where do you see yourself in 5 years?",
      category: "Career Goals",
      timeLimit: 90,
      tips: "Show ambition but be realistic and relevant to the role",
    },
    {
      id: 5,
      question: "Why do you want to work for our company?",
      category: "Company Knowledge",
      timeLimit: 90,
      tips: "Research the company and show genuine interest",
    },
  ]

  const mockFeedback = {
    overallScore: 78,
    strengths: [
      "Good eye contact and confident body language",
      "Clear and articulate speech",
      "Relevant examples provided",
    ],
    improvements: [
      "Reduce use of filler words (um, uh)",
      "Provide more specific metrics in examples",
      "Practice concluding answers more strongly",
    ],
    detailedFeedback:
      "Your interview performance shows good potential. You demonstrated confidence and provided relevant examples. Focus on being more concise and specific with your answers. Practice will help you feel more natural and reduce nervousness.",
  }

  const startInterview = () => {
    setInterviewStarted(true)
    setCurrentQuestion(0)
    setShowFeedback(false)
  }

  const nextQuestion = () => {
    if (currentQuestion < interviewQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setUserAnswer("")
    } else {
      setShowFeedback(true)
    }
  }

  const restartInterview = () => {
    setInterviewStarted(false)
    setCurrentQuestion(0)
    setUserAnswer("")
    setShowFeedback(false)
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  if (showFeedback) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Interview Complete!</h1>
            <p className="text-muted-foreground">Here's your detailed feedback and performance analysis</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Overall Score */}
            <Card className="lg:col-span-1">
              <CardHeader className="text-center">
                <CardTitle>Overall Score</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-muted"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - mockFeedback.overallScore / 100)}`}
                      className="text-primary"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">{mockFeedback.overallScore}%</span>
                  </div>
                </div>
                <Badge variant="secondary" className="text-lg px-4 py-1">
                  Good Performance
                </Badge>
              </CardContent>
            </Card>

            {/* Detailed Feedback */}
            <div className="lg:col-span-2 space-y-6">
              {/* Strengths */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {mockFeedback.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Star className="h-4 w-4 text-green-500 mt-0.5" />
                        <span className="text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Areas for Improvement */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-600">
                    <AlertCircle className="h-5 w-5" />
                    Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {mockFeedback.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                        <span className="text-sm">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Detailed Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{mockFeedback.detailedFeedback}</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button onClick={restartInterview} variant="outline" size="lg">
              <RotateCcw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Button size="lg">Save Results</Button>
          </div>
        </div>
      </div>
    )
  }

  if (!interviewStarted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="container mx-auto max-w-4xl px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Mock Interview Practice</h1>
            <p className="text-muted-foreground">
              Practice your interview skills with AI-powered feedback and analysis
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Interview Setup */}
            <Card>
              <CardHeader>
                <CardTitle>Interview Setup</CardTitle>
                <CardDescription>Prepare for your mock interview session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">What to Expect:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {interviewQuestions.length} common interview questions
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Real-time feedback and scoring
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Voice and video recording options
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Detailed performance analysis
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Tips for Success:</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Find a quiet, well-lit space</li>
                    <li>• Dress professionally</li>
                    <li>• Maintain good eye contact with camera</li>
                    <li>• Speak clearly and at moderate pace</li>
                    <li>• Use specific examples in your answers</li>
                  </ul>
                </div>

                <Button onClick={startInterview} size="lg" className="w-full">
                  <Play className="h-4 w-4 mr-2" />
                  Start Mock Interview
                </Button>
              </CardContent>
            </Card>

            {/* Question Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Question Categories</CardTitle>
                <CardDescription>Preview of question types you'll encounter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {interviewQuestions.map((q, index) => (
                    <div key={q.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline">{q.category}</Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {q.timeLimit}s
                        </span>
                      </div>
                      <p className="text-sm font-medium mb-2">{q.question}</p>
                      <p className="text-xs text-muted-foreground">{q.tips}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  const currentQ = interviewQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / interviewQuestions.length) * 100

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Mock Interview in Progress</h1>
            <Badge variant="secondary">
              Question {currentQuestion + 1} of {interviewQuestions.length}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Question Panel */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <Badge variant="outline" className="mb-2">
                      {currentQ.category}
                    </Badge>
                    <CardTitle className="text-xl">{currentQ.question}</CardTitle>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {currentQ.timeLimit}s
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg mb-4">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Tip:</strong> {currentQ.tips}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Video/Recording Area */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="bg-muted rounded-lg h-64 flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Video className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">Video recording area</p>
                    <p className="text-sm text-muted-foreground">Camera will appear here</p>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <Button variant={isRecording ? "destructive" : "default"} onClick={toggleRecording}>
                    {isRecording ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Stop Recording
                      </>
                    ) : (
                      <>
                        <Mic className="h-4 w-4 mr-2" />
                        Start Recording
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Answer Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Your Answer
                </CardTitle>
                <CardDescription>Type your response or use voice recording above</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Type your answer here..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  rows={6}
                  className="mb-4"
                />

                <div className="flex justify-between">
                  <Button variant="outline" onClick={restartInterview}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Restart
                  </Button>
                  <Button onClick={nextQuestion}>
                    {currentQuestion < interviewQuestions.length - 1 ? "Next Question" : "Finish Interview"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Question Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Question Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Category</p>
                    <Badge variant="secondary">{currentQ.category}</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Time Limit</p>
                    <p className="text-sm text-muted-foreground">{currentQ.timeLimit} seconds</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Progress</p>
                    <p className="text-sm text-muted-foreground">
                      {currentQuestion + 1} of {interviewQuestions.length} questions
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interview Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Interview Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <p>Maintain eye contact with the camera</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <p>Speak clearly and at moderate pace</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <p>Use specific examples in answers</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <p>Keep answers concise and relevant</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Question List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">All Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {interviewQuestions.map((q, index) => (
                    <div
                      key={q.id}
                      className={`p-2 rounded text-sm ${
                        index === currentQuestion
                          ? "bg-primary text-primary-foreground"
                          : index < currentQuestion
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-muted"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Q{index + 1}</span>
                        <Badge variant="outline" className="text-xs">
                          {q.category}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
