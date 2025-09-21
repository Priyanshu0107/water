import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import AssessmentForm from "@/components/assessment/assessment-form"
import { Droplets } from "lucide-react"
import Link from "next/link"

export default async function NewAssessmentPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">New Assessment</h2>
            <p className="text-muted-foreground">
              Create a comprehensive rainwater harvesting assessment for your location
            </p>
          </div>

          <AssessmentForm userId={data.user.id} />
        </div>
      </div>
    </div>
  )
}
