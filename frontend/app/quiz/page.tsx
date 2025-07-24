"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, CheckCircle, Sparkles, AlertCircle, RotateCcw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface QuestionOption {
  text: string
  value: string
}

interface Question {
  id: number
  question: string
  options: QuestionOption[]
}

interface QuizMetadata {
  currentQuestion: number
  totalQuestions: number
  completionPercentage: number
  threadId?: string
}

interface CareerSuggestion {
  title: string
  description: string
  pros: string[]
  cons: string[]
  salaryRange: string
  educationPath: string
  jobMarket: string
  fitScore: number
}

interface ApiResponse {
  success: boolean
  message: string
  data: Question | { careerSuggestions: CareerSuggestion[] }
  metadata: QuizMetadata
}

export default function AIQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [metadata, setMetadata] = useState<QuizMetadata>({
    currentQuestion: 0,
    totalQuestions: 10,
    completionPercentage: 0,
  })
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [careerSuggestions, setCareerSuggestions] = useState<CareerSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [error, setError] = useState<string>("")
  const [hasStarted, setHasStarted] = useState(false)

  // Check for incomplete quiz on component mount
  useEffect(() => {
    checkIncompleteQuiz()
  }, [])

  const checkIncompleteQuiz = async () => {
    try {
      // Check if there's a stored threadId from previous session
      const storedThreadId = localStorage.getItem("quiz_thread_id")
      if (storedThreadId) {
        const response = await fetch(`/api/ai-quiz/progress/${storedThreadId}`)
        if (response.ok) {
          const data = await response.json()
          if (data.success && !data.metadata.isCompleted) {
            setMetadata(data.metadata)
            setCurrentQuestion(data.data.questions[data.metadata.currentQuestion - 1])
            setHasStarted(true)
          }
        }
      }
    } catch (error) {
      console.error("Error checking incomplete quiz:", error)
    }
  }

  const startQuiz = async () => {
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/ai-quiz/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to start quiz")
      }

      const data: ApiResponse = await response.json()

      if (data.success) {
        setCurrentQuestion(data.data as Question)
        setMetadata(data.metadata)
        setHasStarted(true)

        // Store threadId for resuming later
        if (data.metadata.threadId) {
          localStorage.setItem("quiz_thread_id", data.metadata.threadId)
        }
      } else {
        setError(data.message || "Failed to start quiz")
      }
    } catch (error) {
      setError("Unable to connect to the quiz service. Please try again.")
      console.error("Error starting quiz:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const submitAnswer = async () => {
    if (!selectedAnswer || !metadata.threadId) return

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/ai-quiz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          threadId: metadata.threadId,
          answer: selectedAnswer,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit answer")
      }

      const data: ApiResponse = await response.json()

      if (data.success) {
        setMetadata(data.metadata)

        if (data.metadata.completionPercentage === 100) {
          // Quiz completed - show results
          const suggestionData = data.data as { careerSuggestions: CareerSuggestion[] }
          setCareerSuggestions(suggestionData.careerSuggestions)
          setIsCompleted(true)
          localStorage.removeItem("quiz_thread_id") // Clear stored threadId
        } else {
          // Next question
          setCurrentQuestion(data.data as Question)
          setSelectedAnswer("")
        }
      } else {
        setError(data.message || "Failed to submit answer")
      }
    } catch (error) {
      setError("Unable to submit answer. Please try again.")
      console.error("Error submitting answer:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(null)
    setMetadata({
      currentQuestion: 0,
      totalQuestions: 10,
      completionPercentage: 0,
    })
    setSelectedAnswer("")
    setCareerSuggestions([])
    setIsCompleted(false)
    setError("")
    setHasStarted(false)
    localStorage.removeItem("quiz_thread_id")
  }

  // Loading state for quiz initialization
  if (isLoading && !hasStarted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Starting Your Assessment</h3>
            <p className="text-gray-600">Preparing personalized questions...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Results page
  if (isCompleted && careerSuggestions.length > 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your AI-Generated Career Recommendations</h1>
            <p className="text-gray-600">Based on your responses, here are personalized career matches</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {careerSuggestions.map((career, index) => (
              <motion.div
                key={career.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg">{career.title}</CardTitle>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                        {career.fitScore}% Match
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{career.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Pros:</h4>
                        <ul className="text-sm text-gray-600 list-disc list-inside">
                          {career.pros.slice(0, 2).map((pro, i) => (
                            <li key={i}>{pro}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Salary Range:</h4>
                        <p className="text-gray-600 text-sm">{career.salaryRange}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Job Market:</h4>
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            career.jobMarket === "high"
                              ? "bg-green-100 text-green-800"
                              : career.jobMarket === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {career.jobMarket.charAt(0).toUpperCase() + career.jobMarket.slice(1)} Demand
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center space-y-4">
            <Button asChild className="bg-gray-800 hover:bg-gray-700">
              <a href="/chat">
                <Sparkles className="h-4 w-4 mr-2" />
                Get Detailed Career Guidance
              </a>
            </Button>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <a href="/resume">Build Your Resume</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/courses">Explore Courses</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/jobs">Find Jobs</a>
              </Button>
              <Button onClick={restartQuiz} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Take Quiz Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Start screen
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Card className="p-8">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <Sparkles className="h-12 w-12 text-gray-800" />
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900 mb-4">AI-Powered Career Assessment</CardTitle>
                <p className="text-gray-600 text-lg mb-6">
                  Discover your ideal career path with our intelligent assessment that adapts to your responses
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-left">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Dynamic questions based on your answers</span>
                  </div>
                  <div className="flex items-center text-left">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">AI-generated career recommendations</span>
                  </div>
                  <div className="flex items-center text-left">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Detailed career insights and salary information</span>
                  </div>
                  <div className="flex items-center text-left">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Resume incomplete assessments anytime</span>
                  </div>
                </div>

                {error && (
                  <Alert className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  onClick={startQuiz}
                  disabled={isLoading}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 text-lg"
                >
                  {isLoading ? "Starting..." : "Start Career Assessment"}
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  // Quiz in progress
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">AI Career Assessment</h1>
              <span className="text-sm text-gray-600">
                Question {metadata.currentQuestion} of {metadata.totalQuestions}
              </span>
            </div>
            <Progress value={metadata.completionPercentage} className="h-2" />
          </div>

          {error && (
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion?.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{currentQuestion?.question}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                    {currentQuestion?.options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label htmlFor={option.value} className="cursor-pointer">
                          {option.text}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={() => window.history.back()} disabled={isLoading}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={submitAnswer}
              disabled={!selectedAnswer || isLoading}
              className="bg-gray-800 hover:bg-gray-700"
            >
              {isLoading
                ? "Processing..."
                : metadata.currentQuestion === metadata.totalQuestions
                  ? "Complete Assessment"
                  : "Next Question"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
