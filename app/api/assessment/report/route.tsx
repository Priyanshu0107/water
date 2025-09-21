import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

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
          name,
          address,
          latitude,
          longitude,
          district,
          state
        )
      `)
      .eq("id", assessmentId)
      .eq("user_id", user.id)
      .single()

    if (assessmentError || !assessment) {
      return NextResponse.json({ error: "Assessment not found" }, { status: 404 })
    }

    // Generate PDF report (simplified version - in production, use a proper PDF library)
    const reportContent = generateReportHTML(assessment)

    // For now, return HTML that can be converted to PDF on the client side
    // In production, you would use libraries like puppeteer, jsPDF, or similar
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Rainwater Harvesting Assessment Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            .header { text-align: center; border-bottom: 2px solid #059669; padding-bottom: 20px; margin-bottom: 30px; }
            .logo { color: #059669; font-size: 24px; font-weight: bold; }
            .section { margin-bottom: 30px; }
            .section h2 { color: #059669; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
            .card { border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px; }
            .highlight { background-color: #f0fdf4; padding: 15px; border-radius: 8px; border-left: 4px solid #059669; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { padding: 8px; text-align: left; border-bottom: 1px solid #e5e7eb; }
            th { background-color: #f9fafb; font-weight: 600; }
            .text-primary { color: #059669; }
            .text-muted { color: #6b7280; }
            @media print { body { margin: 20px; } }
          </style>
        </head>
        <body>
          ${reportContent}
        </body>
      </html>
    `

    // Create a blob and return it
    const buffer = Buffer.from(htmlContent, "utf-8")

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "text/html",
        "Content-Disposition": `attachment; filename="rainwater-assessment-${assessmentId}.html"`,
      },
    })
  } catch (error) {
    console.error("Report generation error:", error)
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 })
  }
}

function generateReportHTML(assessment: any): string {
  const currentDate = new Date().toLocaleDateString()

  return `
    <div class="header">
      <div class="logo">🌧️ AquaHarvest</div>
      <h1>Rainwater Harvesting Assessment Report</h1>
      <p class="text-muted">Generated on ${currentDate}</p>
    </div>

    <div class="section">
      <h2>Project Overview</h2>
      <div class="grid">
        <div class="card">
          <h3>Location Details</h3>
          <p><strong>Project Name:</strong> ${assessment.locations?.name}</p>
          <p><strong>Address:</strong> ${assessment.locations?.address}</p>
          <p><strong>District:</strong> ${assessment.locations?.district}</p>
          <p><strong>State:</strong> ${assessment.locations?.state}</p>
        </div>
        <div class="card">
          <h3>Building Specifications</h3>
          <p><strong>Building Type:</strong> ${assessment.building_type}</p>
          <p><strong>Roof Area:</strong> ${assessment.roof_area} sq.m</p>
          <p><strong>Roof Material:</strong> ${assessment.roof_material}</p>
          <p><strong>Number of Floors:</strong> ${assessment.number_of_floors}</p>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>Water Requirements</h2>
      <div class="card">
        <p><strong>Household Size:</strong> ${assessment.household_size} people</p>
        <p><strong>Daily Water Requirement:</strong> ${assessment.daily_water_requirement} liters</p>
        <p><strong>Annual Water Requirement:</strong> ${(assessment.daily_water_requirement * 365).toLocaleString()} liters</p>
        <p><strong>Seasonal Variation:</strong> ${assessment.seasonal_variation ? "Yes" : "No"}</p>
      </div>
    </div>

    <div class="section">
      <h2>Assessment Results</h2>
      <div class="highlight">
        <h3>Key Findings</h3>
        <div class="grid">
          <div>
            <p><strong>Annual Rainfall:</strong> <span class="text-primary">${assessment.annual_rainfall ? Math.round(assessment.annual_rainfall) : "Calculating..."} mm</span></p>
            <p><strong>Harvestable Water:</strong> <span class="text-primary">${assessment.harvestable_water ? Math.round(assessment.harvestable_water).toLocaleString() : "Calculating..."} L/year</span></p>
          </div>
          <div>
            <p><strong>Recommended Storage:</strong> <span class="text-primary">${assessment.storage_capacity ? Math.round(assessment.storage_capacity).toLocaleString() : "Calculating..."} L</span></p>
            <p><strong>System Cost:</strong> <span class="text-primary">₹${assessment.system_cost ? assessment.system_cost.toLocaleString() : "Calculating..."}</span></p>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>Financial Analysis</h2>
      <table>
        <tr>
          <th>Parameter</th>
          <th>Value</th>
        </tr>
        <tr>
          <td>Initial Investment</td>
          <td>₹${assessment.system_cost ? assessment.system_cost.toLocaleString() : "TBD"}</td>
        </tr>
        <tr>
          <td>Annual Water Savings</td>
          <td>₹${assessment.water_savings ? Math.round(assessment.water_savings).toLocaleString() : "TBD"}</td>
        </tr>
        <tr>
          <td>Payback Period</td>
          <td>${assessment.payback_period ? assessment.payback_period.toFixed(1) : "TBD"} years</td>
        </tr>
      </table>
    </div>

    <div class="section">
      <h2>System Preferences</h2>
      <div class="card">
        <p><strong>Storage Preference:</strong> ${assessment.storage_preference}</p>
        <p><strong>Budget Range:</strong> ${assessment.budget_range}</p>
        <p><strong>Maintenance Preference:</strong> ${assessment.maintenance_preference}</p>
      </div>
    </div>

    <div class="section">
      <h2>Recommendations</h2>
      <div class="highlight">
        <h3>Next Steps</h3>
        <ol>
          <li>Finalize system design based on assessment results</li>
          <li>Obtain necessary permits and approvals</li>
          <li>Select qualified contractors for installation</li>
          <li>Schedule regular maintenance after installation</li>
        </ol>
      </div>
    </div>

    <div class="section">
      <p class="text-muted" style="text-align: center; margin-top: 40px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
        This report was generated by AquaHarvest - Professional Rainwater Harvesting Assessment Platform<br>
        For technical support, contact: support@aquaharvest.com
      </p>
    </div>
  `
}
