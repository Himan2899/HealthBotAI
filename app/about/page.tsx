"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  ArrowLeft,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Calendar,
  Code,
  Stethoscope,
  Brain,
  Users,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/components/auth-provider"
import Image from "next/image"
import { ReactNode, ReactElement } from "react"
import { BadgeProps } from "@/components/ui/badge"

interface Achievement {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  year: string
}

interface Skill {
  name: string
  level: number
  color: string
}

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

const skills: Skill[] = [
  { name: "Programming (C++, Java, Python)", level: 85, color: "from-blue-500 to-cyan-500" },
  { name: "Data Structures & Algorithms", level: 80, color: "from-green-500 to-emerald-500" },
  { name: "Software Development", level: 75, color: "from-purple-500 to-pink-500" },
  { name: "Problem Solving", level: 90, color: "from-orange-500 to-red-500" },
]

const achievements: Achievement[] = [
  {
    icon: Code,
    title: "HealthBot AI Project",
    description: "Developed an AI-powered healthcare chatbot using Next.js and modern web technologies",
    year: "2024",
  },
  {
    icon: Brain,
    title: "Academic Excellence",
    description: "Maintaining strong academic performance in Computer Science Engineering",
    year: "2024",
  },
  {
    icon: Users,
    title: "Tech Enthusiast",
    description: "Actively learning and implementing new technologies and frameworks",
    year: "2024",
  },
]

export default function AboutCreatorPage(): ReactElement {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  HealthBot AI
                </span>
              </div>
            </motion.div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {user && (
                <Link href="/dashboard">
                  <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                    Dashboard
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="default" className="mb-4 bg-gradient-to-r from-green-100 to-blue-100 text-green-800 dark:from-green-900 dark:to-blue-900 dark:text-green-200">
              <Brain className="w-3 h-3 mr-1" />
              Meet the Creator
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                About the Creator
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Passionate about revolutionizing healthcare through AI and technology innovation.
            </p>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="overflow-hidden border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-2xl">
              <CardContent className="p-0">
                <div className="relative">
                  {/* Background Pattern */}
                  <div className="h-32 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                      <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                      <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                    </div>
                  </div>

                  {/* Profile Photo */}
                  <div className="absolute -bottom-16 left-8">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-gradient-to-r from-green-400 to-blue-400 shadow-xl">
                        <Image
                          src="/images/creator-profile.png"
                          alt="Creator Profile"
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                        <Stethoscope className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="pt-20 p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold mb-2">Aspiring CS Engineer</h2>
                      <p className="text-xl text-blue-600 dark:text-blue-400 mb-4">
                        BTech Computer Science Student & Tech Innovator
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 mb-6">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          San Francisco, CA
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          BTech Student
                        </div>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                        🚀 Aspiring Computer Science Engineer | Passionate About Technology & Innovation 💡 I am
                        currently pursuing my Bachelor of Technology (BTech) in Computer Science Engineering, with a
                        strong passion for technology and problem-solving. My academic journey is equipping me with a
                        solid foundation in programming languages like C++, Java, and Python, as well as a growing
                        understanding of data structures, algorithms, and software development.
                      </p>

                      {/* Social Links */}
                      <div className="flex space-x-4">
                        <Button variant="outline" size="sm" className="flex items-center">
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center">
                          <Linkedin className="w-4 h-4 mr-2" />
                          LinkedIn
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Technical Expertise
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Core competencies in healthcare technology and AI development
            </p>
          </motion.div>

          <motion.div
            className="space-y-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {skills.map((skill, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <motion.div
                    className={`h-3 rounded-full bg-gradient-to-r ${skill.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Achievements & Recognition
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300">Milestones in healthcare technology innovation</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-1 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {achievements.map((achievement, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                        <achievement.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold">{achievement.title}</h3>
                          <Badge variant="secondary" className="text-sm">{achievement.year}</Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">{achievement.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-500 to-blue-500">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              "Learning today, innovating tomorrow - Technology for a better world."
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              As an aspiring Computer Science Engineer, I believe in using technology to solve real-world problems.
              HealthBot AI represents my commitment to making healthcare more accessible through innovative solutions.
              This is just the beginning of my journey in tech innovation.
            </p>
            <div className="flex justify-center">
              <Link href="/chat">
                <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
                  Try HealthBot AI
                  <Heart className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
