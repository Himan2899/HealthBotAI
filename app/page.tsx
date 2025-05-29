"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Shield,
  Zap,
  Brain,
  Clock,
  ArrowRight,
  Activity,
  Stethoscope,
  Pill,
  Phone,
  Chrome,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const features = [
  {
    icon: Brain,
    title: "AI-Powered Diagnosis",
    description: "Advanced machine learning algorithms analyze symptoms and provide accurate health insights.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Your health data is encrypted and protected with enterprise-grade security measures.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Get instant medical guidance anytime, anywhere with our round-the-clock AI assistant.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Stethoscope,
    title: "Professional Triage",
    description: "Smart triage system helps determine when to seek immediate professional medical care.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Pill,
    title: "Medication Database",
    description: "Comprehensive database of medications, dosages, and potential interactions.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Activity,
    title: "Health Monitoring",
    description: "Track symptoms, medications, and health trends with detailed analytics.",
    color: "from-teal-500 to-green-500",
  },
]

const stats = [
  { number: "50K+", label: "Active Users" },
  { number: "99.9%", label: "Uptime" },
  { number: "24/7", label: "Support" },
  { number: "500+", label: "Conditions" },
]

export default function HomePage() {
  const { user, signIn, loading: authLoading } = useAuth()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // Ensure component is mounted on client side
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSignIn = async () => {
    try {
      await signIn("google")
      router.push("/dashboard")
    } catch (error) {
      console.error("Sign in error:", error)
    }
  }

  // Show loading state while mounting
  if (!mounted) {
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
      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                HealthBot AI
              </span>
            </motion.div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {user ? (
                <Link href="/dashboard">
                  <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={handleSignIn}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  <Chrome className="w-4 h-4 mr-2" />
                  Sign In (Demo)
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-gradient-to-r from-green-100 to-blue-100 text-green-800 dark:from-green-900 dark:to-blue-900 dark:text-green-200">
              <Zap className="w-3 h-3 mr-1" />
              AI-Powered Healthcare
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Your Personal
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Health Assistant
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Get instant medical guidance, symptom analysis, and health insights powered by advanced AI technology.
              Your health, simplified and secure.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {user ? (
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 text-lg"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={handleSignIn}
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 text-lg"
                >
                  <Chrome className="mr-2 w-5 h-5" />
                  Start Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              )}
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                <Phone className="mr-2 w-5 h-5" />
                Emergency: 911
              </Button>
            </div>
          </motion.div>

          {/* Floating Medical Icons */}
          <div className="relative mt-16">
            <motion.div
              className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center animate-float"
              style={{ animationDelay: "0s" }}
            >
              <Heart className="w-8 h-8 text-white" />
            </motion.div>
            <motion.div
              className="absolute top-20 right-20 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center animate-float"
              style={{ animationDelay: "2s" }}
            >
              <Pill className="w-6 h-6 text-white" />
            </motion.div>
            <motion.div
              className="absolute bottom-10 left-1/4 w-14 h-14 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center animate-float"
              style={{ animationDelay: "4s" }}
            >
              <Stethoscope className="w-7 h-7 text-white" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div key={index} className="text-center" variants={fadeInUp}>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Advanced Healthcare Features
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Cutting-edge technology meets compassionate care to provide you with the best health assistance.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-500 to-blue-500">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Join thousands of users who trust HealthBot AI for their health needs.
            </p>
            {user ? (
              <Link href="/dashboard">
                <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <Button onClick={handleSignIn} size="lg" variant="secondary" className="px-8 py-4 text-lg">
                <Chrome className="mr-2 w-5 h-5" />
                Get Started (Demo)
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            )}
          </motion.div>
        </div>
      </section>

      {/* About Creator Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              About the Creator
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Meet the mind behind HealthBot AI
            </motion.p>
          </div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-8">
                {/* Profile Image */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="relative w-32 h-32 lg:w-40 lg:h-40">
                    <img
                      src="/images/creator-profile.png"
                      alt="Creator Profile"
                      className="w-full h-full rounded-full object-cover border-4 border-gradient-to-r from-blue-500 to-green-500 shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <div className="text-white text-xl">💻</div>
                    </div>
                  </div>
                </motion.div>

                {/* Profile Content */}
                <div className="flex-1 text-center lg:text-left">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      🚀 Himanshu Bali
                    </h3>
                    <p className="text-lg text-blue-600 dark:text-blue-400 mb-2 font-semibold">
                      Aspiring Computer Science Engineer
                    </p>
                    <p className="text-md text-gray-600 dark:text-gray-400 mb-4">
                      Passionate About Technology & Innovation 💡
                    </p>

                    <div className="text-gray-600 dark:text-gray-300 space-y-4 leading-relaxed">
                      <p>
                        I am currently pursuing my{" "}
                        <strong>Bachelor of Technology (BTech) in Computer Science Engineering</strong>, with a strong
                        passion for technology and problem-solving. My academic journey is equipping me with a solid
                        foundation in programming languages like <strong>C++, Java, and Python</strong>, as well as a
                        growing understanding of data structures, algorithms, and software development.
                      </p>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">C++</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Programming</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-green-600 dark:text-green-400">Java</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Development</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">Python</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">AI & ML</div>
                        </div>
                        <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">DSA</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Algorithms</div>
                        </div>
                      </div>
                    </div>

                    <motion.div
                      className="mt-6 flex flex-wrap justify-center lg:justify-start gap-3"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        🎓 BTech CSE Student
                      </Badge>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        💡 Innovation Enthusiast
                      </Badge>
                      <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                        💖 Healthcare Tech
                      </Badge>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* Quote Section */}
              <motion.div
                className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <blockquote className="text-lg italic text-gray-600 dark:text-gray-400">
                  "Learning today, innovating tomorrow. Technology should serve humanity, and I'm committed to building
                  solutions that make healthcare accessible to everyone."
                </blockquote>
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-500">
                  — Himanshu Bali, Creator of HealthBot AI
                </div>
                <div className="mt-2 text-sm text-blue-600 dark:text-blue-400">📧 himanshuofficialuserid@gmail.com</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">HealthBot AI</span>
              </div>
              <p className="text-gray-400">Advanced AI-powered healthcare assistance for everyone.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Symptom Analysis</li>
                <li>First Aid Guidance</li>
                <li>Medication Database</li>
                <li>Health Monitoring</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Emergency</h3>
              <p className="text-red-400 font-semibold">For medical emergencies, call 911 immediately.</p>
              <p className="text-gray-400 mt-2 text-sm">
                This AI assistant is not a substitute for professional medical advice.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HealthBot AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
