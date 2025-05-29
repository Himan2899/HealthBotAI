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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, Heart, Pill, Plus, Search, Clock, AlertTriangle, Info, Calendar, Trash2, Edit } from "lucide-react"
import Link from "next/link"

const medicationDatabase = [
  {
    name: "Acetaminophen",
    genericName: "Acetaminophen",
    brandNames: ["Tylenol", "Panadol"],
    category: "Pain Reliever",
    description: "Used to treat pain and reduce fever",
    dosage: "500-1000mg every 4-6 hours",
    maxDaily: "4000mg",
    sideEffects: ["Nausea", "Stomach upset", "Liver damage (with overdose)"],
    interactions: ["Warfarin", "Alcohol"],
    warnings: ["Do not exceed maximum daily dose", "Avoid alcohol while taking"],
  },
  {
    name: "Ibuprofen",
    genericName: "Ibuprofen",
    brandNames: ["Advil", "Motrin"],
    category: "NSAID",
    description: "Anti-inflammatory pain reliever",
    dosage: "200-400mg every 4-6 hours",
    maxDaily: "1200mg",
    sideEffects: ["Stomach irritation", "Dizziness", "Headache"],
    interactions: ["Blood thinners", "ACE inhibitors"],
    warnings: ["Take with food", "May increase bleeding risk"],
  },
  {
    name: "Aspirin",
    genericName: "Acetylsalicylic Acid",
    brandNames: ["Bayer", "Bufferin"],
    category: "NSAID",
    description: "Pain reliever and blood thinner",
    dosage: "325-650mg every 4 hours",
    maxDaily: "4000mg",
    sideEffects: ["Stomach bleeding", "Ringing in ears", "Nausea"],
    interactions: ["Warfarin", "Methotrexate"],
    warnings: ["Not for children under 16", "May cause stomach bleeding"],
  },
]

const userMedications = [
  {
    id: 1,
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    timeOfDay: "Morning",
    startDate: "2024-01-15",
    prescribedBy: "Dr. Smith",
    purpose: "Blood pressure control",
    nextDose: "Tomorrow 8:00 AM",
  },
  {
    id: 2,
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    timeOfDay: "With meals",
    startDate: "2024-02-01",
    prescribedBy: "Dr. Johnson",
    purpose: "Diabetes management",
    nextDose: "Today 6:00 PM",
  },
]

