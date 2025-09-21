"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function CostBenefitPage() {
  const [roofArea, setRoofArea] = useState("")
  const [rainfall, setRainfall] = useState("")
  const [cost, setCost] = useState<number | null>(null)
  const [benefit, setBenefit] = useState<number | null>(null)
  const [water, setWater] = useState<number | null>(null)
  const [payback, setPayback] = useState<number | null>(null)

  const calculate = () => {
    const area = parseFloat(roofArea)
    const rain = parseFloat(rainfall)

    if (!isNaN(area) && !isNaN(rain)) {
      const runoffCoefficient = 0.8

      // Harvested water in liters
      const totalWater = area * rain * runoffCoefficient

      // Cost estimation (per sq.m)
      const estimatedCost = area * 200

      // Benefit estimation (saving ₹0.5 per liter)
      const estimatedBenefit = totalWater * 0.5

      // Payback period (years)
      const paybackPeriod = estimatedBenefit > 0 ? estimatedCost / estimatedBenefit : null

      setCost(estimatedCost)
      setBenefit(estimatedBenefit)
      setWater(totalWater)
      setPayback(paybackPeriod)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 py-10">
      <div className="container mx-auto px-4">
        
        {/* Page Heading */}
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-6">
          लागत और लाभ | Cost & Benefit
        </h1>
        <p className="text-center text-gray-700 mb-10 max-w-2xl mx-auto">
          अनुमानित लागत और लागत-लाभ विश्लेषण प्राप्त करें | Get estimated cost and benefit analysis 
        </p>

        {/* Input Form */}
        <Card className="max-w-2xl mx-auto shadow-lg border border-blue-200">
          <CardHeader>
            <CardTitle>अपनी जानकारी भरें | Enter Your Details</CardTitle>
            <CardDescription>
              Calculation के लिए छत का क्षेत्रफल और वार्षिक वर्षा दर्ज करें
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">छत का क्षेत्रफल (sq.m)</label>
              <Input
                type="number"
                placeholder="उदा: 120"
                value={roofArea}
                onChange={(e) => setRoofArea(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">वार्षिक वर्षा (mm)</label>
              <Input
                type="number"
                placeholder="उदा: 800"
                value={rainfall}
                onChange={(e) => setRainfall(e.target.value)}
              />
            </div>

            <Button onClick={calculate} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Calculate
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {cost !== null && benefit !== null && water !== null && (
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-md border border-blue-200">
              <CardHeader>
                <CardTitle>कुल संग्रहीत पानी | Total Water</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-700">{water.toFixed(0)} L</p>
              </CardContent>
            </Card>

            <Card className="shadow-md border border-red-200">
              <CardHeader>
                <CardTitle>अनुमानित लागत | Estimated Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-red-600">₹ {cost.toFixed(2)}</p>
              </CardContent>
            </Card>

            <Card className="shadow-md border border-green-200">
              <CardHeader>
                <CardTitle>अनुमानित लाभ | Estimated Benefit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">₹ {benefit.toFixed(2)}</p>
              </CardContent>
            </Card>

            <Card className="shadow-md border border-yellow-200">
              <CardHeader>
                <CardTitle>पेबैक अवधि | Payback Period</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-yellow-600">
                  {payback ? `${payback.toFixed(1)} years` : "N/A"}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
