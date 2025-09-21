// Cost estimation and financial analysis

export interface CostBreakdown {
  components: {
    catchment: number
    storage: number
    filtration: number
    distribution: number
    installation: number
  }
  total: number
  breakdown: CostItem[]
}

export interface CostItem {
  category: string
  item: string
  quantity: number
  unit: string
  unitCost: number
  totalCost: number
}

export interface FinancialAnalysis {
  initialInvestment: number
  annualSavings: number
  paybackPeriod: number
  roi20Years: number
  maintenanceCosts: {
    annual: number
    breakdown: { item: string; cost: number }[]
  }
}

export function calculateSystemCost(
  roofArea: number,
  storageCapacity: number,
  filtrationRequirements: any,
  distributionRequirements: any,
  budgetRange: string,
  costComponents: any[],
): CostBreakdown {
  const breakdown: CostItem[] = []

  // Catchment system costs
  const catchmentCosts = calculateCatchmentCosts(roofArea, costComponents, breakdown)

  // Storage system costs
  const storageCosts = calculateStorageCosts(storageCapacity, costComponents, breakdown)

  // Filtration system costs
  const filtrationCosts = calculateFiltrationCosts(filtrationRequirements, costComponents, breakdown)

  // Distribution system costs
  const distributionCosts = calculateDistributionCosts(distributionRequirements, costComponents, breakdown)

  // Installation costs
  const installationCosts = calculateInstallationCosts(budgetRange, costComponents, breakdown)

  const total = catchmentCosts + storageCosts + filtrationCosts + distributionCosts + installationCosts

  return {
    components: {
      catchment: catchmentCosts,
      storage: storageCosts,
      filtration: filtrationCosts,
      distribution: distributionCosts,
      installation: installationCosts,
    },
    total,
    breakdown,
  }
}

function calculateCatchmentCosts(roofArea: number, costComponents: any[], breakdown: CostItem[]): number {
  let totalCost = 0

  // Gutter system
  const gutterLength = Math.sqrt(roofArea) * 4 * 1.2 // Perimeter + 20% extra
  const gutterCost = findComponentCost(costComponents, "catchment", "Gutter Installation")
  if (gutterCost) {
    const gutterTotal = gutterLength * gutterCost.unit_cost
    breakdown.push({
      category: "Catchment",
      item: "Gutter System",
      quantity: gutterLength,
      unit: "meters",
      unitCost: gutterCost.unit_cost,
      totalCost: gutterTotal,
    })
    totalCost += gutterTotal
  }

  // Downpipe system
  const downpipeLength = Math.ceil(roofArea / 50) * 6 // One downpipe per 50 sqm, 6m height
  const downpipeCost = findComponentCost(costComponents, "catchment", "Downpipe System")
  if (downpipeCost) {
    const downpipeTotal = downpipeLength * downpipeCost.unit_cost
    breakdown.push({
      category: "Catchment",
      item: "Downpipe System",
      quantity: downpipeLength,
      unit: "meters",
      unitCost: downpipeCost.unit_cost,
      totalCost: downpipeTotal,
    })
    totalCost += downpipeTotal
  }

  // First flush diverter
  const diverterCost = findComponentCost(costComponents, "catchment", "First Flush Diverter")
  if (diverterCost) {
    const diverterTotal = diverterCost.unit_cost
    breakdown.push({
      category: "Catchment",
      item: "First Flush Diverter",
      quantity: 1,
      unit: "unit",
      unitCost: diverterCost.unit_cost,
      totalCost: diverterTotal,
    })
    totalCost += diverterTotal
  }

  return totalCost
}

function calculateStorageCosts(storageCapacity: number, costComponents: any[], breakdown: CostItem[]): number {
  let totalCost = 0

  if (storageCapacity <= 5000) {
    // Use plastic tanks
    const tankSize = storageCapacity <= 1000 ? 1000 : storageCapacity <= 2000 ? 2000 : 5000
    const tankCost = findComponentCost(costComponents, "storage", `Plastic Tank (${tankSize}L)`)

    if (tankCost) {
      const quantity = Math.ceil(storageCapacity / tankSize)
      const tankTotal = quantity * tankCost.unit_cost
      breakdown.push({
        category: "Storage",
        item: `Plastic Tank (${tankSize}L)`,
        quantity,
        unit: "units",
        unitCost: tankCost.unit_cost,
        totalCost: tankTotal,
      })
      totalCost += tankTotal
    }
  } else if (storageCapacity <= 10000) {
    // Use concrete tank
    const concreteCost = findComponentCost(costComponents, "storage", "Concrete Tank (10000L)")
    if (concreteCost) {
      const concreteTotal = concreteCost.unit_cost
      breakdown.push({
        category: "Storage",
        item: "Concrete Tank",
        quantity: 1,
        unit: "unit",
        unitCost: concreteCost.unit_cost,
        totalCost: concreteTotal,
      })
      totalCost += concreteTotal
    }
  } else {
    // Use underground sump
    const sumpCost = findComponentCost(costComponents, "storage", "Underground Sump (20000L)")
    if (sumpCost) {
      const sumpTotal = sumpCost.unit_cost * (storageCapacity / 20000)
      breakdown.push({
        category: "Storage",
        item: "Underground Sump",
        quantity: storageCapacity / 20000,
        unit: "units",
        unitCost: sumpCost.unit_cost,
        totalCost: sumpTotal,
      })
      totalCost += sumpTotal
    }
  }

  return totalCost
}

