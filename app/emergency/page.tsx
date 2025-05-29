"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ArrowLeft,
  Heart,
  Phone,
  AlertTriangle,
  Clock,
  MapPin,
  Activity,
  Brain,
  Zap,
  Shield,
  Users,
  Stethoscope,
} from "lucide-react"
import Link from "next/link"

const emergencyContacts = [
  {
    name: "Emergency Services",
    number: "911",
    description: "Life-threatening emergencies",
    color: "bg-red-500",
    icon: Phone,
  },
  {
    name: "Poison Control",
    number: "1-800-222-1222",
    description: "Poisoning emergencies",
    color: "bg-purple-500",
    icon: Shield,
  },
  {
    name: "Crisis Text Line",
    number: "Text HOME to 741741",
    description: "Mental health crisis support",
    color: "bg-blue-500",
    icon: Brain,
  },
  {
    name: "National Suicide Prevention",
    number: "988",
    description: "Suicide prevention lifeline",
    color: "bg-green-500",
    icon: Heart,
  },
]

const emergencySymptoms = [
  {
    category: "Cardiac Emergency",
    symptoms: ["Chest pain", "Difficulty breathing", "Irregular heartbeat", "Severe dizziness"],
    icon: Heart,
    color: "from-red-500 to-pink-500",
  },
  {
    category: "Stroke (FAST)",
    symptoms: ["Face drooping", "Arm weakness", "Speech difficulty", "Time to call 911"],
    icon: Brain,
    color: "from-purple-500 to-indigo-500",
  },
  {
    category: "Severe Injury",
    symptoms: ["Severe bleeding", "Head injury", "Loss of consciousness", "Broken bones"],
    icon: Activity,
    color: "from-orange-500 to-red-500",
  },
  {
    category: "Allergic Reaction",
    symptoms: ["Difficulty breathing", "Swelling", "Severe rash", "Rapid pulse"],
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
  },
]

const firstAidSteps = [
  {
    title: "Check Responsiveness",
    description: "Tap shoulders and shout 'Are you okay?'",
    icon: Users,
  },
  {
    title: "Call for Help",
    description: "Call 911 immediately if unresponsive",
    icon: Phone,
  },
  {
    title: "Check Breathing",
    description: "Look for chest movement for 10 seconds",
    icon: Activity,
  },
  {
    title: "Begin CPR if Needed",
    description: "30 chest compressions, 2 rescue breaths",
    icon: Heart,
  },
]

export default function EmergencyPage() {
  const handleEmergencyCall = (number: string) => {
    if (number.includes("Text")) {
      // Handle text instructions
      alert("Text HOME to 741741 for crisis support")
    } else {
      window.location.href = `tel:${number.replace(/[^0-9]/g, "")}`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  Emergency Guide
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Emergency Medical Guide</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Quick access to emergency contacts and life-saving information
          </p>
        </motion.div>

        {/* Critical Alert */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Alert className="border-red-500 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <strong className="text-lg">MEDICAL EMERGENCY?</strong>
                  <p className="mt-1">
                    If someone is unconscious, not breathing, or in severe distress, call 911 immediately.
                  </p>
                </div>
                <Button
                  onClick={() => handleEmergencyCall("911")}
                  className="bg-red-600 hover:bg-red-700 text-white ml-4"
                  size="lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call 911
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Emergency Contacts */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-6">Emergency Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {emergencyContacts.map((contact, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleEmergencyCall(contact.number)}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-12 h-12 ${contact.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <contact.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{contact.name}</h3>
                  <p className="text-2xl font-bold text-blue-600 mb-2">{contact.number}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{contact.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Emergency Symptoms Recognition */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold mb-6">Recognize Emergency Symptoms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {emergencySymptoms.map((emergency, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-r ${emergency.color} flex items-center justify-center`}
                    >
                      <emergency.icon className="w-5 h-5 text-white" />
                    </div>
                    <span>{emergency.category}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {emergency.symptoms.map((symptom, symptomIndex) => (
                      <div key={symptomIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                        <span className="text-sm">{symptom}</span>
                      </div>
                    ))}
                  </div>
                  <Badge variant="destructive" className="mt-4">
                    Call 911 Immediately
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Basic First Aid */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Stethoscope className="w-6 h-6 text-green-600" />
                <span>Basic CPR Steps</span>
              </CardTitle>
              <CardDescription>
                Follow these steps if someone is unresponsive and not breathing normally
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {firstAidSteps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h4 className="font-semibold mb-2">
                      {index + 1}. {step.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                  </div>
                ))}
              </div>
              <Alert className="mt-6 border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
                <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                  <strong>Remember:</strong> Call 911 first, then begin CPR. Continue until emergency services arrive.
                  If available, use an AED (Automated External Defibrillator).
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </motion.div>

        {/* Location Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-6 h-6 text-blue-600" />
                <span>Find Nearest Hospital</span>
              </CardTitle>
              <CardDescription>Locate the nearest emergency room or urgent care facility</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={() => window.open("https://www.google.com/maps/search/hospital+near+me", "_blank")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Find Hospitals
                </Button>
                <Button
                  onClick={() => window.open("https://www.google.com/maps/search/urgent+care+near+me", "_blank")}
                  variant="outline"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Find Urgent Care
                </Button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                These links will open Google Maps to help you find the nearest medical facilities based on your current
                location.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
