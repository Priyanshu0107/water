<<<<<<< HEAD
// app/assessment/[id]/page.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AssessmentResults from "@/components/assessment/assessment-results";
import AssessmentForm from "@/components/assessment/assessment-form";
import { Droplets } from "lucide-react";
import Link from "next/link";

interface Params {
  id: string;
}

export default async function AssessmentPage({ params }: { params: Params }) {
  const { id } = params;
  const supabase = createClient();

  // Get current user
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    redirect("/auth/login");
  }

  // Fetch assessment with location info
=======
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
>>>>>>> d9ea4dd52e5151b7d7a3b9e7f958a04232a2b6cf
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
<<<<<<< HEAD
    .eq("user_id", userData.user.id)
    .single();

  if (assessmentError || !assessment) {
    redirect("/dashboard");
  }

  // Example steps for the form (replace with your real questions/fields)
  const steps = [
    { title: "Step 1", description: "Enter basic assessment info" },
    { title: "Step 2", description: "Answer survey questions" },
    { title: "Step 3", description: "Review and submit" },
  ];

=======
    .eq("user_id", data.user.id)
    .single()

  if (assessmentError || !assessment) {
    redirect("/dashboard")
  }

>>>>>>> d9ea4dd52e5151b7d7a3b9e7f958a04232a2b6cf
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
<<<<<<< HEAD
            <Link
              href="/dashboard"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
=======
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
>>>>>>> d9ea4dd52e5151b7d7a3b9e7f958a04232a2b6cf
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

<<<<<<< HEAD
      {/* Assessment Content */}
      <main className="container mx-auto px-4 py-8">
=======
      <div className="container mx-auto px-4 py-8">
>>>>>>> d9ea4dd52e5151b7d7a3b9e7f958a04232a2b6cf
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">{assessment.locations?.name}</h2>
            <p className="text-muted-foreground">{assessment.locations?.address}</p>
          </div>

<<<<<<< HEAD
          {/* Render dynamic form */}
          <AssessmentForm steps={steps} />

          {/* Optional: Show results */}
          <div className="mt-8">
            <AssessmentResults assessment={assessment} />
          </div>
        </div>
      </main>
    </div>
  );
=======
          <AssessmentResults assessment={assessment} />
        </div>
      </div>
    </div>
  )
>>>>>>> d9ea4dd52e5151b7d7a3b9e7f958a04232a2b6cf
}
