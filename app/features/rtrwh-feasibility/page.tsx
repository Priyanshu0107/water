"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RTRWHFeasibilityPage() {
  const [area, setArea] = useState("")
  const [rainfall, setRainfall] = useState("")
  const [result, setResult] = useState<number | null>(null)

  // Simple calculation: water potential = roof area * rainfall * 0.8
  const calculatePotential = () => {
    const a = parseFloat(area)
    const r = parseFloat(rainfall)
    if (!isNaN(a) && !isNaN(r)) {
      const potential = a * r * 0.8
      setResult(potential)
    } else {
      setResult(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-10">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-blue-800 mb-4">
          आरटीआरडब्ल्यूएच जांच | RTRWH Feasibility
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          यहाँ आप अपनी छत के क्षेत्रफल और औसत वर्षा डालकर वर्षा जल संचयन की क्षमता की गणना कर सकते हैं।  
          <br />
          Enter your rooftop area and average rainfall to estimate the rainwater harvesting potential.
        </p>

        {/* Input Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>इनपुट विवरण | Input Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block mb-2 font-medium text-gray-800">
                छत का क्षेत्रफल (m²) | Rooftop Area (m²)
              </label>
              <Input
                type="number"
                placeholder="उदाहरण: 100"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-800">
                औसत वर्षा (mm) | Average Rainfall (mm)
              </label>
              <Input
                type="number"
                placeholder="उदाहरण: 800"
                value={rainfall}
                onChange={(e) => setRainfall(e.target.value)}
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full" onClick={calculatePotential}>
              क्षमता गणना करें | Calculate Potential
            </Button>
          </CardContent>
        </Card>

        {/* Result Section */}
        {result !== null && (
          <div className="mt-8 p-6 bg-white shadow-md rounded-lg text-center">
            <h2 className="text-2xl font-bold text-blue-700 mb-2">परिणाम | Result</h2>
            <p className="text-lg text-gray-800">
              अनुमानित वर्षा जल संचयन क्षमता है:{" "}
              <span className="font-semibold text-blue-900">{result.toFixed(2)} लीटर</span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
