"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface RainfallChartProps {
  data: {
    monthlyDistribution: number[]
    annualRainfall: number
    peakMonths: number[]
    dryMonths: number[]
  }
}

export default function RainfallChart({ data }: RainfallChartProps) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const chartData = data.monthlyDistribution.map((rainfall, index) => ({
    month: months[index],
    rainfall: Math.round(rainfall),
    isPeak: data.peakMonths.includes(index + 1),
    isDry: data.dryMonths.includes(index + 1),
  }))

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-primary">Rainfall: {payload[0].value}mm</p>
          {data.isPeak && <p className="text-xs text-primary">Peak month</p>}
          {data.isDry && <p className="text-xs text-muted-foreground">Dry month</p>}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-4">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} />
            <YAxis
              tick={{ fontSize: 12 }}
              axisLine={false}
              label={{ value: "Rainfall (mm)", angle: -90, position: "insideLeft" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="rainfall" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary rounded"></div>
          <span>Monthly Rainfall</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary/60 rounded"></div>
          <span>Peak Months &gt;100mm</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-muted-foreground/40 rounded"></div>
          <span>Dry Months &lt;20mm</span>
        </div>
      </div>
    </div>
  )
}
