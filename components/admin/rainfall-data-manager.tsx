"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

interface RainfallData {
  id: string
  location: string
  latitude: number
  longitude: number
  jan: number
  feb: number
  mar: number
  apr: number
  may: number
  jun: number
  jul: number
  aug: number
  sep: number
  oct: number
  nov: number
  dec: number
  annual_average: number
  data_source: string
  created_at: string
}

export function RainfallDataManager() {
  const [rainfallData, setRainfallData] = useState<RainfallData[]>([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<RainfallData | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const supabase = createBrowserClient()

  useEffect(() => {
    fetchRainfallData()
  }, [])

  const fetchRainfallData = async () => {
    try {
      const { data, error } = await supabase.from("rainfall_data").select("*").order("location")

      if (error) throw error
      setRainfallData(data || [])
    } catch (error) {
      console.error("Error fetching rainfall data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (formData: FormData) => {
    const data = {
      location: formData.get("location") as string,
      latitude: Number.parseFloat(formData.get("latitude") as string),
      longitude: Number.parseFloat(formData.get("longitude") as string),
      jan: Number.parseFloat(formData.get("jan") as string),
      feb: Number.parseFloat(formData.get("feb") as string),
      mar: Number.parseFloat(formData.get("mar") as string),
      apr: Number.parseFloat(formData.get("apr") as string),
      may: Number.parseFloat(formData.get("may") as string),
      jun: Number.parseFloat(formData.get("jun") as string),
      jul: Number.parseFloat(formData.get("jul") as string),
      aug: Number.parseFloat(formData.get("aug") as string),
      sep: Number.parseFloat(formData.get("sep") as string),
      oct: Number.parseFloat(formData.get("oct") as string),
      nov: Number.parseFloat(formData.get("nov") as string),
      dec: Number.parseFloat(formData.get("dec") as string),
      data_source: formData.get("data_source") as string,
    }

    // Calculate annual average
    const monthlyValues = [
      data.jan,
      data.feb,
      data.mar,
      data.apr,
      data.may,
      data.jun,
      data.jul,
      data.aug,
      data.sep,
      data.oct,
      data.nov,
      data.dec,
    ]
    data.annual_average = monthlyValues.reduce((sum, val) => sum + val, 0)

    try {
      if (editingItem) {
        const { error } = await supabase.from("rainfall_data").update(data).eq("id", editingItem.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("rainfall_data").insert([data])
        if (error) throw error
      }

      setIsDialogOpen(false)
      setEditingItem(null)
      fetchRainfallData()
    } catch (error) {
      console.error("Error saving rainfall data:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this rainfall data?")) return

    try {
      const { error } = await supabase.from("rainfall_data").delete().eq("id", id)

      if (error) throw error
      fetchRainfallData()
    } catch (error) {
      console.error("Error deleting rainfall data:", error)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading rainfall data...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Rainfall Data Management</h2>
          <p className="text-slate-600 mt-1">Manage rainfall data for different locations</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingItem(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Rainfall Data
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit" : "Add"} Rainfall Data</DialogTitle>
              <DialogDescription>Enter monthly rainfall data in millimeters for the location.</DialogDescription>
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
                    placeholder="e.g., Bureau of Meteorology"
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

              <div>
                <Label>Monthly Rainfall (mm)</Label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"].map((month) => (
                    <div key={month}>
                      <Label htmlFor={month} className="text-xs capitalize">
                        {month}
                      </Label>
                      <Input
                        id={month}
                        name={month}
                        type="number"
                        step="0.1"
                        defaultValue={editingItem?.[month as keyof RainfallData] as number}
                        placeholder="0"
                        required
                      />
                    </div>
                  ))}
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
        {rainfallData.map((item) => (
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
              <div className="grid grid-cols-6 gap-2 text-sm">
                <div>
                  <span className="font-medium">Jan:</span> {item.jan}mm
                </div>
                <div>
                  <span className="font-medium">Feb:</span> {item.feb}mm
                </div>
                <div>
                  <span className="font-medium">Mar:</span> {item.mar}mm
                </div>
                <div>
                  <span className="font-medium">Apr:</span> {item.apr}mm
                </div>
                <div>
                  <span className="font-medium">May:</span> {item.may}mm
                </div>
                <div>
                  <span className="font-medium">Jun:</span> {item.jun}mm
                </div>
                <div>
                  <span className="font-medium">Jul:</span> {item.jul}mm
                </div>
                <div>
                  <span className="font-medium">Aug:</span> {item.aug}mm
                </div>
                <div>
                  <span className="font-medium">Sep:</span> {item.sep}mm
                </div>
                <div>
                  <span className="font-medium">Oct:</span> {item.oct}mm
                </div>
                <div>
                  <span className="font-medium">Nov:</span> {item.nov}mm
                </div>
                <div>
                  <span className="font-medium">Dec:</span> {item.dec}mm
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <Badge variant="secondary">Annual Total: {Math.round(item.annual_average)}mm</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
