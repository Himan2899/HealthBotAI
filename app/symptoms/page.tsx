"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Heart,
  AlertTriangle,
  Activity,
  Thermometer,
  Brain,
  Stethoscope,
  Clock,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"

const symptomCategories = [
  {
    name: "General",
    symptoms: ["Fever", "Fatigue", "Weight Loss", "Weight Gain", "Chills", "Night Sweats"],
    icon: Activity,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Pain",
    symptoms: ["Headache", "Back Pain", "Joint Pain", "Muscle Pain", "Chest Pain", "Abdominal Pain"],
    icon: AlertTriangle,
    color: "from-red-500 to-orange-500",
  },
  {
    name: "Respiratory",
    symptoms: ["Cough", "Shortness of Breath", "Wheezing", "Sore Throat", "Runny Nose", "Congestion"],
    icon: Stethoscope,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Digestive",
    symptoms: ["Nausea", "Vomiting", "Diarrhea", "Constipation", "Heartburn", "Loss of Appetite"],
    icon: Heart,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Neurological",
    symptoms: ["Dizziness", "Confusion", "Memory Loss", "Seizures", "Numbness", "Tingling"],
    icon: Brain,
    color: "from-indigo-500 to-purple-500",
  },
]

const severityLevels = [
  { value: "mild", label: "Mild", description: "Barely noticeable, doesn't interfere with daily activities" },
  { value: "moderate", label: "Moderate", description: "Noticeable but manageable, some interference with activities" },
  { value: "severe", label: "Severe", description: "Significant impact on daily activities" },
  { value: "critical", label: "Critical", description: "Debilitating, requires immediate attention" },
]

