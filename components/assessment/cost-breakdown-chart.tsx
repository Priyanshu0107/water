"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

interface CostBreakdownChartProps {
  data: {
    components: {
      catchment: number
      storage: number
      filtration: number
      distribution: number
      installation: number
    }
    total: number
  }
}

export default function CostBreakdownChart({ data }: CostBreakdownChartProps) {
  const chartData = [
    { name: "Storage System", value: data.components.storage, color: "hsl(var(--primary))" },
    { name: "Installation", value: data.components.installation, color: "hsl(var(--secondary))" },
    { name: "Distribution", value: data.components.distribution, color: "hsl(var(--chart-1))" },
    { name: "Catchment", value: data.components.catchment, color: "hsl(var(--chart-2))" },
    { name: "Filtration", value: data.components.filtration, color: "hsl(var(--chart-3))" },
  ].filter((item) => item.value > 0)

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]
      const percentage = ((data.value / data.payload.total) * 100).toFixed(1)
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-primary">₹{data.value.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">{percentage}% of total</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-4">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={120} paddingAngle={2} dataKey="value">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value, entry: any) => (
                <span style={{ color: entry.color }}>
                  {value}: ₹{entry.payload.value.toLocaleString()}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center">
        <div className="text-2xl font-bold">₹{data.total.toLocaleString()}</div>
        <div className="text-sm text-muted-foreground">Total System Cost</div>
      </div>
    </div>
  )
}
