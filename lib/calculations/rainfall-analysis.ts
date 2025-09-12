// Rainfall analysis and water harvesting potential calculations

export interface RainfallData {
  month: number
  rainfall_mm: number
  year: number
}

export interface RainfallAnalysis {
  annualRainfall: number
  monthlyDistribution: number[]
  peakMonths: number[]
  dryMonths: number[]
  rainySeasonTotal: number
  reliability: number
}

export function analyzeRainfall(rainfallData: RainfallData[]): RainfallAnalysis {
  // Group by month and calculate averages
  const monthlyTotals = Array(12).fill(0)
  const monthlyCount = Array(12).fill(0)

  rainfallData.forEach((data) => {
    const monthIndex = data.month - 1
    monthlyTotals[monthIndex] += data.rainfall_mm
    monthlyCount[monthIndex]++
  })

  const monthlyAverages = monthlyTotals.map((total, index) =>
    monthlyCount[index] > 0 ? total / monthlyCount[index] : 0,
  )

  const annualRainfall = monthlyAverages.reduce((sum, rainfall) => sum + rainfall, 0)

  // Identify peak months (>100mm) and dry months (<20mm)
  const peakMonths = monthlyAverages
    .map((rainfall, index) => ({ month: index + 1, rainfall }))
    .filter(({ rainfall }) => rainfall > 100)
    .map(({ month }) => month)

  const dryMonths = monthlyAverages
    .map((rainfall, index) => ({ month: index + 1, rainfall }))
    .filter(({ rainfall }) => rainfall < 20)
    .map(({ month }) => month)

  // Calculate rainy season total (June to September for India)
  const rainySeasonTotal = [5, 6, 7, 8].reduce((sum, monthIndex) => sum + monthlyAverages[monthIndex], 0)

  // Calculate reliability based on coefficient of variation
  const mean = annualRainfall
  const variance =
    rainfallData.reduce((sum, data) => {
      const yearlyTotal = rainfallData
        .filter((d) => d.year === data.year)
        .reduce((total, d) => total + d.rainfall_mm, 0)
      return sum + Math.pow(yearlyTotal - mean, 2)
    }, 0) / rainfallData.length

  const reliability = Math.max(0, 1 - Math.sqrt(variance) / mean)

  return {
    annualRainfall,
    monthlyDistribution: monthlyAverages,
    peakMonths,
    dryMonths,
    rainySeasonTotal,
    reliability,
  }
}

export function calculateHarvestablePotential(
  roofArea: number,
  annualRainfall: number,
  roofMaterial: string,
  roofSlope: number,
): {
  maxHarvestable: number
  practicalHarvestable: number
  runoffCoefficient: number
  losses: {
    evaporation: number
    firstFlush: number
    spillage: number
  }
} {
  // Runoff coefficients by roof material
  const runoffCoefficients: { [key: string]: number } = {
    concrete_rcc: 0.85,
    concrete_precast: 0.85,
    metal_corrugated: 0.9,
    metal_standing_seam: 0.95,
    tile_clay: 0.75,
    tile_concrete: 0.8,
    asbestos_sheet: 0.85,
    membrane_epdm: 0.9,
    other: 0.8,
  }

  const runoffCoefficient = runoffCoefficients[roofMaterial] || 0.8

  // Slope adjustment factor (steeper roofs have better runoff)
  const slopeAdjustment = Math.min(1.0, 0.85 + roofSlope * 0.01)

  // Maximum theoretical harvestable water (liters)
  const maxHarvestable = roofArea * (annualRainfall / 1000) * runoffCoefficient * slopeAdjustment * 1000

  // Calculate losses
  const evaporationLoss = maxHarvestable * 0.05 // 5% evaporation loss
  const firstFlushLoss = roofArea * 2 * 12 // 2mm first flush per month
  const spillageLoss = maxHarvestable * 0.1 // 10% spillage and system losses

  const totalLosses = evaporationLoss + firstFlushLoss + spillageLoss
  const practicalHarvestable = Math.max(0, maxHarvestable - totalLosses)

  return {
    maxHarvestable,
    practicalHarvestable,
    runoffCoefficient: runoffCoefficient * slopeAdjustment,
    losses: {
      evaporation: evaporationLoss,
      firstFlush: firstFlushLoss,
      spillage: spillageLoss,
    },
  }
}