function calculateFiltrationCosts(filtrationRequirements: any, costComponents: any[], breakdown: CostItem[]): number {
  let totalCost = 0

  if (filtrationRequirements.sedimentFilter) {
    const sedimentCost = findComponentCost(costComponents, "filtration", "Sediment Filter")
    if (sedimentCost) {
      breakdown.push({
        category: "Filtration",
        item: "Sediment Filter",
        quantity: 1,
        unit: "unit",
        unitCost: sedimentCost.unit_cost,
        totalCost: sedimentCost.unit_cost,
      })
      totalCost += sedimentCost.unit_cost
    }
  }

  if (filtrationRequirements.carbonFilter) {
    const carbonCost = findComponentCost(costComponents, "filtration", "Carbon Filter")
    if (carbonCost) {
      breakdown.push({
        category: "Filtration",
        item: "Carbon Filter",
        quantity: 1,
        unit: "unit",
        unitCost: carbonCost.unit_cost,
        totalCost: carbonCost.unit_cost,
      })
      totalCost += carbonCost.unit_cost
    }
  }

  if (filtrationRequirements.uvSterilizer) {
    const uvCost = findComponentCost(costComponents, "filtration", "UV Sterilizer")
    if (uvCost) {
      breakdown.push({
        category: "Filtration",
        item: "UV Sterilizer",
        quantity: 1,
        unit: "unit",
        unitCost: uvCost.unit_cost,
        totalCost: uvCost.unit_cost,
      })
      totalCost += uvCost.unit_cost
    }
  }

  return totalCost
}

function calculateDistributionCosts(
  distributionRequirements: any,
  costComponents: any[],
  breakdown: CostItem[],
): number {
  let totalCost = 0

  // Pump system
  const pumpType = distributionRequirements.pumpCapacity < 1000 ? "0.5HP" : "1HP"
  const pumpCost = findComponentCost(costComponents, "distribution", `Pump System (${pumpType})`)
  if (pumpCost) {
    breakdown.push({
      category: "Distribution",
      item: `Pump System (${pumpType})`,
      quantity: 1,
      unit: "unit",
      unitCost: pumpCost.unit_cost,
      totalCost: pumpCost.unit_cost,
    })
    totalCost += pumpCost.unit_cost
  }

  // Pressure tank
  if (distributionRequirements.pressureTank) {
    const pressureCost = findComponentCost(costComponents, "distribution", "Pressure Tank")
    if (pressureCost) {
      breakdown.push({
        category: "Distribution",
        item: "Pressure Tank",
        quantity: 1,
        unit: "unit",
        unitCost: pressureCost.unit_cost,
        totalCost: pressureCost.unit_cost,
      })
      totalCost += pressureCost.unit_cost
    }
  }

  // Distribution piping (estimated 50 meters)
  const pipingCost = findComponentCost(costComponents, "distribution", "Distribution Piping")
  if (pipingCost) {
    const pipingLength = 50
    const pipingTotal = pipingLength * pipingCost.unit_cost
    breakdown.push({
      category: "Distribution",
      item: "Distribution Piping",
      quantity: pipingLength,
      unit: "meters",
      unitCost: pipingCost.unit_cost,
      totalCost: pipingTotal,
    })
    totalCost += pipingTotal
  }

  return totalCost
}

function calculateInstallationCosts(budgetRange: string, costComponents: any[], breakdown: CostItem[]): number {
  let totalCost = 0

  const installationCost = findComponentCost(costComponents, "installation", "System Installation")
  if (installationCost) {
    breakdown.push({
      category: "Installation",
      item: "System Installation",
      quantity: 1,
      unit: "system",
      unitCost: installationCost.unit_cost,
      totalCost: installationCost.unit_cost,
    })
    totalCost += installationCost.unit_cost
  }

  const electricalCost = findComponentCost(costComponents, "installation", "Electrical Work")
  if (electricalCost) {
    breakdown.push({
      category: "Installation",
      item: "Electrical Work",
      quantity: 1,
      unit: "system",
      unitCost: electricalCost.unit_cost,
      totalCost: electricalCost.unit_cost,
    })
    totalCost += electricalCost.unit_cost
  }

  return totalCost
}

function findComponentCost(costComponents: any[], category: string, name: string) {
  return costComponents.find(
    (component) => component.component_type === category && component.component_name === name && component.is_active,
  )
}

export function calculateFinancialAnalysis(
  systemCost: number,
  dailyWaterRequirement: number,
  currentWaterCost = 3, // INR per liter
): FinancialAnalysis {
  const annualWaterSavings = dailyWaterRequirement * 365 * currentWaterCost
  const paybackPeriod = systemCost / annualWaterSavings

  // Calculate 20-year ROI
  const totalSavings20Years = annualWaterSavings * 20
  const maintenanceCost20Years = systemCost * 0.02 * 20 // 2% annual maintenance
  const netSavings20Years = totalSavings20Years - maintenanceCost20Years - systemCost
  const roi20Years = (netSavings20Years / systemCost) * 100

  const annualMaintenanceCost = systemCost * 0.02
  const maintenanceBreakdown = [
    { item: "Filter Replacement", cost: annualMaintenanceCost * 0.4 },
    { item: "Pump Maintenance", cost: annualMaintenanceCost * 0.3 },
    { item: "Tank Cleaning", cost: annualMaintenanceCost * 0.2 },
    { item: "General Maintenance", cost: annualMaintenanceCost * 0.1 },
  ]

  return {
    initialInvestment: systemCost,
    annualSavings: annualWaterSavings,
    paybackPeriod,
    roi20Years,
    maintenanceCosts: {
      annual: annualMaintenanceCost,
      breakdown: maintenanceBreakdown,
    },
  }
}
