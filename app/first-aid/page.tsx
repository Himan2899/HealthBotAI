"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Heart,
  Search,
  AlertTriangle,
  LigatureIcon as Bandage,
  Thermometer,
  Droplets,
  Zap,
  Shield,
  Phone,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

const firstAidGuides = [
  {
    id: "cuts-wounds",
    title: "Cuts & Wounds",
    category: "Injury",
    severity: "Minor to Moderate",
    icon: Bandage,
    color: "from-red-500 to-pink-500",
    steps: [
      "Clean your hands with soap and water",
      "Stop the bleeding by applying direct pressure",
      "Clean the wound gently with water",
      "Apply antibiotic ointment if available",
      "Cover with a sterile bandage",
      "Change bandage daily and keep wound clean",
    ],
    warnings: ["Seek medical attention if bleeding won't stop", "Watch for signs of infection"],
    supplies: ["Clean cloth or gauze", "Bandages", "Antibiotic ointment", "Soap and water"],
  },
  {
    id: "burns",
    title: "Burns",
    category: "Injury",
    severity: "Minor to Severe",
    icon: Thermometer,
    color: "from-orange-500 to-red-500",
    steps: [
      "Remove from heat source immediately",
      "Cool the burn with cool (not cold) water for 10-20 minutes",
      "Remove jewelry or tight clothing before swelling",
      "Do not break blisters",
      "Apply a loose, sterile bandage",
      "Take over-the-counter pain medication if needed",
    ],
    warnings: ["Call 911 for severe burns", "Don't use ice, butter, or oils"],
    supplies: ["Cool water", "Sterile gauze", "Loose bandages", "Pain medication"],
  },
  {
    id: "choking",
    title: "Choking",
    category: "Emergency",
    severity: "Severe",
    icon: AlertTriangle,
    color: "from-red-600 to-red-800",
    steps: [
      "Ask 'Are you choking?' If they can't speak, act immediately",
      "Stand behind the person and wrap arms around waist",
      "Make a fist with one hand, place above navel",
      "Grasp fist with other hand and thrust upward and inward",
      "Repeat until object is expelled or person becomes unconscious",
      "If unconscious, call 911 and begin CPR",
    ],
    warnings: ["Call 911 immediately", "If pregnant or obese, use chest thrusts"],
    supplies: ["No supplies needed - use hands only"],
  },
  {
    id: "sprains",
    title: "Sprains & Strains",
    category: "Injury",
    severity: "Minor to Moderate",
    icon: Zap,
    color: "from-blue-500 to-purple-500",
    steps: [
      "Rest the injured area immediately",
      "Apply ice for 15-20 minutes every 2-3 hours",
      "Compress with elastic bandage (not too tight)",
      "Elevate the injured area above heart level if possible",
      "Take anti-inflammatory medication as directed",
      "Gradually return to activity as pain allows",
    ],
    warnings: ["See doctor if severe pain or inability to bear weight"],
    supplies: ["Ice pack", "Elastic bandage", "Pillow for elevation", "Anti-inflammatory medication"],
  },
  {
    id: "nosebleed",
    title: "Nosebleeds",
    category: "Common",
    severity: "Minor",
    icon: Droplets,
    color: "from-pink-500 to-red-500",
    steps: [
      "Sit upright and lean slightly forward",
      "Pinch the soft part of nose firmly",
      "Hold for 10-15 minutes without checking",
      "Breathe through your mouth",
      "Apply ice to bridge of nose if available",
      "Avoid blowing nose for several hours",
    ],
    warnings: ["Seek medical help if bleeding doesn't stop after 20 minutes"],
    supplies: ["Tissues", "Ice pack", "Clean cloth"],
  },
  {
    id: "allergic-reaction",
    title: "Allergic Reactions",
    category: "Emergency",
    severity: "Mild to Severe",
    icon: Shield,
    color: "from-yellow-500 to-orange-500",
    steps: [
      "Remove or avoid the allergen if known",
      "For mild reactions, take antihistamine",
      "Apply cool compresses to affected skin",
      "For severe reactions (anaphylaxis), use EpiPen if available",
      "Call 911 immediately for severe reactions",
      "Monitor breathing and consciousness",
    ],
    warnings: ["Call 911 for difficulty breathing, swelling, or severe symptoms"],
    supplies: ["Antihistamine", "EpiPen (if prescribed)", "Cool compress"],
  },
]

