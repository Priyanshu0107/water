"use client"
<<<<<<< HEAD
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplets, Calculator, FileText, Info, MapPin } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export default function HomePage() {
  const { t } = useI18n()

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/bg-jalshakti.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="bg-blue-900/40 min-h-screen">
        {/* Header / Navbar */}
        <header className="bg-blue-200 shadow-md">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            
            {/* Left side: Logo + Hindi name */}
            <div className="flex items-center gap-3">
              <Droplets className="h-8 w-8 text-blue-700" />
              <h1 className="text-2xl font-bold text-blue-900">जलनिगम | Jalnigam</h1>
            </div>

            {/* Right side: Modi Ji photo + buttons */}
            <div className="flex items-center gap-4">
              <img
                src="/modi.png"
                alt="PM Modi"
                className="h-10 w-10 rounded-full border-2 border-blue-700"
              />
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className="border-blue-700 text-blue-700 hover:bg-blue-300"
                >
                  {t("nav.signIn")} | Sign In
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  {t("home.getStarted")} | Get Started
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold mb-6 drop-shadow-lg">
              {t("home.subtitle")} | Estimate Your Rainwater Harvesting Potential
            </h2>
            <p className="text-lg mb-8 opacity-90">
              {t("home.description")} | Easily check feasibility and plan sustainable groundwater recharge
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/sign-up">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                  {t("home.getStarted")} | Get Started
                </Button>
              </Link>
              <Link href="/demo">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white text-white hover:bg-blue-700"
                >
                  {t("home.learnMore")} | Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12 text-white">
            <h3 className="text-3xl font-bold mb-4">मुख्य विशेषताएँ | Key Features</h3>
            <p className="text-lg max-w-2xl mx-auto opacity-90">
              हमारा प्लेटफ़ॉर्म जल संरक्षण और वर्षा जल संचयन को सरल बनाता है | Our platform simplifies groundwater conservation and rainwater harvesting
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <Card className="text-center bg-white shadow-lg">
              <CardHeader>
                <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>आरटीआरडब्ल्यूएच जांच | RTRWH Feasibility</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  आपकी छत पर वर्षा जल संचयन की संभावना की गणना करें | Calculate the feasibility of rooftop rainwater harvesting
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-lg">
              <CardHeader>
                <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>स्थानीय भूजल जानकारी | Local Groundwater Info</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  क्षेत्र में मुख्य जलस्रोत और जलस्तर की जानकारी प्राप्त करें | Get info about principal aquifer and groundwater levels
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-lg">
              <CardHeader>
                <Droplets className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>वर्षा और रनोफ आंकड़े | Rainfall & Runoff</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  स्थानीय वर्षा और रनऑफ क्षमता का विवरण देखें | View local rainfall data and runoff generation capacity
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-lg">
              <CardHeader>
                <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>संरचना सुझाव | Structure Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  रिसर्च आधारित पुनर्भरण गड्ढे, ट्रेंच और शाफ्ट के सुझाव | Research-based recommended recharge pits, trenches, and shafts
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-lg">
              <CardHeader>
                <Info className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>लागत और लाभ | Cost & Benefit</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  लागत अनुमान और लागत-लाभ विश्लेषण प्राप्त करें | Get cost estimation and cost-benefit analysis
                </CardDescription>
              </CardContent>
            </Card>

          </div>
        </section>

        {/* Footer */}
        <footer className="border-t bg-blue-200 mt-16">
          <div className="container mx-auto px-4 py-6 text-center text-blue-900">
            &copy; 2024 Ministry of Jal Shakti | AquaHarvest - Rainwater Harvesting Platform
          </div>
        </footer>

=======

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
>>>>>>> d9ea4dd52e5151b7d7a3b9e7f958a04232a2b6cf
      </div>
    </div>
  )
}
