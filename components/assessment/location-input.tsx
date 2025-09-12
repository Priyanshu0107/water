"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MapPin, Search, Loader2 } from "lucide-react"

interface LocationData {
  name: string
  address: string
  latitude: number
  longitude: number
  district?: string
  state?: string
  country?: string
}

interface LocationInputProps {
  onLocationSelect: (location: LocationData) => void
  initialData?: LocationData | null
}

export default function LocationInput({ onLocationSelect, initialData }: LocationInputProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    address: initialData?.address || "",
    latitude: initialData?.latitude?.toString() || "",
    longitude: initialData?.longitude?.toString() || "",
    district: initialData?.district || "",
    state: initialData?.state || "",
  })
  const [isGeocoding, setIsGeocoding] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Mock geocoding function (in production, use Google Maps API or similar)
  const geocodeAddress = async (address: string) => {
    setIsGeocoding(true)
    setError(null)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock geocoding results for common Indian cities
      const mockResults: { [key: string]: { lat: number; lng: number; district: string; state: string } } = {
        mumbai: { lat: 19.076, lng: 72.8777, district: "Mumbai", state: "Maharashtra" },
        delhi: { lat: 28.6139, lng: 77.209, district: "New Delhi", state: "Delhi" },
        bangalore: { lat: 12.9716, lng: 77.5946, district: "Bangalore Urban", state: "Karnataka" },
        chennai: { lat: 13.0827, lng: 80.2707, district: "Chennai", state: "Tamil Nadu" },
        hyderabad: { lat: 17.385, lng: 78.4867, district: "Hyderabad", state: "Telangana" },
        pune: { lat: 18.5204, lng: 73.8567, district: "Pune", state: "Maharashtra" },
        kolkata: { lat: 22.5726, lng: 88.3639, district: "Kolkata", state: "West Bengal" },
      }

      const searchKey = address.toLowerCase()
      let result = null

      // Find matching city
      for (const [city, coords] of Object.entries(mockResults)) {
        if (searchKey.includes(city)) {
          result = coords
          break
        }
      }

      if (!result) {
        // Default to Mumbai if no match found
        result = mockResults.mumbai
      }

      setFormData((prev) => ({
        ...prev,
        latitude: result.lat.toString(),
        longitude: result.lng.toString(),
        district: result.district,
        state: result.state,
      }))
    } catch (error) {
      setError("Failed to geocode address. Please enter coordinates manually.")
    } finally {
      setIsGeocoding(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleGeocodeClick = () => {
    if (formData.address.trim()) {
      geocodeAddress(formData.address)
    }
  }

  // Update parent component when data changes
  useEffect(() => {
    if (formData.name && formData.address && formData.latitude && formData.longitude) {
      const locationData: LocationData = {
        name: formData.name,
        address: formData.address,
        latitude: Number.parseFloat(formData.latitude),
        longitude: Number.parseFloat(formData.longitude),
        district: formData.district,
        state: formData.state,
        country: "India",
      }
      onLocationSelect(locationData)
    }
  }, [formData, onLocationSelect])

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="projectName">Project Name</Label>
          <Input
            id="projectName"
            placeholder="e.g., Residential Building - Phase 1"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Complete Address</Label>
          <div className="flex gap-2">
            <Input
              id="address"
              placeholder="Enter complete address with city and state"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleGeocodeClick}
              disabled={!formData.address.trim() || isGeocoding}
              className="bg-transparent"
            >
              {isGeocoding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Click the search button to automatically find coordinates for the address
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              id="latitude"
              type="number"
              step="any"
              placeholder="e.g., 19.0760"
              value={formData.latitude}
              onChange={(e) => handleInputChange("latitude", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="longitude">Longitude</Label>
            <Input
              id="longitude"
              type="number"
              step="any"
              placeholder="e.g., 72.8777"
              value={formData.longitude}
              onChange={(e) => handleInputChange("longitude", e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="district">District</Label>
            <Input
              id="district"
              placeholder="e.g., Mumbai"
              value={formData.district}
              onChange={(e) => handleInputChange("district", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              placeholder="e.g., Maharashtra"
              value={formData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
            />
          </div>
        </div>

        {error && (
          <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-md">
            {error}
          </div>
        )}

        {formData.latitude && formData.longitude && (
          <div className="p-3 text-sm text-primary bg-primary/10 border border-primary/20 rounded-md flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location coordinates set: {Number.parseFloat(formData.latitude).toFixed(4)},{" "}
            {Number.parseFloat(formData.longitude).toFixed(4)}
          </div>
        )}
      </div>
    </div>
  )
}
