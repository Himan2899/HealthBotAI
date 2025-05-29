"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, Shield, ArrowLeft, Chrome, Loader2, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/components/auth-provider"

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const error = searchParams.get("error")
  const { signIn, user } = useAuth()

  // Redirect if already signed in
  useEffect(() => {
    if (user) {
      router.push(callbackUrl)
    }
  }, [user, router, callbackUrl])

  // Handle error from URL parameters
  useEffect(() => {
    if (error) {
      setErrorMessage(`Authentication error: ${error}. Please try again.`)
    }
  }, [error])

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      setErrorMessage(null)
      await signIn("google")
      router.push(callbackUrl)
    } catch (error) {
      console.error("Sign in error:", error)
      setErrorMessage("Failed to sign in. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to home
          </Link>

          <motion.div
            className="flex items-center justify-center space-x-2 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              HealthBot AI
            </span>
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-400">Sign in to access your personal healthcare assistant</p>
        </div>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">Sign in with your Google account to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Error Alert */}
            {errorMessage && (
              <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                <AlertDescription className="text-red-800 dark:text-red-200">{errorMessage}</AlertDescription>
              </Alert>
            )}

            {/* Demo Notice */}
            <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20">
              <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertDescription className="text-blue-800 dark:text-blue-200">
                <strong>Demo Mode:</strong> This is a demonstration. Click the button below to sign in with a demo
                account.
              </AlertDescription>
            </Alert>

            {/* Google Sign In */}
            <Button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:border-gray-600"
              size="lg"
            >
              {isLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Chrome className="w-5 h-5 mr-2" />}
              {isLoading ? "Signing in..." : "Continue with Google (Demo)"}
            </Button>

            {/* Security Notice */}
            <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
              <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                Your data is protected with enterprise-grade security and HIPAA compliance.
              </AlertDescription>
            </Alert>

            {/* Disclaimer */}
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center space-y-2">
              <p>By signing in, you agree to our Terms of Service and Privacy Policy.</p>
              <p className="font-semibold text-red-600 dark:text-red-400">
                For medical emergencies, call 911 immediately.
              </p>
              <p>This AI assistant is not a substitute for professional medical advice.</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
