"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Heart,
  Activity,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  MessageCircle,
  Pill,
  Thermometer,
  BarChart3,
  Download,
  Share,
} from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

const healthData = [
  { date: "2024-01-01", bloodPressure: 120, heartRate: 72, weight: 70 },
  { date: "2024-01-15", bloodPressure: 118, heartRate: 75, weight: 69.5 },
  { date: "2024-02-01", bloodPressure: 122, heartRate: 70, weight: 69.8 },
  { date: "2024-02-15", bloodPressure: 119, heartRate: 73, weight: 69.2 },
  { date: "2024-03-01", bloodPressure: 121, heartRate: 71, weight: 69.0 },
  { date: "2024-03-15", bloodPressure: 117, heartRate: 74, weight: 68.8 },
]

const consultationHistory = [
  {
    id: 1,
    date: "2024-03-15",
    time: "10:30 AM",
    type: "AI Chat",
    symptoms: ["Headache", "Fatigue"],
    outcome: "Recommended rest and hydration",
    severity: "Mild",
    duration: "15 minutes",
  },
  {
    id: 2,
    date: "2024-03-10",
    time: "2:15 PM",
    type: "Symptom Check",
    symptoms: ["Cough", "Sore throat"],
    outcome: "Suggested monitoring symptoms",
    severity: "Mild",
    duration: "8 minutes",
  },
  {
    id: 3,
    date: "2024-03-05",
    time: "9:45 AM",
    type: "AI Chat",
    symptoms: ["Stomach pain", "Nausea"],
    outcome: "Recommended dietary changes",
    severity: "Moderate",
    duration: "22 minutes",
  },
]

const medicationHistory = [
  {
    name: "Lisinopril",
    startDate: "2024-01-15",
    endDate: null,
    dosage: "10mg",
    frequency: "Daily",
    adherence: 95,
    status: "Active",
  },
  {
    name: "Ibuprofen",
    startDate: "2024-03-10",
    endDate: "2024-03-15",
    dosage: "400mg",
    frequency: "As needed",
    adherence: 100,
    status: "Completed",
  },
  {
    name: "Vitamin D",
    startDate: "2024-02-01",
    endDate: null,
    dosage: "1000 IU",
    frequency: "Daily",
    adherence: 88,
    status: "Active",
  },
]

