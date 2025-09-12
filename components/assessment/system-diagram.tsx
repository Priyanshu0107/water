"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SystemDiagramProps {
  systemSizing: {
    storage: {
      recommendedCapacity: number
      tankConfiguration: string[]
    }
    filtration: {
      sedimentFilter: boolean
      carbonFilter: boolean
      uvSterilizer: boolean
    }
    distribution: {
      pumpType: string
      pressureTank: boolean
    }
  }
}

export default function SystemDiagram({ systemSizing }: SystemDiagramProps) {
  return (
    <div className="space-y-6">
      {/* System Flow Diagram */}
      <div className="relative">
        <svg viewBox="0 0 800 400" className="w-full h-64 border rounded-lg bg-muted/20">
          {/* Roof */}
          <rect x="50" y="50" width="120" height="80" fill="hsl(var(--chart-2))" rx="4" />
          <text x="110" y="95" textAnchor="middle" className="fill-white text-sm font-medium">
            Roof
          </text>

          {/* Gutter */}
          <rect x="200" y="80" width="80" height="20" fill="hsl(var(--chart-1))" rx="2" />
          <text x="240" y="95" textAnchor="middle" className="fill-white text-xs">
            Gutter
          </text>

          {/* First Flush Diverter */}
          <circle cx="320" cy="140" r="25" fill="hsl(var(--chart-3))" />
          <text x="320" y="145" textAnchor="middle" className="fill-white text-xs">
            First Flush
          </text>

          {/* Storage Tank */}
          <rect x="400" y="100" width="100" height="120" fill="hsl(var(--primary))" rx="4" />
          <text x="450" y="165" textAnchor="middle" className="fill-white text-sm font-medium">
            Storage
          </text>

          {/* Filtration */}
          <rect x="550" y="130" width="80" height="60" fill="hsl(var(--secondary))" rx="4" />
          <text x="590" y="165" textAnchor="middle" className="fill-white text-sm">
            Filter
          </text>

          {/* Distribution */}
          <rect x="680" y="140" width="60" height="40" fill="hsl(var(--chart-4))" rx="4" />
          <text x="710" y="165" textAnchor="middle" className="fill-white text-sm">
            Pump
          </text>

          {/* Flow arrows */}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--foreground))" />
            </marker>
          </defs>

          <line
            x1="170"
            y1="90"
            x2="200"
            y2="90"
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
          <line
            x1="280"
            y1="90"
            x2="295"
            y2="115"
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
          <line
            x1="345"
            y1="140"
            x2="400"
            y2="140"
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
          <line
            x1="500"
            y1="160"
            x2="550"
            y2="160"
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
          <line
            x1="630"
            y1="160"
            x2="680"
            y2="160"
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
        </svg>
      </div>

      {/* Component Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-chart-2 rounded mx-auto mb-2"></div>
            <h4 className="font-medium text-sm">Catchment</h4>
            <p className="text-xs text-muted-foreground">Roof collection system</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-primary rounded mx-auto mb-2"></div>
            <h4 className="font-medium text-sm">Storage</h4>
            <p className="text-xs text-muted-foreground">
              {Math.round(systemSizing.storage.recommendedCapacity / 1000)}K liters
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-secondary rounded mx-auto mb-2"></div>
            <h4 className="font-medium text-sm">Filtration</h4>
            <div className="flex flex-wrap gap-1 justify-center mt-1">
              {systemSizing.filtration.sedimentFilter && (
                <Badge variant="outline" className="text-xs">
                  Sediment
                </Badge>
              )}
              {systemSizing.filtration.carbonFilter && (
                <Badge variant="outline" className="text-xs">
                  Carbon
                </Badge>
              )}
              {systemSizing.filtration.uvSterilizer && (
                <Badge variant="outline" className="text-xs">
                  UV
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-chart-4 rounded mx-auto mb-2"></div>
            <h4 className="font-medium text-sm">Distribution</h4>
            <p className="text-xs text-muted-foreground">{systemSizing.distribution.pumpType}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
