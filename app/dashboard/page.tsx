<<<<<<< HEAD
"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplets, FileText, MapPin, PlusCircle } from "lucide-react"

export default function Dashboard() {
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

        {/* Navbar */}
        <header className="bg-blue-200 shadow-md">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Droplets className="h-8 w-8 text-blue-700" />
              <h1 className="text-2xl font-bold text-blue-900">जलनिगम | Jalnigam</h1>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="outline" className="border-blue-700 text-blue-700 hover:bg-blue-300">
                  Dashboard
                </Button>
              </Link>
              <Link href="/">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Sign Out
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-white text-center mb-12 drop-shadow-lg">
            Welcome to Your Dashboard
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* New Assessment */}
            <Card className="text-center bg-white shadow-lg">
              <CardHeader>
                <PlusCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>नई आकलन | New Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Start a new rainwater harvesting assessment
                </CardDescription>
                <Link href="/assessment/new">
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">New Assessment</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Manage Locations */}
            <Card className="text-center bg-white shadow-lg">
              <CardHeader>
                <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>स्थान प्रबंधन | Manage Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Add and manage your project locations
                </CardDescription>
                <Link href="/locations">
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">View Locations</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Reports */}
            <Card className="text-center bg-white shadow-lg">
              <CardHeader>
                <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>रिपोर्ट्स | Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Access your assessment reports and documents
                </CardDescription>
                <Link href="/reports">
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">View Reports</Button>
                </Link>
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
      </div>
    </div>
  )
=======
import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { DashboardClient } from "@/components/dashboard/dashboard-client"

export default async function DashboardPage() {
  const supabase = await createServerClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("user_profiles").select("*").eq("id", data.user.id).single()

  // Get recent assessments
  const { data: assessments } = await supabase
    .from("assessments")
    .select("*")
    .eq("user_id", data.user.id)
    .order("created_at", { ascending: false })
    .limit(5)

  return <DashboardClient user={data.user} profile={profile} assessments={assessments || []} />
>>>>>>> d9ea4dd52e5151b7d7a3b9e7f958a04232a2b6cf
}
