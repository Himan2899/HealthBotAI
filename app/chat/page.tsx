"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Send,
  Bot,
  User,
  Heart,
  ArrowLeft,
  AlertTriangle,
  Loader2,
  Stethoscope,
  Activity,
  Clock,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"

const quickPrompts = [
  "I have a headache and feel nauseous",
  "What should I do for a minor cut?",
  "I'm experiencing chest pain",
  "How to treat a fever at home?",
  "I have trouble sleeping",
  "What are the symptoms of dehydration?",
]

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

export default function ChatPage() {
  const { user, loading: authLoading } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Ensure component is mounted on client side
  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const assistantMessage: Message = {
        id: data.id || `assistant-${Date.now()}`,
        role: "assistant",
        content: data.content,
        timestamp: data.created_at || new Date().toISOString(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      console.error("Chat error:", err)
      setError(err instanceof Error ? err.message : "Failed to get response")
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt)
    setError(null)
  }

  // Show loading state while mounting or auth is loading
  if (!mounted || authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Dashboard
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  HealthBot AI
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <Shield className="w-3 h-3 mr-1" />
                HIPAA Compliant
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">AI Health Assistant</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Describe your symptoms or health concerns for personalized guidance
          </p>
        </motion.div>

        {/* Emergency Alert */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
            <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              <strong>Emergency:</strong> If you're experiencing a medical emergency, call 911 immediately. This AI
              assistant is not a substitute for professional medical care.
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Error Alert */}
        {error && (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Alert className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20">
              <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              <AlertDescription className="text-orange-800 dark:text-orange-200">
                <strong>Error:</strong> {error}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-blue-600" />
                <span>Health Consultation</span>
                {isLoading && <Loader2 className="w-4 h-4 animate-spin text-blue-600" />}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-full p-6">
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Stethoscope className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Start Your Health Consultation</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      I'm here to help with your health questions and concerns.
                    </p>

                    {/* Quick Prompts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                      {quickPrompts.map((prompt, index) => (
                        <motion.button
                          key={index}
                          onClick={() => handleQuickPrompt(prompt)}
                          className="p-3 text-left rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={isLoading}
                        >
                          <p className="text-sm">{prompt}</p>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex space-x-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                        >
                          <Avatar className="w-8 h-8">
                            {message.role === "user" ? (
                              <>
                                <AvatarImage src={user?.image || ""} />
                                <AvatarFallback>
                                  <User className="w-4 h-4" />
                                </AvatarFallback>
                              </>
                            ) : (
                              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-green-500">
                                <Bot className="w-4 h-4 text-white" />
                              </AvatarFallback>
                            )}
                          </Avatar>

                          <div
                            className={`rounded-lg p-4 ${
                              message.role === "user"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            <div className="flex items-center mt-2 text-xs opacity-70">
                              <Clock className="w-3 h-3 mr-1" />
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Loading indicator for AI response */}
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="flex space-x-3 max-w-[80%]">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-green-500">
                              <Bot className="w-4 h-4 text-white" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="rounded-lg p-4 bg-gray-100 dark:bg-gray-800">
                            <div className="flex items-center space-x-2">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">AI is thinking...</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                )}
              </ScrollArea>
            </CardContent>

            {/* Input Form */}
            <div className="border-t p-4">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe your symptoms or ask a health question..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </form>

              <div className="flex items-center justify-center mt-3 text-xs text-gray-500 dark:text-gray-400">
                <Activity className="w-3 h-3 mr-1" />
                AI responses are for informational purposes only
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
