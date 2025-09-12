"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Calculator,
  Droplets,
  TrendingUp,
  FileText,
  Download,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react"
import RainfallChart from "./rainfall-chart"
import CostBreakdownChart from "./cost-breakdown-chart"
import SystemDiagram from "./system-diagram"

interface AssessmentResultsProps {
  assessment: any
}

export default function AssessmentResults({ assessment }: AssessmentResultsProps) {
  const [isCalculating, setIsCalculating] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const runCalculations = async () => {
    setIsCalculating(true)
    setError(null)

    try {
      const response = await fetch("/api/assessment/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assessmentId: assessment.id,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to calculate assessment")
      }

      const data = await response.json()
      setResults(data.results)
    } catch (error: any) {
      setError(error.message || "An error occurred during calculation")
    } finally {
      setIsCalculating(false)
    }
  }

  const generateReport = async () => {
    try {
      const response = await fetch("/api/assessment/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assessmentId: assessment.id,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate report")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `rainwater-assessment-${assessment.id}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Report generation error:", error)
    }
  }

  // Auto-run calculations if assessment is completed but no results shown
  useEffect(() => {
    if (assessment.status === "completed" && !results && !isCalculating) {
      runCalculations()
    }
  }, [assessment.status])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-primary text-primary-foreground">Completed</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-8">
      {/* Assessment Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="w-6 h-6 text-primary" />
                Assessment Overview
              </CardTitle>
              <CardDescription>
                {assessment.building_type} • {assessment.roof_area} sq.m roof area
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge(assessment.status)}
              <Button onClick={runCalculations} disabled={isCalculating} variant="outline" size="sm">
                {isCalculating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="w-4 h-4 mr-2" />
                    {results ? "Recalculate" : "Calculate"}
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{assessment.roof_area}</div>
              <div className="text-sm text-muted-foreground">Roof Area (sq.m)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{assessment.household_size}</div>
              <div className="text-sm text-muted-foreground">Household Size</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{assessment.daily_water_requirement}</div>
              <div className="text-sm text-muted-foreground">Daily Requirement (L)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {assessment.annual_rainfall ? Math.round(assessment.annual_rainfall) : "—"}
              </div>
              <div className="text-sm text-muted-foreground">Annual Rainfall (mm)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {results && (
        <Tabs defaultValue="summary" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="rainfall">Rainfall Analysis</TabsTrigger>
            <TabsTrigger value="system">System Design</TabsTrigger>
            <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Key Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Key Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Harvestable Water</span>
                    <span className="font-semibold">
                      {Math.round(results.harvestingPotential.practicalHarvestable).toLocaleString()}L/year
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Storage Capacity</span>
                    <span className="font-semibold">
                      {Math.round(results.systemSizing.storage.recommendedCapacity).toLocaleString()}L
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">System Cost</span>
                    <span className="font-semibold">₹{results.costBreakdown.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Payback Period</span>
                    <span className="font-semibold">{results.financialAnalysis.paybackPeriod.toFixed(1)} years</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Annual Savings</span>
                    <span className="font-semibold text-primary">
                      ₹{Math.round(results.financialAnalysis.annualSavings).toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Water Balance */}
              <Card>
                <CardHeader>
                  <CardTitle>Water Balance Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Annual Requirement</span>
                      <span>{(assessment.daily_water_requirement * 365).toLocaleString()}L</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Harvestable Water</span>
                      <span>{Math.round(results.harvestingPotential.practicalHarvestable).toLocaleString()}L</span>
                    </div>
                    <Progress
                      value={
                        (results.harvestingPotential.practicalHarvestable /
                          (assessment.daily_water_requirement * 365)) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                  <div className="pt-2 text-sm text-muted-foreground">
                    <Info className="w-4 h-4 inline mr-1" />
                    {results.harvestingPotential.practicalHarvestable >= assessment.daily_water_requirement * 365
                      ? "System can meet 100% of water requirements"
                      : `System can meet ${Math.round((results.harvestingPotential.practicalHarvestable / (assessment.daily_water_requirement * 365)) * 100)}% of water requirements`}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button onClick={generateReport} className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download PDF Report
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <FileText className="w-4 h-4" />
                    Share Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rainfall" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Rainfall Analysis</CardTitle>
                <CardDescription>Historical rainfall patterns and water harvesting potential</CardDescription>
              </CardHeader>
              <CardContent>
                <RainfallChart data={results.rainfallAnalysis} />
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rainfall Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Annual Rainfall</span>
                    <span className="font-semibold">{Math.round(results.rainfallAnalysis.annualRainfall)}mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rainy Season Total</span>
                    <span className="font-semibold">{Math.round(results.rainfallAnalysis.rainySeasonTotal)}mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reliability Score</span>
                    <span className="font-semibold">{(results.rainfallAnalysis.reliability * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Peak Months</span>
                    <span className="font-semibold">
                      {results.rainfallAnalysis.peakMonths
                        .map((m: number) => new Date(2023, m - 1).toLocaleString("default", { month: "short" }))
                        .join(", ")}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Harvesting Potential</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Maximum Harvestable</span>
                    <span className="font-semibold">
                      {Math.round(results.harvestingPotential.maxHarvestable).toLocaleString()}L
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Practical Harvestable</span>
                    <span className="font-semibold text-primary">
                      {Math.round(results.harvestingPotential.practicalHarvestable).toLocaleString()}L
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Runoff Coefficient</span>
                    <span className="font-semibold">{results.harvestingPotential.runoffCoefficient.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">System Efficiency</span>
                    <span className="font-semibold">
                      {(
                        (results.harvestingPotential.practicalHarvestable /
                          results.harvestingPotential.maxHarvestable) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Design</CardTitle>
                <CardDescription>Recommended system configuration and components</CardDescription>
              </CardHeader>
              <CardContent>
                <SystemDiagram systemSizing={results.systemSizing} />
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Storage System</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Capacity</span>
                    <span className="font-semibold">
                      {Math.round(results.systemSizing.storage.recommendedCapacity).toLocaleString()}L
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Configuration</span>
                    <span className="font-semibold text-sm">
                      {results.systemSizing.storage.tankConfiguration.length} tanks
                    </span>
                  </div>
                  <div className="space-y-1">
                    {results.systemSizing.storage.tankConfiguration.map((tank: string, index: number) => (
                      <div key={index} className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                        {tank}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Filtration System</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Flow Rate</span>
                    <span className="font-semibold">{Math.round(results.systemSizing.filtration.flowRate)}L/h</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {results.systemSizing.filtration.sedimentFilter ? (
                        <CheckCircle className="w-4 h-4 text-primary" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                      )}
                      <span className="text-sm">Sediment Filter</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {results.systemSizing.filtration.carbonFilter ? (
                        <CheckCircle className="w-4 h-4 text-primary" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                      )}
                      <span className="text-sm">Carbon Filter</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {results.systemSizing.filtration.uvSterilizer ? (
                        <CheckCircle className="w-4 h-4 text-primary" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                      )}
                      <span className="text-sm">UV Sterilizer</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Distribution System</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pump Capacity</span>
                    <span className="font-semibold">
                      {Math.round(results.systemSizing.distribution.pumpCapacity)}L/h
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pump Type</span>
                    <span className="font-semibold text-sm">{results.systemSizing.distribution.pumpType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Piping Size</span>
                    <span className="font-semibold">{results.systemSizing.distribution.pipingSize}mm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {results.systemSizing.distribution.pressureTank ? (
                      <CheckCircle className="w-4 h-4 text-primary" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                    )}
                    <span className="text-sm">Pressure Tank</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="costs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost Breakdown</CardTitle>
                <CardDescription>Detailed cost analysis and financial projections</CardDescription>
              </CardHeader>
              <CardContent>
                <CostBreakdownChart data={results.costBreakdown} />
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Investment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total System Cost</span>
                    <span className="font-bold text-lg">₹{results.costBreakdown.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Annual Water Savings</span>
                    <span className="font-semibold text-primary">
                      ₹{Math.round(results.financialAnalysis.annualSavings).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payback Period</span>
                    <span className="font-semibold">{results.financialAnalysis.paybackPeriod.toFixed(1)} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">20-Year ROI</span>
                    <span className="font-semibold text-primary">
                      {results.financialAnalysis.roi20Years.toFixed(1)}%
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Component Costs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Catchment System</span>
                    <span className="font-semibold">
                      ₹{results.costBreakdown.components.catchment.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Storage System</span>
                    <span className="font-semibold">₹{results.costBreakdown.components.storage.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Filtration System</span>
                    <span className="font-semibold">
                      ₹{results.costBreakdown.components.filtration.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Distribution System</span>
                    <span className="font-semibold">
                      ₹{results.costBreakdown.components.distribution.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Installation</span>
                    <span className="font-semibold">
                      ₹{results.costBreakdown.components.installation.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Recommendations</CardTitle>
                <CardDescription>Professional recommendations based on your assessment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Optimal System Configuration</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Based on your location, building specifications, and preferences, we recommend the following system:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Storage:</strong>{" "}
                        {Math.round(results.systemSizing.storage.recommendedCapacity).toLocaleString()}L capacity with{" "}
                        {results.systemSizing.storage.tankConfiguration.length} tank configuration
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Filtration:</strong> Multi-stage filtration system with
                        {results.systemSizing.filtration.sedimentFilter && " sediment filter"}
                        {results.systemSizing.filtration.carbonFilter && ", carbon filter"}
                        {results.systemSizing.filtration.uvSterilizer && ", UV sterilizer"}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Distribution:</strong> {results.systemSizing.distribution.pumpType} pump system with{" "}
                        {results.systemSizing.distribution.pipingSize}mm piping
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h5 className="font-medium mb-2">Implementation Timeline</h5>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Week 1-2: Site preparation and permits</li>
                      <li>• Week 3-4: Storage system installation</li>
                      <li>• Week 5-6: Filtration and distribution setup</li>
                      <li>• Week 7-8: Testing and commissioning</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h5 className="font-medium mb-2">Maintenance Schedule</h5>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Monthly: Filter inspection and cleaning</li>
                      <li>• Quarterly: Pump and system check</li>
                      <li>• Bi-annually: Tank cleaning</li>
                      <li>• Annually: Complete system audit</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {!results && !isCalculating && assessment.status === "draft" && (
        <Card>
          <CardContent className="pt-6 text-center">
            <Calculator className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Ready to Calculate</h3>
            <p className="text-muted-foreground mb-4">
              Run the assessment calculations to see detailed results and recommendations.
            </p>
            <Button onClick={runCalculations}>
              <Calculator className="w-4 h-4 mr-2" />
              Calculate Assessment
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
