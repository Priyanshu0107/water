"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SystemData {
  storagePreference: string
  budgetRange: string
  maintenancePreference: string
}

interface SystemPreferencesFormProps {
  onDataChange: (data: SystemData) => void
  initialData?: SystemData | null
}

export default function SystemPreferencesForm({ onDataChange, initialData }: SystemPreferencesFormProps) {
  const [formData, setFormData] = useState({
    storagePreference: initialData?.storagePreference || "",
    budgetRange: initialData?.budgetRange || "",
    maintenancePreference: initialData?.maintenancePreference || "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Update parent component when data changes
  useEffect(() => {
    if (formData.storagePreference && formData.budgetRange && formData.maintenancePreference) {
      const systemData: SystemData = {
        storagePreference: formData.storagePreference,
        budgetRange: formData.budgetRange,
        maintenancePreference: formData.maintenancePreference,
      }
      onDataChange(systemData)
    }
  }, [formData, onDataChange])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <Label htmlFor="storagePreference">Storage System Preference</Label>
          <Select
            value={formData.storagePreference}
            onValueChange={(value) => handleInputChange("storagePreference", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select storage preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="underground_sump">Underground Sump (High capacity, space-saving)</SelectItem>
              <SelectItem value="overhead_tank">Overhead Tank (Gravity-fed distribution)</SelectItem>
              <SelectItem value="ground_level_tank">Ground Level Tank (Easy maintenance)</SelectItem>
              <SelectItem value="modular_tanks">Modular Tank System (Flexible capacity)</SelectItem>
              <SelectItem value="mixed_system">Mixed System (Multiple storage types)</SelectItem>
              <SelectItem value="no_preference">No Preference (Recommend best option)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Choose based on available space, building structure, and distribution needs
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budgetRange">Budget Range (INR)</Label>
          <Select value={formData.budgetRange} onValueChange={(value) => handleInputChange("budgetRange", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="budget_basic">Basic System (₹50,000 - ₹1,50,000)</SelectItem>
              <SelectItem value="budget_standard">Standard System (₹1,50,000 - ₹3,00,000)</SelectItem>
              <SelectItem value="budget_premium">Premium System (₹3,00,000 - ₹5,00,000)</SelectItem>
              <SelectItem value="budget_luxury">Luxury System (₹5,00,000+)</SelectItem>
              <SelectItem value="budget_flexible">Flexible (Recommend optimal solution)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Includes all components: catchment, storage, filtration, and distribution
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maintenancePreference">Maintenance Preference</Label>
          <Select
            value={formData.maintenancePreference}
            onValueChange={(value) => handleInputChange("maintenancePreference", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select maintenance preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low_maintenance">Low Maintenance (Minimal upkeep, higher initial cost)</SelectItem>
              <SelectItem value="moderate_maintenance">Moderate Maintenance (Balanced approach)</SelectItem>
              <SelectItem value="high_maintenance">High Maintenance (Lower cost, regular upkeep)</SelectItem>
              <SelectItem value="professional_service">Professional Service (Outsourced maintenance)</SelectItem>
              <SelectItem value="diy_friendly">DIY Friendly (Self-maintainable system)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Affects system design, component selection, and long-term costs
          </p>
        </div>
      </div>

      {/* Budget Breakdown Information */}
      <div className="p-4 bg-muted/50 rounded-lg">
        <h4 className="font-medium mb-2">Typical System Components & Costs</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Basic System (₹50K-₹1.5L):</strong>
            <ul className="text-muted-foreground mt-1 space-y-1">
              <li>• Simple catchment system</li>
              <li>• Plastic storage tanks (1000-5000L)</li>
              <li>• Basic filtration</li>
              <li>• Manual distribution</li>
            </ul>
          </div>
          <div>
            <strong>Premium System (₹3L-₹5L+):</strong>
            <ul className="text-muted-foreground mt-1 space-y-1">
              <li>• Advanced catchment with first-flush</li>
              <li>• Large concrete/underground storage</li>
              <li>• Multi-stage filtration + UV</li>
              <li>• Automated pumping system</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Maintenance Information */}
      <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
        <h4 className="font-medium text-primary mb-2">Maintenance Considerations</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Low Maintenance Systems:</strong>
            <ul className="text-muted-foreground mt-1 space-y-1">
              <li>• Self-cleaning filters</li>
              <li>• Automated controls</li>
              <li>• Corrosion-resistant materials</li>
              <li>• Annual professional service</li>
            </ul>
          </div>
          <div>
            <strong>Regular Maintenance Tasks:</strong>
            <ul className="text-muted-foreground mt-1 space-y-1">
              <li>• Monthly: Tank cleaning, filter check</li>
              <li>• Quarterly: Pump maintenance</li>
              <li>• Annually: System inspection</li>
              <li>• As needed: Component replacement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
