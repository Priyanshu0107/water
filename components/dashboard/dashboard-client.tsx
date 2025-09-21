"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, FileText, MapPin, Calendar, Droplets } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"
import { Navigation } from "@/components/ui/navigation"

interface DashboardClientProps {
  user: any
  profile: any
  assessments: any[]
}

export function DashboardClient({ user, profile, assessments }: DashboardClientProps) {
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-background">
      <Navigation user={user} />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{t("dashboard.title")}</h2>
          <p className="text-muted-foreground">
            {t("dashboard.welcome")}, {profile?.full_name || user.email}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <Plus className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle>{t("dashboard.newAssessment")}</CardTitle>
              <CardDescription>Start a new rainwater harvesting assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/assessment/new">
                <Button className="w-full">{t("dashboard.newAssessment")}</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle>Manage Locations</CardTitle>
              <CardDescription>Add and manage your project locations</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/locations">
                <Button variant="outline" className="w-full bg-transparent">
                  View Locations
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <FileText className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle>Reports</CardTitle>
              <CardDescription>Access your assessment reports and documents</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/reports">
                <Button variant="outline" className="w-full bg-transparent">
                  View Reports
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Assessments */}
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.myAssessments")}</CardTitle>
            <CardDescription>Your latest rainwater harvesting assessments</CardDescription>
          </CardHeader>
          <CardContent>
            {assessments && assessments.length > 0 ? (
              <div className="space-y-4">
                {assessments.map((assessment: any) => (
                  <div
                    key={assessment.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Droplets className="w-5 h-5 text-primary" />
                        <div>
                          <h4 className="font-medium">
                            {assessment.city}, {assessment.state}
                          </h4>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {t("dashboard.location")}: {assessment.address}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {t("dashboard.createdOn")}: {new Date(assessment.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right text-sm">
                        <div className="font-medium">
                          {Math.round(assessment.annual_harvest_potential || 0).toLocaleString()}L/year
                        </div>
                        <div className="text-muted-foreground">{t("dashboard.harvestPotential")}</div>
                      </div>
                      <Badge variant={assessment.status === "completed" ? "default" : "secondary"}>
                        {assessment.status || "completed"}
                      </Badge>
                      <Link href={`/assessment/${assessment.id}`}>
                        <Button variant="outline" size="sm">
                          {t("dashboard.viewResults")}
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Droplets className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">{t("dashboard.noAssessments")}</p>
                <p className="text-sm text-muted-foreground mb-6">{t("dashboard.noAssessmentsDescription")}</p>
                <Link href="/assessment/new">
                  <Button>{t("dashboard.newAssessment")}</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
