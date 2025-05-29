"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, ArrowLeft, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  // Map error codes to user-friendly messages
  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case "Configuration":
        return "There is a problem with the server configuration. Please try again later."
      case "AccessDenied":
        return "Access denied. You do not have permission to sign in."
      case "Verification":
        return "The verification link may have expired or already been used. Please request a new one."
      case "OAuthSignin":
      case "OAuthCallback":
      case "OAuthCreateAccount":
      case "EmailCreateAccount":
      case "Callback":
      case "OAuthAccountNotLinked":
      case "EmailSignin":
      case "CredentialsSignin":
        return "There was a problem with authentication. Please try again."
      case "SessionRequired":
        return "You must be signed in to access this page."
      case "CLIENT_FETCH_ERROR":
        return "There was a problem connecting to the authentication service. Please try again later."
      default:
        return "An unexpected error occurred. Please try again later."
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
            href="/auth/signin"
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to sign in
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
        </div>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto"
            >
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </motion.div>
            <CardTitle className="text-2xl">Authentication Error</CardTitle>
            <CardDescription className="text-center">
              We encountered a problem while trying to sign you in
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <AlertDescription className="text-red-800 dark:text-red-200">{getErrorMessage(error)}</AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">1</span>
                </div>
                <div>
                  <p className="font-medium">Check your credentials</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Make sure you're using the correct email address or Google account
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">2</span>
                </div>
                <div>
                  <p className="font-medium">Try again</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Return to the sign-in page and try again</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">3</span>
                </div>
                <div>
                  <p className="font-medium">Contact support</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    If the problem persists, please contact our support team
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <Link href="/auth/signin">
                <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                  Return to Sign In
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
