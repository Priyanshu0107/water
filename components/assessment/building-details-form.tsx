"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BuildingData {
  buildingType: string
  roofArea: number
  roofMaterial: string
  roofSlope: number
  numberOfFloors: number
  buildingAge: number
}

interface BuildingDetailsFormProps {
  onDataChange: (data: BuildingData) => void
  initialData?: BuildingData | null
}

export default function BuildingDetailsForm({ onDataChange, initialData }: BuildingDetailsFormProps) {
  const [formData, setFormData] = useState({
    buildingType: initialData?.buildingType || "",
    roofArea: initialData?.roofArea?.toString() || "",
    roofMaterial: initialData?.roofMaterial || "",
    roofSlope: initialData?.roofSlope?.toString() || "",
    numberOfFloors: initialData?.numberOfFloors?.toString() || "",
    buildingAge: initialData?.buildingAge?.toString() || "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Update parent component when data changes
  useEffect(() => {
    if (
      formData.buildingType &&
      formData.roofArea &&
      formData.roofMaterial &&
      formData.roofSlope &&
      formData.numberOfFloors &&
      formData.buildingAge
    ) {
      const buildingData: BuildingData = {
        buildingType: formData.buildingType,
        roofArea: Number.parseFloat(formData.roofArea),
        roofMaterial: formData.roofMaterial,
        roofSlope: Number.parseFloat(formData.roofSlope),
        numberOfFloors: Number.parseInt(formData.numberOfFloors),
        buildingAge: Number.parseInt(formData.buildingAge),
      }
      onDataChange(buildingData)
    }
  }, [formData, onDataChange])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="buildingType">Building Type</Label>
          <Select value={formData.buildingType} onValueChange={(value) => handleInputChange("buildingType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select building type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residential_individual">Individual Residential</SelectItem>
              <SelectItem value="residential_apartment">Apartment Complex</SelectItem>
              <SelectItem value="commercial_office">Commercial Office</SelectItem>
              <SelectItem value="commercial_retail">Retail Building</SelectItem>
              <SelectItem value="industrial_warehouse">Industrial Warehouse</SelectItem>
              <SelectItem value="institutional_school">Educational Institution</SelectItem>
              <SelectItem value="institutional_hospital">Healthcare Facility</SelectItem>
              <SelectItem value="mixed_use">Mixed Use Building</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="roofArea">Roof Area (sq. meters)</Label>
          <Input
            id="roofArea"
            type="number"
            placeholder="e.g., 150"
            value={formData.roofArea}
            onChange={(e) => handleInputChange("roofArea", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Total catchment area of the roof</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="roofMaterial">Roof Material</Label>
          <Select value={formData.roofMaterial} onValueChange={(value) => handleInputChange("roofMaterial", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select roof material" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="concrete_rcc">RCC Concrete</SelectItem>
              <SelectItem value="concrete_precast">Precast Concrete</SelectItem>
              <SelectItem value="metal_corrugated">Corrugated Metal Sheet</SelectItem>
              <SelectItem value="metal_standing_seam">Standing Seam Metal</SelectItem>
              <SelectItem value="tile_clay">Clay Tiles</SelectItem>
              <SelectItem value="tile_concrete">Concrete Tiles</SelectItem>
              <SelectItem value="asbestos_sheet">Asbestos Sheet</SelectItem>
              <SelectItem value="membrane_epdm">EPDM Membrane</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="roofSlope">Roof Slope (degrees)</Label>
          <Input
            id="roofSlope"
            type="number"
            step="0.1"
            placeholder="e.g., 15"
            value={formData.roofSlope}
            onChange={(e) => handleInputChange("roofSlope", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Angle of roof slope (0° = flat, 45° = steep)</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="numberOfFloors">Number of Floors</Label>
          <Input
            id="numberOfFloors"
            type="number"
            placeholder="e.g., 3"
            value={formData.numberOfFloors}
            onChange={(e) => handleInputChange("numberOfFloors", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="buildingAge">Building Age (years)</Label>
          <Input
            id="buildingAge"
            type="number"
            placeholder="e.g., 5"
            value={formData.buildingAge}
            onChange={(e) => handleInputChange("buildingAge", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Age affects maintenance requirements and system design</p>
        </div>
      </div>

      {/* Roof Area Calculator Helper */}
      <div className="p-4 bg-muted/50 rounded-lg">
        <h4 className="font-medium mb-2">Need help calculating roof area?</h4>
        <p className="text-sm text-muted-foreground mb-3">
          For rectangular roofs: Length × Width. For complex shapes, break into sections and add them up.
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Typical Areas:</strong>
            <ul className="text-muted-foreground mt-1 space-y-1">
              <li>• Small house: 80-120 sq.m</li>
              <li>• Medium house: 120-200 sq.m</li>
              <li>• Large house: 200-400 sq.m</li>
            </ul>
          </div>
          <div>
            <strong>Commercial:</strong>
            <ul className="text-muted-foreground mt-1 space-y-1">
              <li>• Small office: 200-500 sq.m</li>
              <li>• Warehouse: 1000+ sq.m</li>
              <li>• Apartment complex: 500-2000 sq.m</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
