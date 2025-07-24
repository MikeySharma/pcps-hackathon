"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, CheckCircle, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Question {
  id: string
  type: "radio" | "slider" | "multiple"
  question: string
  options?: string[]
  min?: number
  max?: number
  step?: number
  labels?: { min: string; max: string }
}

const questions: Question[] = [
  {
    id: "age",
    type: "radio",
    question: "What is your age group?",
    options: ["16-20", "21-25", "26-30", "31-35", "36-40", "40+"],
  },
  {
    id: "education",
    type: "radio",
    question: "What is your highest level of education?",
    options: ["High School", "Intermediate (+2)", "Bachelor's Degree", "Master's Degree", "PhD", "Other"],
  },
  {
    id: "field",
    type: "radio",
    question: "What field did you study or are you interested in?",
    options: [
      "Science & Technology",
      "Business & Management",
      "Arts & Humanities",
      "Engineering",
      "Medicine & Health",
      "Law",
      "Agriculture",
      "Other",
    ],
  },
  {
    id: "work_preference",
    type: "slider",
    question: "How much do you prefer working with people vs. working independently?",
    min: 0,
    max: 10,
    step: 1,
    labels: { min: "Independently", max: "With People" },
  },
  {
    id: "risk_tolerance",
    type: "slider",
    question: "How comfortable are you with taking risks in your career?",
    min: 0,
    max: 10,
    step: 1,
    labels: { min: "Risk Averse", max: "Risk Taker" },
  },
  {
    id: "work_environment",
    type: "radio",
    question: "What type of work environment do you prefer?",
    options: [
      "Office/Corporate",
      "Remote/Work from Home",
      "Outdoor/Field Work",
      "Creative Studio",
      "Laboratory/Research",
      "Mixed/Flexible",
    ],
  },
  {
    id: "salary_importance",
    type: "slider",
    question: "How important is a high salary to you?",
    min: 0,
    max: 10,
    step: 1,
    labels: { min: "Not Important", max: "Very Important" },
  },
  {
    id: "interests",
    type: "multiple",
    question: "Which activities interest you the most? (Select up to 3)",
    options: [
      "Problem Solving",
      "Creative Design",
      "Teaching/Training",
      "Data Analysis",
      "Public Speaking",
      "Writing",
      "Research",
      "Leadership",
      "Technology",
      "Healthcare",
      "Finance",
      "Marketing",
    ],
  },
  {
    id: "work_style",
    type: "radio",
    question: "How do you prefer to work?",
    options: ["Structured routine", "Flexible schedule", "Project-based", "Deadline-driven", "Self-paced"],
  },
  {
    id: "career_goal",
    type: "radio",
    question: "What is your primary career goal?",
    options: [
      "Financial stability",
      "Work-life balance",
      "Career advancement",
      "Making a difference",
      "Creative fulfillment",
      "Entrepreneurship",
    ],
  },
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isCompleted, setIsCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      setIsCompleted(true)
      generateResults()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const generateResults = () => {
    // Simulate AI processing
    setTimeout(() => {
      setShowResults(true)
    }, 2000)
  }

  const getCareerRecommendations = () => {
    // Simple logic based on answers - in real app, this would be more sophisticated
    const recommendations = []

    if (answers.field === "Science & Technology" && answers.interests?.includes("Technology")) {
      recommendations.push({
        title: "Software Developer",
        match: "95%",
        description: "Build applications and systems using programming languages",
        skills: ["Programming", "Problem Solving", "Logical Thinking"],
        salary: "NPR 50,000 - 150,000/month",
      })
    }

    if (answers.interests?.includes("Creative Design")) {
      recommendations.push({
        title: "Graphic Designer",
        match: "88%",
        description: "Create visual content for digital and print media",
        skills: ["Design Software", "Creativity", "Visual Communication"],
        salary: "NPR 30,000 - 80,000/month",
      })
    }

    if (answers.interests?.includes("Teaching/Training")) {
      recommendations.push({
        title: "Education Specialist",
        match: "82%",
        description: "Develop educational programs and train others",
        skills: ["Communication", "Leadership", "Subject Expertise"],
        salary: "NPR 40,000 - 100,000/month",
      })
    }

    // Default recommendations if no specific matches
    if (recommendations.length === 0) {
      recommendations.push(
        {
          title: "Business Analyst",
          match: "75%",
          description: "Analyze business processes and recommend improvements",
          skills: ["Analysis", "Communication", "Problem Solving"],
          salary: "NPR 45,000 - 120,000/month",
        },
        {
          title: "Digital Marketing Specialist",
          match: "70%",
          description: "Manage online marketing campaigns and social media",
          skills: ["Digital Marketing", "Analytics", "Creativity"],
          salary: "NPR 35,000 - 90,000/month",
        },
      )
    }

    return recommendations.slice(0, 3) // Return top 3 recommendations
  }

  const currentQ = questions[currentQuestion]
  const canProceed = answers[currentQ?.id] !== undefined

  if (isCompleted && !showResults) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing Your Responses</h3>
            <p className="text-gray-600">Our AI is processing your answers to find the perfect career matches...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showResults) {
    const recommendations = getCareerRecommendations()

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Career Recommendations</h1>
            <p className="text-gray-600">Based on your responses, here are the careers that match your profile</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {recommendations.map((career, index) => (
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
                        {career.match}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{career.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Required Skills:</h4>
                        <div className="flex flex-wrap gap-1">
                          {career.skills.map((skill, i) => (
                            <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Salary Range:</h4>
                        <p className="text-gray-600 text-sm">{career.salary}</p>
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
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Career Discovery Quiz</h1>
              <span className="text-sm text-gray-600">
                {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{currentQ.question}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentQ.type === "radio" && (
                    <RadioGroup
                      value={answers[currentQ.id] || ""}
                      onValueChange={(value) => handleAnswer(currentQ.id, value)}
                    >
                      {currentQ.options?.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={option} />
                          <Label htmlFor={option} className="cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}

                  {currentQ.type === "slider" && (
                    <div className="space-y-4">
                      <div className="px-3">
                        <Slider
                          value={[answers[currentQ.id] || currentQ.min || 0]}
                          onValueChange={(value) => handleAnswer(currentQ.id, value[0])}
                          max={currentQ.max}
                          min={currentQ.min}
                          step={currentQ.step}
                          className="w-full"
                        />
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{currentQ.labels?.min}</span>
                        <span className="font-medium">
                          {answers[currentQ.id] !== undefined ? answers[currentQ.id] : "Select"}
                        </span>
                        <span>{currentQ.labels?.max}</span>
                      </div>
                    </div>
                  )}

                  {currentQ.type === "multiple" && (
                    <div className="grid grid-cols-2 gap-3">
                      {currentQ.options?.map((option) => {
                        const selected = answers[currentQ.id] || []
                        const isSelected = selected.includes(option)
                        const canSelect = selected.length < 3 || isSelected

                        return (
                          <button
                            key={option}
                            onClick={() => {
                              if (isSelected) {
                                handleAnswer(
                                  currentQ.id,
                                  selected.filter((item: string) => item !== option),
                                )
                              } else if (canSelect) {
                                handleAnswer(currentQ.id, [...selected, option])
                              }
                            }}
                            disabled={!canSelect}
                            className={`p-3 text-left rounded-lg border transition-colors ${
                              isSelected
                                ? "border-gray-800 bg-gray-800 text-white"
                                : canSelect
                                  ? "border-gray-200 hover:border-gray-300 bg-white"
                                  : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            {option}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button onClick={nextQuestion} disabled={!canProceed} className="bg-gray-800 hover:bg-gray-700">
              {currentQuestion === questions.length - 1 ? "Complete Quiz" : "Next"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
