"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  MessageCircle,
  Activity,
  Pill,
  Heart,
  AlertTriangle,
  User,
  Settings,
  LogOut,
  BarChart3,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const quickActions = [
  {
    title: "Start Chat",
    description: "Get instant health guidance",
    icon: MessageCircle,
    href: "/chat",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Symptom Checker",
    description: "Analyze your symptoms",
    icon: Activity,
    href: "/symptoms",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Emergency Guide",
    description: "Emergency contacts & procedures",
    icon: AlertTriangle,
    href: "/emergency",
    color: "from-red-500 to-pink-500",
  },
  {
    title: "First Aid",
    description: "Step-by-step first aid guides",
    icon: Heart,
    href: "/first-aid",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Medications",
    description: "Manage your medications",
    icon: Pill,
    href: "/medications",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Health Records",
    description: "View your health history",
    icon: BarChart3,
    href: "/records",
    color: "from-indigo-500 to-purple-500",
  },
]

const recentActivity = [
  {
    type: "chat",
    title: "Headache consultation",
    time: "2 hours ago",
    status: "completed",
  },
  {
    type: "symptom",
    title: "Fever symptoms checked",
    time: "1 day ago",
    status: "completed",
  },
  {
    type: "medication",
    title: "Medication reminder set",
    time: "2 days ago",
    status: "active",
  },
]

const healthMetrics = [
  {
    label: "Health Score",
    value: 85,
    change: "+5%",
    color: "text-green-600",
  },
  {
    label: "Consultations",
    value: 12,
    change: "+3",
    color: "text-blue-600",
  },
  {
    label: "Medications",
    value: 3,
    change: "0",
    color: "text-purple-600",
  },
]

export default function DashboardPage() {
  const { user, signOut, loading: authLoading } = useAuth()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // Ensure component is mounted on client side
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSignOut = () => {
    signOut()
    router.push("/")
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
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                HealthBot AI
              </span>
            </Link>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
                      <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name?.split(" ")[0] || "User"}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Here's your health overview for today.</p>
        </motion.div>

        {/* Health Metrics */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {healthMetrics.map((metric, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.label}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                    </div>
                    <div className={`text-sm font-medium ${metric.color}`}>{metric.change}</div>
                  </div>
                  {metric.label === "Health Score" && <Progress value={metric.value} className="mt-3" />}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Get started with your health management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Link key={index} href={action.href}>
                      <motion.div
                        className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 cursor-pointer group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                          >
                            <action.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{action.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest health interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        {activity.type === "chat" && <MessageCircle className="w-4 h-4" />}
                        {activity.type === "symptom" && <Activity className="w-4 h-4" />}
                        {activity.type === "medication" && <Pill className="w-4 h-4" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{activity.time}</p>
                      </div>
                      <Badge variant={activity.status === "completed" ? "default" : "secondary"} className="text-xs">
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Emergency Notice */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                <div>
                  <h3 className="font-semibold text-red-800 dark:text-red-200">Medical Emergency?</h3>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    For immediate medical attention, call 911 or go to your nearest emergency room. This AI assistant is
                    not a substitute for professional medical care.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
