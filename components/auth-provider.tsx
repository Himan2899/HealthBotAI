"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  image?: string
}

interface AuthContextType {
  user: User | null
  signIn: (provider: string) => Promise<void>
  signOut: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Only access localStorage on client side
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("healthbot-user")
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch (error) {
          console.error("Error parsing saved user:", error)
          localStorage.removeItem("healthbot-user")
        }
      }
    }
    setLoading(false)
  }, [])

  const signIn = async (provider: string) => {
    setLoading(true)
    try {
      // Simulate Google sign-in
      if (provider === "google") {
        // In a real app, this would integrate with Google OAuth
        const mockUser: User = {
          id: "demo-user-123",
          name: "Demo User",
          email: "demo@healthbot.ai",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
        }
        setUser(mockUser)
        if (typeof window !== "undefined") {
          localStorage.setItem("healthbot-user", JSON.stringify(mockUser))
        }
      }
    } catch (error) {
      console.error("Sign in error:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = () => {
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("healthbot-user")
    }
  }

  // Don't render children until mounted on client side
  if (!mounted) {
    return null
  }

  return <AuthContext.Provider value={{ user, signIn, signOut, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Compatibility hooks for existing code
export function useSession() {
  const { user, loading } = useAuth()
  return {
    data: user ? { user } : null,
    status: loading ? "loading" : user ? "authenticated" : "unauthenticated",
  }
}

export function signIn(provider: string, options?: { callbackUrl?: string }) {
  // This will be handled by the component
  return Promise.resolve()
}

export function signOut(options?: { callbackUrl?: string }) {
  // This will be handled by the component
  return Promise.resolve()
}
