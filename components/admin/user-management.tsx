"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createBrowserClient } from "@/lib/supabase/client"
import { Users, Mail, Calendar, FileText } from "lucide-react"

interface UserProfile {
  id: string
  email: string
  full_name: string
  role: string
  organization: string
  created_at: string
  last_sign_in_at: string
  assessment_count: number
}

export function UserManagement() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createBrowserClient()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      // Get user profiles with assessment counts
      const { data: profiles, error: profilesError } = await supabase
        .from("user_profiles")
        .select(`
          *,
          assessments(count)
        `)
        .order("created_at", { ascending: false })

      if (profilesError) throw profilesError

      // Get auth users for email and last sign in
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers()

      if (authError) {
        console.warn("Could not fetch auth users:", authError)
      }

      // Combine profile and auth data
      const combinedUsers =
        profiles?.map((profile) => {
          const authUser = authUsers?.users.find((u) => u.id === profile.id)
          return {
            ...profile,
            email: authUser?.email || "Unknown",
            last_sign_in_at: authUser?.last_sign_in_at || null,
            assessment_count: profile.assessments?.[0]?.count || 0,
          }
        }) || []

      setUsers(combinedUsers)
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "professional":
        return "bg-blue-100 text-blue-800"
      case "homeowner":
        return "bg-green-100 text-green-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading users...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">User Management</h2>
        <p className="text-slate-600 mt-1">View and manage registered users</p>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Professionals</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter((u) => u.role === "professional").length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Homeowners</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter((u) => u.role === "homeowner").length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active This Month</CardTitle>
            <Calendar className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                users.filter((u) => {
                  if (!u.last_sign_in_at) return false
                  const lastSignIn = new Date(u.last_sign_in_at)
                  const monthAgo = new Date()
                  monthAgo.setMonth(monthAgo.getMonth() - 1)
                  return lastSignIn > monthAgo
                }).length
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User List */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Complete list of registered users and their activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-slate-900">{user.full_name || "Unnamed User"}</h4>
                        <Badge className={getRoleBadgeColor(user.role)}>{user.role}</Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </div>
                        {user.organization && <div>{user.organization}</div>}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm text-slate-600">
                  <div className="text-center">
                    <div className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      <span className="font-medium">{user.assessment_count}</span>
                    </div>
                    <div className="text-xs">assessments</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span className="font-medium">{new Date(user.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="text-xs">joined</div>
                  </div>
                  {user.last_sign_in_at && (
                    <div className="text-center">
                      <div className="font-medium">{new Date(user.last_sign_in_at).toLocaleDateString()}</div>
                      <div className="text-xs">last active</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
