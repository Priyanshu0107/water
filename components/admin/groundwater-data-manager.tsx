"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { createBrowserClient } from "@/lib/supabase/client"
import { Plus, Edit, Trash2, MapPin } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface GroundwaterData {
  id: string
  location: string
  latitude: number
  longitude: number
  depth_to_water: number
  water_quality: string
  salinity_level: number
  ph_level: number
  data_source: string
  created_at: string
}

export function GroundwaterDataManager() {
  const [groundwaterData, setGroundwaterData] = useState<GroundwaterData[]>([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<GroundwaterData | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const supabase = createBrowserClient()

  useEffect(() => {
    fetchGroundwaterData()
  }, [])

  const fetchGroundwaterData = async () => {
    try {
      const { data, error } = await supabase.from("groundwater_data").select("*").order("location")

      if (error) throw error
      setGroundwaterData(data || [])
    } catch (error) {
      console.error("Error fetching groundwater data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (formData: FormData) => {
    const data = {
      location: formData.get("location") as string,
      latitude: Number.parseFloat(formData.get("latitude") as string),
      longitude: Number.parseFloat(formData.get("longitude") as string),
      depth_to_water: Number.parseFloat(formData.get("depth_to_water") as string),
      water_quality: formData.get("water_quality") as string,
      salinity_level: Number.parseFloat(formData.get("salinity_level") as string),
      ph_level: Number.parseFloat(formData.get("ph_level") as string),
      data_source: formData.get("data_source") as string,
    }

    try {
      if (editingItem) {
        const { error } = await supabase.from("groundwater_data").update(data).eq("id", editingItem.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("groundwater_data").insert([data])
        if (error) throw error
      }

      setIsDialogOpen(false)
      setEditingItem(null)
      fetchGroundwaterData()
    } catch (error) {
      console.error("Error saving groundwater data:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this groundwater data?")) return

    try {
      const { error } = await supabase.from("groundwater_data").delete().eq("id", id)

      if (error) throw error
      fetchGroundwaterData()
    } catch (error) {
      console.error("Error deleting groundwater data:", error)
    }
  }

  const getQualityBadgeColor = (quality: string) => {
    switch (quality.toLowerCase()) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "fair":
        return "bg-yellow-100 text-yellow-800"
      case "poor":
        return "bg-red-100 text-red-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading groundwater data...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Groundwater Data Management</h2>
          <p className="text-slate-600 mt-1">Manage groundwater information for different locations</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingItem(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Groundwater Data
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit" : "Add"} Groundwater Data</DialogTitle>
              <DialogDescription>Enter groundwater information for the location.</DialogDescription>
            </DialogHeader>
            <form action={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    defaultValue={editingItem?.location}
                    placeholder="City, State"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="data_source">Data Source</Label>
                  <Input
                    id="data_source"
                    name="data_source"
                    defaultValue={editingItem?.data_source}
                    placeholder="e.g., Geological Survey"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    name="latitude"
                    type="number"
                    step="0.000001"
                    defaultValue={editingItem?.latitude}
                    placeholder="-37.8136"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    name="longitude"
                    type="number"
                    step="0.000001"
                    defaultValue={editingItem?.longitude}
                    placeholder="144.9631"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="depth_to_water">Depth to Water (m)</Label>
                  <Input
                    id="depth_to_water"
                    name="depth_to_water"
                    type="number"
                    step="0.1"
                    defaultValue={editingItem?.depth_to_water}
                    placeholder="10.5"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="water_quality">Water Quality</Label>
                  <Select name="water_quality" defaultValue={editingItem?.water_quality}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="salinity_level">Salinity Level (mg/L)</Label>
                  <Input
                    id="salinity_level"
                    name="salinity_level"
                    type="number"
                    step="0.1"
                    defaultValue={editingItem?.salinity_level}
                    placeholder="500"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="ph_level">pH Level</Label>
                  <Input
                    id="ph_level"
                    name="ph_level"
                    type="number"
                    step="0.1"
                    min="0"
                    max="14"
                    defaultValue={editingItem?.ph_level}
                    placeholder="7.2"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingItem ? "Update" : "Add"} Data</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {groundwaterData.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {item.location}
                  </CardTitle>
                  <CardDescription>
                    {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)} • {item.data_source}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingItem(item)
                      setIsDialogOpen(true)
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium">Depth to Water:</span>
                  <div>{item.depth_to_water}m</div>
                </div>
                <div>
                  <span className="font-medium">Water Quality:</span>
                  <div>
                    <Badge className={getQualityBadgeColor(item.water_quality)}>{item.water_quality}</Badge>
                  </div>
                </div>
                <div>
                  <span className="font-medium">Salinity:</span>
                  <div>{item.salinity_level} mg/L</div>
                </div>
                <div>
                  <span className="font-medium">pH Level:</span>
                  <div>{item.ph_level}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