export default function FirstAidPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGuide, setSelectedGuide] = useState<any>(null)

  const filteredGuides = firstAidGuides.filter(
    (guide) =>
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  First Aid Guide
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">First Aid Guide</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Step-by-step instructions for common medical emergencies and injuries
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
              <div className="flex items-center justify-between">
                <div>
                  <strong>Emergency:</strong> For life-threatening situations, call 911 immediately. First aid is not a
                  substitute for professional medical care.
                </div>
                <Button
                  onClick={() => (window.location.href = "tel:911")}
                  className="bg-red-600 hover:bg-red-700 text-white ml-4"
                  size="sm"
                >
                  <Phone className="w-4 h-4 mr-1" />
                  911
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Search */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search first aid guides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* First Aid Guides */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {!selectedGuide ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide) => (
                <Card
                  key={guide.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedGuide(guide)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-r ${guide.color} flex items-center justify-center`}
                      >
                        <guide.icon className="w-5 h-5 text-white" />
                      </div>
                      <span>{guide.title}</span>
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Badge variant="secondary">{guide.category}</Badge>
                      <Badge
                        variant={
                          guide.severity.includes("Severe")
                            ? "destructive"
                            : guide.severity.includes("Moderate")
                              ? "default"
                              : "secondary"
                        }
                      >
                        {guide.severity}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Click to view detailed step-by-step instructions for treating {guide.title.toLowerCase()}.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-r ${selectedGuide.color} flex items-center justify-center`}
                    >
                      <selectedGuide.icon className="w-5 h-5 text-white" />
                    </div>
                    <span>{selectedGuide.title}</span>
                  </CardTitle>
                  <Button variant="outline" onClick={() => setSelectedGuide(null)}>
                    Back to Guides
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Badge variant="secondary">{selectedGuide.category}</Badge>
                  <Badge
                    variant={
                      selectedGuide.severity.includes("Severe")
                        ? "destructive"
                        : selectedGuide.severity.includes("Moderate")
                          ? "default"
                          : "secondary"
                    }
                  >
                    {selectedGuide.severity}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <Tabs defaultValue="steps" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="steps">Steps</TabsTrigger>
                    <TabsTrigger value="supplies">Supplies</TabsTrigger>
                    <TabsTrigger value="warnings">Warnings</TabsTrigger>
                  </TabsList>

                  <TabsContent value="steps" className="space-y-4">
                    <h3 className="text-lg font-semibold mb-4">Step-by-Step Instructions</h3>
                    <div className="space-y-4">
                      {selectedGuide.steps.map((step: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold text-green-600 dark:text-green-400">{index + 1}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">{step}</p>
                          </div>
                          <CheckCircle className="w-5 h-5 text-gray-300" />
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="supplies" className="space-y-4">
                    <h3 className="text-lg font-semibold mb-4">Required Supplies</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedGuide.supplies.map((supply: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          <span className="text-sm">{supply}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="warnings" className="space-y-4">
                    <h3 className="text-lg font-semibold mb-4">Important Warnings</h3>
                    <div className="space-y-3">
                      {selectedGuide.warnings.map((warning: string, index: number) => (
                        <Alert
                          key={index}
                          className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20"
                        >
                          <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                          <AlertDescription className="text-orange-800 dark:text-orange-200">
                            {warning}
                          </AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>

                {selectedGuide.severity.includes("Severe") && (
                  <Alert className="mt-6 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                    <Phone className="h-4 w-4 text-red-600 dark:text-red-400" />
                    <AlertDescription className="text-red-800 dark:text-red-200">
                      <strong>Remember:</strong> This is a severe condition. Call 911 immediately and perform first aid
                      while waiting for emergency services.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  )
}
