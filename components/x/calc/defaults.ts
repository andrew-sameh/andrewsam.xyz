export type TaxBracket = {
  from: number
  to: number
  percentage: number
}

export type Tier = {
  tier: number
  taxBrackets: TaxBracket[]
}

export type Lap = {
  months: number
  percentage: number
}

export type LapCategories = {
  half: Lap
  one: Lap
  oneAndHalf: Lap
  two: Lap
  twoAndHalf: Lap
}

export type Insurance = {
  minimumLimit: number
  maximumLimit: number
  employeeContributionPercentage: number
  employerContributionPercentage: number
}

export type TaxData = {
  tiers: Tier[]
  lap: LapCategories
  nonTaxable: number
  adjustmentRate: number
  allocationRate: number
  martyrsTaxRate: number
  virtualIncreasePercentage: number
  insurance: Insurance
}

export const taxData: TaxData = {
  tiers: [
    {
      tier: 1,
      taxBrackets: [
        { from: 0, to: 40000, percentage: 0.0 },
        { from: 40000.001, to: 55000, percentage: 0.1 },
        { from: 55000.001, to: 70000, percentage: 0.15 },
        { from: 70000.001, to: 200000, percentage: 0.2 },
        { from: 200000.001, to: 400000, percentage: 0.225 },
        { from: 400000.001, to: 600000, percentage: 0.25 },
      ],
    },
    {
      tier: 2,
      taxBrackets: [
        { from: 0, to: 55000, percentage: 0.1 },
        { from: 55000.001, to: 70000, percentage: 0.15 },
        { from: 70000.001, to: 200000, percentage: 0.2 },
        { from: 200000.001, to: 400000, percentage: 0.225 },
        { from: 400000.001, to: 700000, percentage: 0.25 },
      ],
    },
    {
      tier: 3,
      taxBrackets: [
        { from: 0, to: 70000, percentage: 0.15 },
        { from: 70000.001, to: 200000, percentage: 0.2 },
        { from: 200000.001, to: 400000, percentage: 0.225 },
        { from: 400000.001, to: 800000, percentage: 0.25 },
      ],
    },
    {
      tier: 4,
      taxBrackets: [
        { from: 0, to: 200000, percentage: 0.2 },
        { from: 200000.001, to: 400000, percentage: 0.225 },
        { from: 400000.001, to: 900000, percentage: 0.25 },
      ],
    },
    {
      tier: 5,
      taxBrackets: [
        { from: 0, to: 400000, percentage: 0.225 },
        { from: 400000.001, to: 1200000, percentage: 0.25 },
      ],
    },
    {
      tier: 6,
      taxBrackets: [
        { from: 0, to: 1200000, percentage: 0.25 },
        { from: 1200000.001, to: 99999999999, percentage: 0.275 },
      ],
    },
  ],
  lap: {
    half: { months: 6, percentage: 0.25 },
    one: { months: 12, percentage: 0.3 },
    oneAndHalf: { months: 18, percentage: 0.35 },
    two: { months: 24, percentage: 0.4 },
    twoAndHalf: { months: 30, percentage: 0.5 },
  },
  nonTaxable: 20000,
  adjustmentRate: 0.0,
  allocationRate: 1.5,
  martyrsTaxRate: 0,
  virtualIncreasePercentage: 0,
  insurance: {
    minimumLimit: 1700,
    maximumLimit: 12600,
    employeeContributionPercentage: 0.11,
    employerContributionPercentage: 0.1875,
  },
}
