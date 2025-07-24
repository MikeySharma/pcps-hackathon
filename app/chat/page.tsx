"use client"

import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Bot, User, Send, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const suggestedQuestions = [
    "What career is best for me with a computer science background?",
    "How can I prepare for job interviews in Nepal?",
    "What skills should I learn for remote work opportunities?",
    "How to write a good resume for Nepali companies?",
    "What are the highest paying jobs in Nepal?",
    "How to start a business in Nepal?",
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="flex flex-col h-[calc(100vh-8rem)] sm:h-[80vh]">
            <CardHeader className="border-b border-gray-200 flex-shrink-0 px-4 py-4 sm:px-6">
              <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
                <span>AI Career Chat</span>
              </CardTitle>
              <p className="text-gray-600 text-sm sm:text-base">
                Get personalized career guidance for the Nepali job market
              </p>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-4 sm:py-8">
                    <Bot className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Welcome to KaamSathi AI Chat!</h3>
                    <p className="text-gray-600 mb-6 text-sm sm:text-base px-4">
                      I'm here to help you with career guidance, job search tips, and professional development advice
                      for Nepal.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 max-w-2xl mx-auto">
                      {suggestedQuestions.map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="text-left h-auto p-3 text-xs sm:text-sm bg-transparent break-words whitespace-normal"
                          onClick={() => {
                            handleInputChange({ target: { value: question } } as any)
                          }}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex space-x-2 sm:space-x-3 max-w-[85%] sm:max-w-3xl ${
                        message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                          message.role === "user" ? "bg-gray-800" : "bg-gray-200"
                        }`}
                      >
                        {message.role === "user" ? (
                          <User className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                        ) : (
                          <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                        )}
                      </div>
                      <div
                        className={`rounded-xl px-3 py-2 sm:px-4 sm:py-2 break-words overflow-wrap-anywhere ${
                          message.role === "user" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex space-x-2 sm:space-x-3 max-w-[85%] sm:max-w-3xl">
                      <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                      </div>
                      <div className="rounded-xl px-3 py-2 sm:px-4 sm:py-2 bg-gray-100">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                          <span className="text-gray-600 text-sm sm:text-base">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-4 sm:p-6 flex-shrink-0">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="flex-1">
                    <Textarea
                      value={input}
                      onChange={handleInputChange}
                      placeholder="Ask me about careers, jobs, skills, or anything related to professional development in Nepal..."
                      className="min-h-[60px] sm:min-h-[60px] resize-none text-sm sm:text-base"
                      rows={2}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSubmit(e as any)
                        }
                      }}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-gray-800 hover:bg-gray-700 self-end sm:self-auto px-4 py-2 sm:px-4 sm:py-2"
                    size="sm"
                  >
                    <Send className="h-4 w-4" />
                    <span className="ml-2 sm:hidden">Send</span>
                  </Button>
                </form>
                <p className="text-xs text-gray-500 mt-2">Press Enter to send, Shift+Enter for new line</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