export default function SymptomsPage() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [severity, setSeverity] = useState("")
  const [duration, setDuration] = useState("")
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [currentStep, setCurrentStep] = useState(1)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms((prev) => (prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]))
  }

  const handleAnalyze = async () => {
    setIsAnalyzing(true)

    // Simulate analysis
    setTimeout(() => {
      setAnalysisResult({
        urgency: severity === "critical" ? "emergency" : severity === "severe" ? "urgent" : "routine",
        recommendations: [
          "Monitor symptoms closely",
          "Stay hydrated and rest",
          "Consider over-the-counter pain relief if appropriate",
          "Consult with a healthcare provider if symptoms worsen",
        ],
        possibleCauses: ["Viral infection", "Stress-related symptoms", "Dietary factors"],
        nextSteps:
          severity === "critical"
            ? "Seek immediate medical attention"
            : "Schedule appointment with primary care physician",
      })
      setIsAnalyzing(false)
    }, 3000)
  }

  const progressValue = (currentStep / 4) * 100

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
                  HealthBot AI
                </span>
              </div>
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Symptom Checker</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Help us understand your symptoms for personalized health guidance
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Step {currentStep} of 4</span>
          </div>
          <Progress value={progressValue} className="h-2" />
        </motion.div>

        {/* Emergency Alert */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
            <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              <strong>Emergency:</strong> If you're experiencing severe chest pain, difficulty breathing, loss of
              consciousness, or other life-threatening symptoms, call 911 immediately.
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Thermometer className="w-5 h-5 text-blue-600" />
                <span>Symptom Assessment</span>
              </CardTitle>
              <CardDescription>
                Please provide detailed information about your symptoms for accurate assessment
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          type="number"
                          placeholder="Enter your age"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select value={gender} onValueChange={setGender}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Select Your Symptoms</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {symptomCategories.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-8 h-8 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center`}
                            >
                              <category.icon className="w-4 h-4 text-white" />
                            </div>
                            <h4 className="font-medium">{category.name}</h4>
                          </div>
                          <div className="space-y-2">
                            {category.symptoms.map((symptom, symptomIndex) => (
                              <div key={symptomIndex} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`${category.name}-${symptom}`}
                                  checked={selectedSymptoms.includes(symptom)}
                                  onCheckedChange={() => handleSymptomToggle(symptom)}
                                />
                                <Label htmlFor={`${category.name}-${symptom}`} className="text-sm cursor-pointer">
                                  {symptom}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Symptom Details</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Severity Level</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {severityLevels.map((level) => (
                            <div
                              key={level.value}
                              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                                severity === level.value
                                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                              }`}
                              onClick={() => setSeverity(level.value)}
                            >
                              <div className="font-medium">{level.label}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">{level.description}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Select value={duration} onValueChange={setDuration}>
                          <SelectTrigger>
                            <SelectValue placeholder="How long have you had these symptoms?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="less-than-day">Less than a day</SelectItem>
                            <SelectItem value="1-3-days">1-3 days</SelectItem>
                            <SelectItem value="4-7-days">4-7 days</SelectItem>
                            <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                            <SelectItem value="more-than-2-weeks">More than 2 weeks</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="additional-info">Additional Information</Label>
                        <Textarea
                          id="additional-info"
                          placeholder="Describe any additional details about your symptoms, triggers, or concerns..."
                          value={additionalInfo}
                          onChange={(e) => setAdditionalInfo(e.target.value)}
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && !analysisResult && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Review Your Information</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Age</Label>
                          <p>{age || "Not specified"}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Gender</Label>
                          <p>{gender || "Not specified"}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Selected Symptoms
                        </Label>
                        <div className="flex flex-wrap gap-2">
                          {selectedSymptoms.map((symptom) => (
                            <Badge key={symptom} variant="secondary">
                              {symptom}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Severity</Label>
                          <p className="capitalize">{severity || "Not specified"}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Duration</Label>
                          <p>{duration || "Not specified"}</p>
                        </div>
                      </div>

                      {additionalInfo && (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Additional Information
                          </Label>
                          <p className="text-sm">{additionalInfo}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {analysisResult && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>

                    <div className="space-y-4">
                      <Alert
                        className={`${
                          analysisResult.urgency === "emergency"
                            ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                            : analysisResult.urgency === "urgent"
                              ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                              : "border-green-500 bg-green-50 dark:bg-green-900/20"
                        }`}
                      >
                        <AlertTriangle
                          className={`h-4 w-4 ${
                            analysisResult.urgency === "emergency"
                              ? "text-red-600"
                              : analysisResult.urgency === "urgent"
                                ? "text-orange-600"
                                : "text-green-600"
                          }`}
                        />
                        <AlertDescription
                          className={`${
                            analysisResult.urgency === "emergency"
                              ? "text-red-800 dark:text-red-200"
                              : analysisResult.urgency === "urgent"
                                ? "text-orange-800 dark:text-orange-200"
                                : "text-green-800 dark:text-green-200"
                          }`}
                        >
                          <strong>Urgency Level:</strong>{" "}
                          {analysisResult.urgency.charAt(0).toUpperCase() + analysisResult.urgency.slice(1)}
                          <br />
                          <strong>Next Steps:</strong> {analysisResult.nextSteps}
                        </AlertDescription>
                      </Alert>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Recommendations</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {analysisResult.recommendations.map((rec: string, index: number) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                                  <span className="text-sm">{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Possible Causes</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {analysisResult.possibleCauses.map((cause: string, index: number) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                                  <span className="text-sm">{cause}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                {currentStep > 1 && !analysisResult && (
                  <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                    Previous
                  </Button>
                )}

                <div className="ml-auto">
                  {currentStep < 4 ? (
                    <Button
                      onClick={() => setCurrentStep(currentStep + 1)}
                      disabled={
                        (currentStep === 1 && (!age || !gender)) ||
                        (currentStep === 2 && selectedSymptoms.length === 0) ||
                        (currentStep === 3 && (!severity || !duration))
                      }
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                    >
                      Next
                    </Button>
                  ) : !analysisResult ? (
                    <Button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                    >
                      {isAnalyzing ? (
                        <>
                          <Clock className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        "Analyze Symptoms"
                      )}
                    </Button>
                  ) : (
                    <div className="space-x-2">
                      <Link href="/chat">
                        <Button variant="outline">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Chat with AI
                        </Button>
                      </Link>
                      <Button
                        onClick={() => {
                          setCurrentStep(1)
                          setSelectedSymptoms([])
                          setSeverity("")
                          setDuration("")
                          setAdditionalInfo("")
                          setAge("")
                          setGender("")
                          setAnalysisResult(null)
                        }}
                        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                      >
                        New Assessment
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
