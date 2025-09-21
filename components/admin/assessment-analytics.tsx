"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { createBrowserClient } from "@/lib/supabase/client"
import { Users, FileText, TrendingUp, DollarSign } from "lucide-react"

interface Analytics {
  totalUsers: number
  totalAssessments: number
  avgSystemSize: number
  totalPotentialSavings: number
  assessmentsByMonth: Array<{ month: string; count: number }>
  systemTypeDistribution: Array<{ type: string; count: number; color: string }>
  recentAssessments: Array<{
    id: string
    user_email: string
    location: string
    created_at: string
    status: string
    potential_harvest: number
  }>
}

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"]

export function AssessmentAnalytics() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createBrowserClient()

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      // Fetch basic counts
      const [usersResult, assessmentsResult] = await Promise.all([
        supabase.from("user_profiles").select("id", { count: "exact" }),
        supabase.from("assessments").select("*"),
      ])

      const totalUsers = usersResult.count || 0
      const assessments = assessmentsResult.data || []
      const totalAssessments = assessments.length

      // Calculate averages
      const avgSystemSize =
        assessments.length > 0
          ? assessments.reduce((sum, a) => sum + (a.recommended_tank_size || 0), 0) / assessments.length
          : 0

      const totalPotentialSavings = assessments.reduce((sum, a) => sum + (a.annual_savings || 0), 0)

      // Group assessments by month
      const assessmentsByMonth = assessments
        .reduce((acc: any[], assessment) => {
          const month = new Date(assessment.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })
          const existing = acc.find((item) => item.month === month)
          if (existing) {
            existing.count++
          } else {
            acc.push({ month, count: 1 })
          }
          return acc
        }, [])
        .slice(-6) // Last 6 months

      // System type distribution
      const systemTypes = assessments.reduce((acc: any, assessment) => {
        const type = assessment.system_type || "Basic"
        acc[type] = (acc[type] || 0) + 1
        return acc
      }, {})

      const systemTypeDistribution = Object.entries(systemTypes).map(([type, count], index) => ({
        type,
        count: count as number,
        color: COLORS[index % COLORS.length],
      }))

      // Recent assessments
      const recentAssessments = assessments
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 10)
        .map((assessment) => ({
          id: assessment.id,
          user_email: assessment.user_email || "Unknown",
          location: `${assessment.city}, ${assessment.state}`,
          created_at: assessment.created_at,
          status: assessment.status || "completed",
          potential_harvest: assessment.annual_harvest_potential || 0,
        }))

      setAnalytics({
        totalUsers,
        totalAssessments,
        avgSystemSize,
        totalPotentialSavings,
        assessmentsByMonth,
        systemTypeDistribution,
        recentAssessments,
      })
    } catch (error) {
      console.error("Error fetching analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading analytics...</div>
  }

  if (!analytics) {
    return <div className="text-center text-slate-600">Failed to load analytics</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Dashboard Overview</h2>
        <p className="text-slate-600 mt-1">System analytics and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalUsers}</div>
            <p className="text-xs text-slate-600">Registered users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assessments</CardTitle>
            <FileText className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalAssessments}</div>
            <p className="text-xs text-slate-600">Total completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg System Size</CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(analytics.avgSystemSize).toLocaleString()}L</div>
            <p className="text-xs text-slate-600">Recommended capacity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Potential Savings</CardTitle>
            <DollarSign className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${Math.round(analytics.totalPotentialSavings).toLocaleString()}</div>
            <p className="text-xs text-slate-600">Annual total</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Assessments Over Time</CardTitle>
            <CardDescription>Monthly assessment completion trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.assessmentsByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Type Distribution</CardTitle>
            <CardDescription>Breakdown of recommended system types</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.systemTypeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {analytics.systemTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Assessments */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Assessments</CardTitle>
          <CardDescription>Latest user assessments and their details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.recentAssessments.map((assessment) => (
              <div
                key={assessment.id}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium text-slate-900">{assessment.user_email}</p>
                      <p className="text-sm text-slate-600">{assessment.location}</p>
                    </div>
                    <Badge variant={assessment.status === "completed" ? "default" : "secondary"}>
                      {assessment.status}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-slate-900">
                    {Math.round(assessment.potential_harvest).toLocaleString()}L/year
                  </p>
                  <p className="text-sm text-slate-600">{new Date(assessment.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
