"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Building, Droplets, Calculator, ArrowRight, ArrowLeft } from "lucide-react"
import LocationInput from "./location-input"
import BuildingDetailsForm from "./building-details-form"
import WaterRequirementsForm from "./water-requirements-form"
import SystemPreferencesForm from "./system-preferences-form"

interface AssessmentFormProps {
  userId: string
}

interface LocationData {
  name: string
  address: string
  latitude: number
  longitude: number
  district?: string
  state?: string
  country?: string
}

interface BuildingData {
  buildingType: string
  roofArea: number
  roofMaterial: string
  roofSlope: number
  numberOfFloors: number
  buildingAge: number
}

interface WaterData {
  householdSize: number
  dailyWaterRequirement: number
  seasonalVariation: boolean
}

interface SystemData {
  storagePreference: string
  budgetRange: string
  maintenancePreference: string
}

export default function AssessmentForm({ userId }: AssessmentFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Form data states
  const [locationData, setLocationData] = useState<LocationData | null>(null)
  const [buildingData, setBuildingData] = useState<BuildingData | null>(null)
  const [waterData, setWaterData] = useState<WaterData | null>(null)
  const [systemData, setSystemData] = useState<SystemData | null>(null)

  const steps = [
    { number: 1, title: "Location", icon: MapPin, description: "Project location and address" },
    { number: 2, title: "Building Details", icon: Building, description: "Roof and building specifications" },
    { number: 3, title: "Water Requirements", icon: Droplets, description: "Usage patterns and needs" },
    { number: 4, title: "System Preferences", icon: Calculator, description: "Budget and maintenance preferences" },
  ]

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!locationData || !buildingData || !waterData || !systemData) {
      setError("Please complete all steps before submitting")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      // First, create the location
      const { data: location, error: locationError } = await supabase
        .from("locations")
        .insert({
          user_id: userId,
          name: locationData.name,
          address: locationData.address,
          coordinates: `POINT(${locationData.longitude} ${locationData.latitude})`,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          district: locationData.district,
          state: locationData.state,
          country: locationData.country || "India",
        })
        .select()
        .single()

      if (locationError) throw locationError

      // Then create the assessment
      const { data: assessment, error: assessmentError } = await supabase
        .from("assessments")
        .insert({
          user_id: userId,
          location_id: location.id,
          assessment_type: "basic",
          status: "draft",
          building_type: buildingData.buildingType,
          roof_area: buildingData.roofArea,
          roof_material: buildingData.roofMaterial,
          roof_slope: buildingData.roofSlope,
          number_of_floors: buildingData.numberOfFloors,
          building_age: buildingData.buildingAge,
          household_size: waterData.householdSize,
          daily_water_requirement: waterData.dailyWaterRequirement,
          seasonal_variation: waterData.seasonalVariation,
          storage_preference: systemData.storagePreference,
          budget_range: systemData.budgetRange,
          maintenance_preference: systemData.maintenancePreference,
        })
        .select()
        .single()

      if (assessmentError) throw assessmentError

      // Redirect to the assessment results page
      router.push(`/assessment/${assessment.id}`)
    } catch (error: any) {
      setError(error.message || "An error occurred while creating the assessment")
    } finally {
      setIsLoading(false)
    }
  }

  const isStepComplete = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return locationData !== null
      case 2:
        return buildingData !== null
      case 3:
        return waterData !== null
      case 4:
        return systemData !== null
      default:
        return false
    }
  }

  const canProceed = () => {
    return isStepComplete(currentStep)
  }

  return (
    <div className="space-y-8">
      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep === step.number
                  ? "border-primary bg-primary text-primary-foreground"
                  : isStepComplete(step.number)
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground bg-background text-muted-foreground"
              }`}
            >
              {step.icon && <step.icon className="w-5 h-5" />}
            </div>
            <div className="ml-3 hidden sm:block">
              <p className={`text-sm font-medium ${currentStep === step.number ? "text-primary" : "text-foreground"}`}>
                {step.title}
              </p>
              <p className="text-xs text-muted-foreground">{step.description}</p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-12 h-0.5 mx-4 ${isStepComplete(step.number) ? "bg-primary" : "bg-muted-foreground/30"}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            \{steps[currentStep - 1].icon && <steps[currentStep - 1].icon className="w-6 h-6 text-primary" />}
            Step {currentStep}: {steps[currentStep - 1].title}
          </CardTitle>
          <CardDescription>{steps[currentStep - 1].description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStep === 1 && <LocationInput onLocationSelect={setLocationData} initialData={locationData} />}

          {currentStep === 2 && <BuildingDetailsForm onDataChange={setBuildingData} initialData={buildingData} />}

          {currentStep === 3 && <WaterRequirementsForm onDataChange={setWaterData} initialData={waterData} />}

          {currentStep === 4 && <SystemPreferencesForm onDataChange={setSystemData} initialData={systemData} />}

          {error && (
            <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-md">
              {error}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1} className="bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < steps.length ? (
              <Button onClick={handleNext} disabled={!canProceed()}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={!canProceed() || isLoading}>
                {isLoading ? "Creating Assessment..." : "Create Assessment"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
