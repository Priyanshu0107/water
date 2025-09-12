// System sizing calculations for storage, filtration, and distribution

export interface SystemSizing {
  storage: {
    recommendedCapacity: number
    minimumCapacity: number
    tankConfiguration: string[]
    bufferCapacity: number
  }
  filtration: {
    sedimentFilter: boolean
    carbonFilter: boolean
    uvSterilizer: boolean
    flowRate: number
  }
  distribution: {
    pumpCapacity: number
    pumpType: string
    pressureTank: boolean
    pipingSize: number
  }
}

export function calculateSystemSizing(
  dailyWaterRequirement: number,
  practicalHarvestable: number,
  monthlyRainfall: number[],
  budgetRange: string,
  storagePreference: string,
): SystemSizing {
  // Calculate storage requirements
  const storageRequirements = calculateStorageRequirements(
    dailyWaterRequirement,
    practicalHarvestable,
    monthlyRainfall,
    storagePreference,
  )

  // Calculate filtration requirements
  const filtrationRequirements = calculateFiltrationRequirements(dailyWaterRequirement, budgetRange)

  // Calculate distribution requirements
  const distributionRequirements = calculateDistributionRequirements(
    dailyWaterRequirement,
    storageRequirements.recommendedCapacity,
  )

  return {
    storage: storageRequirements,
    filtration: filtrationRequirements,
    distribution: distributionRequirements,
  }
}

function calculateStorageRequirements(
  dailyWaterRequirement: number,
  practicalHarvestable: number,
  monthlyRainfall: number[],
  storagePreference: string,
) {
  // Find the longest dry period (consecutive months with <20mm rainfall)
  let maxDryPeriod = 0
  let currentDryPeriod = 0

  for (const rainfall of monthlyRainfall) {
    if (rainfall < 20) {
      currentDryPeriod++
      maxDryPeriod = Math.max(maxDryPeriod, currentDryPeriod)
    } else {
      currentDryPeriod = 0
    }
  }

  // Minimum storage: 15 days of water requirement
  const minimumCapacity = dailyWaterRequirement * 15

  // Recommended storage: dry period + buffer (max 90 days)
  const dryPeriodDays = Math.min(maxDryPeriod * 30, 90)
  const recommendedCapacity = Math.min(
    dailyWaterRequirement * (dryPeriodDays + 15),
    practicalHarvestable * 0.8, // Don't exceed 80% of harvestable potential
  )

  // Buffer capacity for peak rainfall events
  const bufferCapacity = recommendedCapacity * 0.2

  // Tank configuration based on preference and capacity
  const tankConfiguration = generateTankConfiguration(recommendedCapacity, storagePreference)

  return {
    recommendedCapacity,
    minimumCapacity,
    tankConfiguration,
    bufferCapacity,
  }
}

function generateTankConfiguration(capacity: number, preference: string): string[] {
  const configurations: string[] = []

  switch (preference) {
    case "underground_sump":
      if (capacity <= 10000) {
        configurations.push(`Underground Sump: ${capacity}L`)
      } else {
        const sumpSize = Math.floor(capacity / 10000) * 10000
        const remainingCapacity = capacity - sumpSize
        configurations.push(`Underground Sump: ${sumpSize}L`)
        if (remainingCapacity > 0) {
          configurations.push(`Additional Tank: ${remainingCapacity}L`)
        }
      }
      break

    case "overhead_tank":
      if (capacity <= 5000) {
        configurations.push(`Overhead Tank: ${capacity}L`)
      } else {
        configurations.push(`Overhead Tank: 5000L`)
        configurations.push(`Ground Storage: ${capacity - 5000}L`)
      }
      break

    case "modular_tanks":
      let remainingCapacity = capacity
      while (remainingCapacity > 0) {
        if (remainingCapacity >= 5000) {
          configurations.push("Modular Tank: 5000L")
          remainingCapacity -= 5000
        } else if (remainingCapacity >= 2000) {
          configurations.push("Modular Tank: 2000L")
          remainingCapacity -= 2000
        } else {
          configurations.push(`Modular Tank: ${remainingCapacity}L`)
          remainingCapacity = 0
        }
      }
      break

    default:
      // Auto-recommend based on capacity
      if (capacity <= 2000) {
        configurations.push(`Plastic Tank: ${capacity}L`)
      } else if (capacity <= 10000) {
        configurations.push(`Concrete Tank: ${capacity}L`)
      } else {
        configurations.push(`Underground Sump: ${capacity}L`)
      }
  }

  return configurations
}

function calculateFiltrationRequirements(dailyWaterRequirement: number, budgetRange: string) {
  const peakFlowRate = dailyWaterRequirement / 8 // Assume 8 hours of peak usage

  // Filtration requirements based on budget
  const budgetLevels = {
    budget_basic: { sediment: true, carbon: false, uv: false },
    budget_standard: { sediment: true, carbon: true, uv: false },
    budget_premium: { sediment: true, carbon: true, uv: true },
    budget_luxury: { sediment: true, carbon: true, uv: true },
    budget_flexible: { sediment: true, carbon: true, uv: true },
  }

  const requirements = budgetLevels[budgetRange as keyof typeof budgetLevels] || budgetLevels.budget_standard

  return {
    sedimentFilter: requirements.sediment,
    carbonFilter: requirements.carbon,
    uvSterilizer: requirements.uv,
    flowRate: peakFlowRate,
  }
}

function calculateDistributionRequirements(dailyWaterRequirement: number, storageCapacity: number) {
  // Calculate pump capacity (liters per hour)
  const pumpCapacity = Math.max(dailyWaterRequirement / 4, 500) // Minimum 4-hour fill time

  // Determine pump type based on capacity
  let pumpType = "centrifugal"
  if (pumpCapacity < 1000) {
    pumpType = "submersible_0.5hp"
  } else if (pumpCapacity < 2000) {
    pumpType = "submersible_1hp"
  } else {
    pumpType = "centrifugal_2hp"
  }

  // Pressure tank recommendation
  const pressureTank = dailyWaterRequirement > 1000

  // Piping size (mm diameter)
  let pipingSize = 25 // Default 1 inch
  if (pumpCapacity > 1500) pipingSize = 32 // 1.25 inch
  if (pumpCapacity > 3000) pipingSize = 40 // 1.5 inch

  return {
    pumpCapacity,
    pumpType,
    pressureTank,
    pipingSize,
  }
}
