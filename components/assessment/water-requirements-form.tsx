"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface WaterData {
  householdSize: number
  dailyWaterRequirement: number
  seasonalVariation: boolean
}

interface WaterRequirementsFormProps {
  onDataChange: (data: WaterData) => void
  initialData?: WaterData | null
}

export default function WaterRequirementsForm({ onDataChange, initialData }: WaterRequirementsFormProps) {
  const [formData, setFormData] = useState({
    householdSize: initialData?.householdSize?.toString() || "",
    dailyWaterRequirement: initialData?.dailyWaterRequirement?.toString() || "",
    seasonalVariation: initialData?.seasonalVariation || false,
    calculationMethod: "manual", // manual or automatic
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Auto-calculate water requirement based on household size
  const calculateWaterRequirement = (householdSize: number) => {
    // WHO recommendation: 50-100 liters per person per day for basic needs
    // Indian standard: 135 liters per person per day (including all uses)
    const litersPerPersonPerDay = 135
    return householdSize * litersPerPersonPerDay
  }

  // Update parent component when data changes
  useEffect(() => {
    if (formData.householdSize && formData.dailyWaterRequirement) {
      const waterData: WaterData = {
        householdSize: Number.parseInt(formData.householdSize),
        dailyWaterRequirement: Number.parseFloat(formData.dailyWaterRequirement),
        seasonalVariation: formData.seasonalVariation,
      }
      onDataChange(waterData)
    }
  }, [formData, onDataChange])

  // Auto-calculate when household size changes and auto mode is selected
  useEffect(() => {
    if (formData.calculationMethod === "automatic" && formData.householdSize) {
      const calculated = calculateWaterRequirement(Number.parseInt(formData.householdSize))
      setFormData((prev) => ({ ...prev, dailyWaterRequirement: calculated.toString() }))
    }
  }, [formData.householdSize, formData.calculationMethod])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="householdSize">Household Size</Label>
          <Input
            id="householdSize"
            type="number"
            placeholder="e.g., 4"
            value={formData.householdSize}
            onChange={(e) => handleInputChange("householdSize", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Number of people using the water system</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="calculationMethod">Water Requirement Calculation</Label>
          <Select
            value={formData.calculationMethod}
            onValueChange={(value) => handleInputChange("calculationMethod", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="automatic">Auto-calculate (135L per person/day)</SelectItem>
              <SelectItem value="manual">Enter manually</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="dailyWaterRequirement">Daily Water Requirement (liters)</Label>
          <Input
            id="dailyWaterRequirement"
            type="number"
            placeholder="e.g., 540"
            value={formData.dailyWaterRequirement}
            onChange={(e) => handleInputChange("dailyWaterRequirement", e.target.value)}
            disabled={formData.calculationMethod === "automatic"}
          />
          <p className="text-xs text-muted-foreground">
            {formData.calculationMethod === "automatic"
              ? "Automatically calculated based on household size (135L per person per day)"
              : "Total daily water consumption for all household needs"}
          </p>
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="seasonalVariation"
              checked={formData.seasonalVariation}
              onCheckedChange={(checked) => handleInputChange("seasonalVariation", checked as boolean)}
            />
            <Label htmlFor="seasonalVariation" className="text-sm">
              Account for seasonal variation in water usage
            </Label>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Check this if water usage varies significantly between seasons (e.g., higher usage in summer)
          </p>
        </div>
      </div>

      {/* Water Usage Guidelines */}
      <div className="p-4 bg-muted/50 rounded-lg">
        <h4 className="font-medium mb-2">Water Usage Guidelines</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Per Person Daily Usage:</strong>
            <ul className="text-muted-foreground mt-1 space-y-1">
              <li>• Drinking & Cooking: 10L</li>
              <li>• Bathing: 55L</li>
              <li>• Toilet flushing: 30L</li>
              <li>• Washing clothes: 20L</li>
              <li>• Cleaning: 10L</li>
              <li>• Garden/Other: 10L</li>
            </ul>
          </div>
          <div>
            <strong>Building Types:</strong>
            <ul className="text-muted-foreground mt-1 space-y-1">
              <li>• Residential: 135L/person/day</li>
              <li>• Office: 45L/person/day</li>
              <li>• School: 45L/student/day</li>
              <li>• Hospital: 340L/bed/day</li>
              <li>• Hotel: 200L/guest/day</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Calculation Summary */}
      {formData.householdSize && formData.dailyWaterRequirement && (
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <h4 className="font-medium text-primary mb-2">Water Requirement Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Daily Requirement:</span>
              <span className="font-medium ml-2">{formData.dailyWaterRequirement}L</span>
            </div>
            <div>
              <span className="text-muted-foreground">Monthly Requirement:</span>
              <span className="font-medium ml-2">
                {(Number.parseFloat(formData.dailyWaterRequirement) * 30).toLocaleString()}L
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Per Person/Day:</span>
              <span className="font-medium ml-2">
                {Math.round(
                  Number.parseFloat(formData.dailyWaterRequirement) / Number.parseInt(formData.householdSize),
                )}
                L
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Annual Requirement:</span>
              <span className="font-medium ml-2">
                {(Number.parseFloat(formData.dailyWaterRequirement) * 365).toLocaleString()}L
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
