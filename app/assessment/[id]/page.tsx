import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import AssessmentResults from "@/components/assessment/assessment-results"
import { Droplets } from "lucide-react"
import Link from "next/link"

export default async function AssessmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get assessment data
  const { data: assessment, error: assessmentError } = await supabase
    .from("assessments")
    .select(`
      *,
      locations (
        name,
        address,
        latitude,
        longitude,
        district,
        state
      )
    `)
    .eq("id", id)
    .eq("user_id", data.user.id)
    .single()

  if (assessmentError || !assessment) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Droplets className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">AquaHarvest</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">{assessment.locations?.name}</h2>
            <p className="text-muted-foreground">{assessment.locations?.address}</p>
          </div>

          <AssessmentResults assessment={assessment} />
        </div>
      </div>
    </div>
  )
}