const healthMetrics = [
  {
    label: "Overall Health Score",
    value: 85,
    change: "+5%",
    trend: "up",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    label: "Consultation Frequency",
    value: 3,
    change: "+1",
    trend: "up",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    label: "Medication Adherence",
    value: 94,
    change: "-2%",
    trend: "down",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    label: "Symptom Severity",
    value: 2.1,
    change: "-0.3",
    trend: "down",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
]

export default function RecordsPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("3months")

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

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Health Records</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your health journey with comprehensive analytics and insights
          </p>
        </motion.div>

        {/* Health Metrics Overview */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {healthMetrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.label}</p>
                    <p className="text-2xl font-bold">
                      {metric.value}
                      {metric.label.includes("Score") || metric.label.includes("Adherence") ? "%" : ""}
                    </p>
                  </div>
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    {metric.trend === "up" ? (
                      <TrendingUp className={`w-5 h-5 ${metric.color}`} />
                    ) : (
                      <TrendingDown className={`w-5 h-5 ${metric.color}`} />
                    )}
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${metric.color}`}>{metric.change}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="consultations">Consultations</TabsTrigger>
              <TabsTrigger value="medications">Medications</TabsTrigger>
              <TabsTrigger value="vitals">Vitals</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Health Trends Chart */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      <span>Health Trends</span>
                    </CardTitle>
                    <CardDescription>Your health metrics over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={healthData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="bloodPressure"
                            stroke="#3b82f6"
                            fill="#3b82f6"
                            fillOpacity={0.1}
                            name="Blood Pressure"
                          />
                          <Area
                            type="monotone"
                            dataKey="heartRate"
                            stroke="#10b981"
                            fill="#10b981"
                            fillOpacity={0.1}
                            name="Heart Rate"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="w-5 h-5 text-green-600" />
                      <span>Recent Activity</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {consultationHistory.slice(0, 3).map((consultation) => (
                        <div key={consultation.id} className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                            <MessageCircle className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{consultation.type}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {consultation.date} • {consultation.duration}
                            </p>
                          </div>
                          <Badge
                            variant={consultation.severity === "Mild" ? "secondary" : "default"}
                            className="text-xs"
                          >
                            {consultation.severity}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Medication Adherence */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Pill className="w-5 h-5 text-purple-600" />
                      <span>Medication Adherence</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {medicationHistory
                        .filter((med) => med.status === "Active")
                        .map((medication, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">{medication.name}</span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">{medication.adherence}%</span>
                            </div>
                            <Progress value={medication.adherence} className="h-2" />
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="consultations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Consultation History</CardTitle>
                  <CardDescription>Your AI health consultations and symptom checks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {consultationHistory.map((consultation) => (
                      <div
                        key={consultation.id}
                        className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                              {consultation.type === "AI Chat" ? (
                                <MessageCircle className="w-5 h-5 text-blue-600" />
                              ) : (
                                <Activity className="w-5 h-5 text-green-600" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-medium">{consultation.type}</h4>
                                <Badge
                                  variant={
                                    consultation.severity === "Mild"
                                      ? "secondary"
                                      : consultation.severity === "Moderate"
                                        ? "default"
                                        : "destructive"
                                  }
                                  className="text-xs"
                                >
                                  {consultation.severity}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{consultation.date}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{consultation.time}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Thermometer className="w-4 h-4" />
                                  <span>{consultation.duration}</span>
                                </div>
                              </div>
                              <div className="mb-2">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Symptoms:</p>
                                <div className="flex flex-wrap gap-1">
                                  {consultation.symptoms.map((symptom, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {symptom}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                <strong>Outcome:</strong> {consultation.outcome}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="medications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Medication History</CardTitle>
                  <CardDescription>Track your medication usage and adherence over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {medicationHistory.map((medication, index) => (
                      <div key={index} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-medium flex items-center space-x-2">
                              <Pill className="w-4 h-4 text-purple-600" />
                              <span>{medication.name}</span>
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {medication.dosage} • {medication.frequency}
                            </p>
                          </div>
                          <Badge variant={medication.status === "Active" ? "default" : "secondary"} className="text-xs">
                            {medication.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Start Date</p>
                            <p className="text-sm font-medium">{medication.startDate}</p>
                          </div>
                          {medication.endDate && (
                            <div>
                              <p className="text-xs text-gray-600 dark:text-gray-400">End Date</p>
                              <p className="text-sm font-medium">{medication.endDate}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Adherence</p>
                            <p className="text-sm font-medium">{medication.adherence}%</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600 dark:text-gray-400">Adherence Rate</span>
                            <span className="text-xs font-medium">{medication.adherence}%</span>
                          </div>
                          <Progress value={medication.adherence} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vitals" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Vital Signs Tracking</CardTitle>
                  <CardDescription>Monitor your key health indicators over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={healthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="bloodPressure"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          name="Blood Pressure (mmHg)"
                        />
                        <Line
                          type="monotone"
                          dataKey="heartRate"
                          stroke="#10b981"
                          strokeWidth={2}
                          name="Heart Rate (bpm)"
                        />
                        <Line type="monotone" dataKey="weight" stroke="#f59e0b" strokeWidth={2} name="Weight (kg)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Heart className="w-4 h-4 text-red-500" />
                          <span className="text-sm font-medium">Blood Pressure</span>
                        </div>
                        <p className="text-2xl font-bold">119 mmHg</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Latest reading</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Activity className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium">Heart Rate</span>
                        </div>
                        <p className="text-2xl font-bold">74 bpm</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Latest reading</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <TrendingDown className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium">Weight</span>
                        </div>
                        <p className="text-2xl font-bold">68.8 kg</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Latest reading</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
