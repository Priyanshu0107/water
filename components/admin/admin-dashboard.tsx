"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BarChart3, Database, Users, MapPin, DollarSign, LogOut } from "lucide-react"
import { RainfallDataManager } from "./rainfall-data-manager"
import { GroundwaterDataManager } from "./groundwater-data-manager"
import { CostComponentManager } from "./cost-component-manager"
import { AssessmentAnalytics } from "./assessment-analytics"
import { UserManagement } from "./user-management"
import { createBrowserClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const supabase = createBrowserClient()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <h1 className="text-xl font-bold text-slate-900">AquaHarvest Admin</h1>
          <p className="text-sm text-slate-600 mt-1">Data Management Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Button
            variant={activeTab === "overview" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("overview")}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview
          </Button>
          <Button
            variant={activeTab === "users" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("users")}
          >
            <Users className="w-4 h-4 mr-2" />
            Users
          </Button>
          <Button
            variant={activeTab === "rainfall" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("rainfall")}
          >
            <Database className="w-4 h-4 mr-2" />
            Rainfall Data
          </Button>
          <Button
            variant={activeTab === "groundwater" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("groundwater")}
          >
            <MapPin className="w-4 h-4 mr-2" />
            Groundwater Data
          </Button>
          <Button
            variant={activeTab === "costs" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("costs")}
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Cost Components
          </Button>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <Button variant="ghost" className="w-full justify-start text-slate-600" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {activeTab === "overview" && <AssessmentAnalytics />}
          {activeTab === "users" && <UserManagement />}
          {activeTab === "rainfall" && <RainfallDataManager />}
          {activeTab === "groundwater" && <GroundwaterDataManager />}
          {activeTab === "costs" && <CostComponentManager />}
        </div>
      </div>
    </div>
  )
}
