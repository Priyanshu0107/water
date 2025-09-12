import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { analyzeRainfall, calculateHarvestablePotential } from "@/lib/calculations/rainfall-analysis"
import { calculateSystemSizing } from "@/lib/calculations/system-sizing"
import { calculateSystemCost, calculateFinancialAnalysis } from "@/lib/calculations/cost-estimation"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Verify authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { assessmentId } = await request.json()

    // Get assessment data
    const { data: assessment, error: assessmentError } = await supabase
      .from("assessments")
      .select(`
        *,
        locations (
          latitude,
          longitude,
          coordinates
        )
      `)
      .eq("id", assessmentId)
      .eq("user_id", user.id)
      .single()

    if (assessmentError || !assessment) {
      return NextResponse.json({ error: "Assessment not found" }, { status: 404 })
    }

    // Get rainfall data for the location (within 50km radius)
    const { data: rainfallData, error: rainfallError } = await supabase.rpc("get_nearby_rainfall_data", {
      target_lat: assessment.locations.latitude,
      target_lng: assessment.locations.longitude,
      radius_km: 50,
    })

    if (rainfallError) {
      console.error("Rainfall data error:", rainfallError)
      // Use default rainfall data if query fails
    }

    // Use mock rainfall data if no data available
    const mockRainfallData = [
      { month: 1, rainfall_mm: 15, year: 2023 },
      { month: 2, rainfall_mm: 20, year: 2023 },
      { month: 3, rainfall_mm: 25, year: 2023 },
      { month: 4, rainfall_mm: 35, year: 2023 },
      { month: 5, rainfall_mm: 85, year: 2023 },
      { month: 6, rainfall_mm: 185, year: 2023 },
      { month: 7, rainfall_mm: 285, year: 2023 },
      { month: 8, rainfall_mm: 245, year: 2023 },
      { month: 9, rainfall_mm: 165, year: 2023 },
      { month: 10, rainfall_mm: 65, year: 2023 },
      { month: 11, rainfall_mm: 25, year: 2023 },
      { month: 12, rainfall_mm: 10, year: 2023 },
    ]

    const finalRainfallData = rainfallData && rainfallData.length > 0 ? rainfallData : mockRainfallData

    // Perform calculations
    const rainfallAnalysis = analyzeRainfall(finalRainfallData)

    const harvestingPotential = calculateHarvestablePotential(
      assessment.roof_area,
      rainfallAnalysis.annualRainfall,
      assessment.roof_material,
      assessment.roof_slope,
    )

    const systemSizing = calculateSystemSizing(
      assessment.daily_water_requirement,
      harvestingPotential.practicalHarvestable,
      rainfallAnalysis.monthlyDistribution,
      assessment.budget_range,
      assessment.storage_preference,
    )

    // Get cost components
    const { data: costComponents } = await supabase.from("cost_components").select("*").eq("is_active", true)

    const costBreakdown = calculateSystemCost(
      assessment.roof_area,
      systemSizing.storage.recommendedCapacity,
      systemSizing.filtration,
      systemSizing.distribution,
      assessment.budget_range,
      costComponents || [],
    )

    const financialAnalysis = calculateFinancialAnalysis(costBreakdown.total, assessment.daily_water_requirement)

    // Update assessment with calculated results
    const { error: updateError } = await supabase
      .from("assessments")
      .update({
        annual_rainfall: rainfallAnalysis.annualRainfall,
        harvestable_water: harvestingPotential.practicalHarvestable,
        storage_capacity: systemSizing.storage.recommendedCapacity,
        system_cost: costBreakdown.total,
        payback_period: financialAnalysis.paybackPeriod,
        water_savings: financialAnalysis.annualSavings,
        status: "completed",
      })
      .eq("id", assessmentId)

    if (updateError) {
      console.error("Update error:", updateError)
    }

    // Create system recommendations
    const recommendations = [
      {
        assessment_id: assessmentId,
        recommendation_type: "optimal",
        components: {
          storage: systemSizing.storage,
          filtration: systemSizing.filtration,
          distribution: systemSizing.distribution,
        },
        total_cost: costBreakdown.total,
        installation_time: "2-4 weeks",
        maintenance_requirements: "Monthly filter check, quarterly pump maintenance",
        efficiency_rating: 0.85,
        suitability_score: 0.9,
      },
    ]

    const { error: recommendationError } = await supabase.from("system_recommendations").insert(recommendations)

    if (recommendationError) {
      console.error("Recommendation error:", recommendationError)
    }

    return NextResponse.json({
      success: true,
      results: {
        rainfallAnalysis,
        harvestingPotential,
        systemSizing,
        costBreakdown,
        financialAnalysis,
      },
    })
  } catch (error) {
    console.error("Calculation error:", error)
    return NextResponse.json({ error: "Failed to calculate assessment" }, { status: 500 })
  }
}