export default function MedicationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMedication, setSelectedMedication] = useState<any>(null)
  const [isAddingMedication, setIsAddingMedication] = useState(false)
  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    frequency: "",
    timeOfDay: "",
    prescribedBy: "",
    purpose: "",
  })

  const filteredMedications = medicationDatabase.filter(
    (med) =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.brandNames.some((brand) => brand.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleAddMedication = () => {
    // In a real app, this would save to the database
    console.log("Adding medication:", newMedication)
    setIsAddingMedication(false)
    setNewMedication({
      name: "",
      dosage: "",
      frequency: "",
      timeOfDay: "",
      prescribedBy: "",
      purpose: "",
    })
  }

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Medication Management</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your medications and explore our comprehensive drug database
          </p>
        </motion.div>

        {/* Warning Alert */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Alert className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20">
            <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            <AlertDescription className="text-orange-800 dark:text-orange-200">
              <strong>Important:</strong> This information is for educational purposes only. Always consult your
              healthcare provider before starting, stopping, or changing medications.
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="my-medications" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="my-medications">My Medications</TabsTrigger>
              <TabsTrigger value="drug-database">Drug Database</TabsTrigger>
            </TabsList>

            <TabsContent value="my-medications" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Your Current Medications</h2>
                <Dialog open={isAddingMedication} onOpenChange={setIsAddingMedication}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Medication
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Medication</DialogTitle>
                      <DialogDescription>
                        Enter the details of your new medication. Always consult your healthcare provider.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="med-name">Medication Name</Label>
                        <Input
                          id="med-name"
                          value={newMedication.name}
                          onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                          placeholder="Enter medication name"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="dosage">Dosage</Label>
                          <Input
                            id="dosage"
                            value={newMedication.dosage}
                            onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
                            placeholder="e.g., 10mg"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="frequency">Frequency</Label>
                          <Select
                            value={newMedication.frequency}
                            onValueChange={(value) => setNewMedication({ ...newMedication, frequency: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="once-daily">Once daily</SelectItem>
                              <SelectItem value="twice-daily">Twice daily</SelectItem>
                              <SelectItem value="three-times-daily">Three times daily</SelectItem>
                              <SelectItem value="four-times-daily">Four times daily</SelectItem>
                              <SelectItem value="as-needed">As needed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time-of-day">Time of Day</Label>
                        <Input
                          id="time-of-day"
                          value={newMedication.timeOfDay}
                          onChange={(e) => setNewMedication({ ...newMedication, timeOfDay: e.target.value })}
                          placeholder="e.g., Morning, With meals"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="prescribed-by">Prescribed By</Label>
                        <Input
                          id="prescribed-by"
                          value={newMedication.prescribedBy}
                          onChange={(e) => setNewMedication({ ...newMedication, prescribedBy: e.target.value })}
                          placeholder="Doctor's name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="purpose">Purpose</Label>
                        <Textarea
                          id="purpose"
                          value={newMedication.purpose}
                          onChange={(e) => setNewMedication({ ...newMedication, purpose: e.target.value })}
                          placeholder="What is this medication for?"
                          rows={3}
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsAddingMedication(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddMedication}>Add Medication</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userMedications.map((medication) => (
                  <Card key={medication.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <Pill className="w-5 h-5 text-blue-600" />
                            <span>{medication.name}</span>
                          </CardTitle>
                          <CardDescription>{medication.purpose}</CardDescription>
                        </div>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <Label className="text-xs text-gray-600 dark:text-gray-400">Dosage</Label>
                          <p className="font-medium">{medication.dosage}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600 dark:text-gray-400">Frequency</Label>
                          <p className="font-medium">{medication.frequency}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600 dark:text-gray-400">Time</Label>
                          <p className="font-medium">{medication.timeOfDay}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600 dark:text-gray-400">Prescribed By</Label>
                          <p className="font-medium">{medication.prescribedBy}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="w-4 h-4 text-green-600" />
                        <span className="text-green-600 font-medium">Next dose: {medication.nextDose}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-600">Started: {medication.startDate}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="drug-database" className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search medications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMedications.map((medication, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedMedication(medication)}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Pill className="w-5 h-5 text-purple-600" />
                        <span>{medication.name}</span>
                      </CardTitle>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="secondary">{medication.category}</Badge>
                        {medication.brandNames.slice(0, 2).map((brand) => (
                          <Badge key={brand} variant="outline" className="text-xs">
                            {brand}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{medication.description}</p>
                      <div className="space-y-2 text-sm">
                        <div>
                          <Label className="text-xs text-gray-600 dark:text-gray-400">Typical Dosage</Label>
                          <p className="font-medium">{medication.dosage}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600 dark:text-gray-400">Max Daily</Label>
                          <p className="font-medium">{medication.maxDaily}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Medication Detail Dialog */}
              <Dialog open={!!selectedMedication} onOpenChange={() => setSelectedMedication(null)}>
                <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                  {selectedMedication && (
                    <>
                      <DialogHeader>
                        <DialogTitle className="flex items-center space-x-2">
                          <Pill className="w-6 h-6 text-purple-600" />
                          <span>{selectedMedication.name}</span>
                        </DialogTitle>
                        <DialogDescription>{selectedMedication.description}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold mb-2">Brand Names</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedMedication.brandNames.map((brand: string) => (
                              <Badge key={brand} variant="outline">
                                {brand}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Dosage Information</h4>
                            <div className="space-y-2 text-sm">
                              <div>
                                <Label className="text-xs text-gray-600 dark:text-gray-400">Typical Dosage</Label>
                                <p>{selectedMedication.dosage}</p>
                              </div>
                              <div>
                                <Label className="text-xs text-gray-600 dark:text-gray-400">Maximum Daily</Label>
                                <p>{selectedMedication.maxDaily}</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Category</h4>
                            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                              {selectedMedication.category}
                            </Badge>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Side Effects</h4>
                          <ul className="space-y-1">
                            {selectedMedication.sideEffects.map((effect: string, index: number) => (
                              <li key={index} className="flex items-start space-x-2 text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                                <span>{effect}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Drug Interactions</h4>
                          <ul className="space-y-1">
                            {selectedMedication.interactions.map((interaction: string, index: number) => (
                              <li key={index} className="flex items-start space-x-2 text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                                <span>{interaction}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Warnings</h4>
                          <ul className="space-y-1">
                            {selectedMedication.warnings.map((warning: string, index: number) => (
                              <li key={index} className="flex items-start space-x-2 text-sm">
                                <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <span>{warning}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20">
                          <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          <AlertDescription className="text-blue-800 dark:text-blue-200">
                            This information is for educational purposes only. Always consult your healthcare provider
                            before taking any medication.
                          </AlertDescription>
                        </Alert>
                      </div>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
