import { differenceInMonths, parse } from 'date-fns'
import {
  type TaxBracket,
  type Tier,
  type Lap,
  type LapCategories,
  type Insurance,
  type TaxData,
  taxData as defaultTaxData,
} from './defaults'

interface SocialInsuranceResult {
  social_insurance_salary: number
  employee_contribution: number
  employer_contribution: number
}

function calculateMonthsDifference(userInputDate: Date): number {
  // Get today's date
  const todayDate = new Date()

  // Convert the user input date to a Date object
  //   const userDate = parse(userInputDate, 'yyyy-MM-dd', new Date())

  // Calculate the difference in months
  const monthsDifference = differenceInMonths(todayDate, userInputDate)

  return monthsDifference
}

function calculateRemainingMonths(months: number): number {
  const remainingMonths = months % 6 === 0 ? 6 : 6 - (months % 6)
  return remainingMonths
}

function calculateLAPBonus(months: number, lapData: LapCategories): number {
  if (months <= 6) {
    return lapData.half.percentage
  } else if (months <= 12) {
    return lapData.one.percentage
  } else if (months <= 18) {
    return lapData.oneAndHalf.percentage
  } else if (months <= 24) {
    return lapData.two.percentage
  } else {
    return lapData.twoAndHalf.percentage
  }
}

function calculateSocialInsurance(
  grossSalary: number,
  insuranceData: Insurance
): SocialInsuranceResult {
  // Social insurance salary limits as of 1 January 2023
  const minimumLimit = insuranceData.minimumLimit
  const maximumLimit = insuranceData.maximumLimit

  // Calculate the total social insurance salary
  let socialInsuranceSalary = Math.min(Math.max(grossSalary, minimumLimit), maximumLimit)
  if (grossSalary < minimumLimit) {
    socialInsuranceSalary = 0
  }

  // Calculate employee and employer contributions
  const employeeContributionPercentage = insuranceData.employeeContributionPercentage
  const employerContributionPercentage = insuranceData.employerContributionPercentage

  const employeeContribution = socialInsuranceSalary * employeeContributionPercentage
  const employerContribution = socialInsuranceSalary * employerContributionPercentage

  return {
    social_insurance_salary: socialInsuranceSalary,
    employee_contribution: employeeContribution,
    employer_contribution: employerContribution,
  }
}

interface GrossSalaryComponents {
  salary: number
  bonus: number
  adjustment: number
  lap: number
  allocations: number
}

interface TaxPerBracket {
  bracket: string
  percentage: number
  tax: number
  bracketIndex: number
}

interface ComponentTax {
  [key: string]: {
    total_tax: number
    tax_brackets: TaxPerBracket[]
  }
}

interface ComponentTaxMonthly {
  [key: string]: {
    total_tax: number
    tax_brackets: TaxPerBracket[]
  }
}

// function calculateTax(
//   grossSalaryComponents: GrossSalaryComponents,
//   taxData: TaxData
// ): [number, number, ComponentTax, ComponentTaxMonthly] {
//   const salary = grossSalaryComponents.salary
//   const bonus = grossSalaryComponents.bonus
//   const adjustment = grossSalaryComponents.adjustment
//   const LAP = grossSalaryComponents.lap
//   const allocations = grossSalaryComponents.allocations

//   let grossSalary = salary + bonus + adjustment + LAP + allocations

//   let tier: number | null = null
//   let taxBrackets: TaxBracket[] = []

//   if (grossSalary < 0) {
//     grossSalary = 0
//   }

//   for (const tierData of taxData.tiers) {
//     if (
//       tierData.taxBrackets[0].from <= grossSalary &&
//       grossSalary < tierData.taxBrackets[tierData.taxBrackets.length - 1].to
//     ) {
//       tier = tierData.tier
//       taxBrackets = tierData.taxBrackets
//       break
//     }
//   }

//   if (tier === null) {
//     throw new Error('Invalid gross_salary. No matching tax brackets found.')
//   }

//   let totalTax = 0
//   let taxPerBracket: ComponentTax = { total_tax: 0, tax_brackets: [] }
//   let taxPerBracketMonthly: ComponentTaxMonthly = { total_tax: 0, tax_brackets: [] }

//   let lastbracketDict: TaxBracket | null = null
//   let lastAmount = 0
//   let lastBracket = 0
//   let totalGross = 0

//   const components = {
//     Salary: salary,
//     Bonus: bonus,
//     Allocations: allocations,
//     LAP: LAP,
//     Adjustment: adjustment,
//   }

//   for (const [component, componentGross] of Object.entries(components)) {
//     let componentTotalTax = 0
//     const componentTaxPerBracket: TaxPerBracket[] = []
//     const componentTaxPerBracketMonthly: TaxPerBracket[] = []
//     const taxBracketsX = taxBrackets.slice(lastBracket)

//     if (lastbracketDict) {
//       taxBracketsX[0] = lastbracketDict
//     }

//     totalGross += componentGross

//     for (const bracket of taxBracketsX) {
//       lastBracket++
//       const bracketFrom = bracket.from
//       const bracketTo = bracket.to
//       const taxPercentage = bracket.percentage

//       const taxableAmount = Math.min(totalGross, bracketTo) - bracketFrom

//       if (taxableAmount > 0) {
//         const bracketTax = taxableAmount * taxPercentage
//         componentTotalTax += bracketTax
//         componentTaxPerBracket.push({
//           bracket: `${bracketFrom}-${bracketTo}`,
//           percentage: taxPercentage,
//           tax: bracketTax,
//         })
//         componentTaxPerBracketMonthly.push({
//           bracket: `${Math.floor(bracketFrom / 12)}-${Math.floor(bracketTo / 12)}`,
//           percentage: taxPercentage,
//           tax: Math.round((bracketTax / 12) * 100) / 100,
//         })
//       }

//       if (totalGross <= bracketTo) {
//         lastAmount = taxableAmount
//         lastBracket--
//         lastbracketDict = {
//           from: bracket.from + lastAmount,
//           to: bracket.to,
//           percentage: bracket.percentage,
//         }
//         break
//       }
//     }

//     taxPerBracket[component] = {
//       total_tax: componentTotalTax,
//       tax_brackets: componentTaxPerBracket,
//     }
//     taxPerBracketMonthly[component] = {
//       total_tax: componentTotalTax / 12,
//       tax_brackets: componentTaxPerBracketMonthly,
//     }

//     totalTax += componentTotalTax
//   }

//   return [tier, totalTax, taxPerBracket, taxPerBracketMonthly]
// }

function calculateTax(
  grossSalaryComponents: GrossSalaryComponents,
  taxData: TaxData
): [number, number, ComponentTax, ComponentTaxMonthly] {
  const { salary, bonus, adjustment, lap: LAP, allocations } = grossSalaryComponents

  let grossSalary = salary + bonus + adjustment + LAP + allocations
  if (grossSalary < 0) grossSalary = 0

  let tier: number | null = null
  let taxBrackets: TaxBracket[] = []

  for (const tierData of taxData.tiers) {
    if (
      tierData.taxBrackets[0].from <= grossSalary &&
      grossSalary < tierData.taxBrackets[tierData.taxBrackets.length - 1].to
    ) {
      tier = tierData.tier
      taxBrackets = tierData.taxBrackets
      break
    }
  }

  if (tier === null) {
    throw new Error('Invalid gross_salary. No matching tax brackets found.')
  }

  let totalTax = 0
  const taxPerBracket: ComponentTax = {}
  const taxPerBracketMonthly: ComponentTaxMonthly = {}

  let lastBracketDict: TaxBracket | null = null
  let lastAmount = 0
  let lastBracketIndex = 0
  let totalGross = 0

  const components = {
    Salary: salary,
    Bonus: bonus,
    Allocations: allocations,
    LAP: LAP,
    Adjustment: adjustment,
  }

  for (const [component, componentGross] of Object.entries(components)) {
    let componentTotalTax = 0
    const componentTaxPerBracket: TaxPerBracket[] = []
    const componentTaxPerBracketMonthly: TaxPerBracket[] = []
    const taxBracketsX = taxBrackets.slice(lastBracketIndex)

    if (lastBracketDict) {
      taxBracketsX[0] = lastBracketDict
    }

    totalGross += componentGross

    for (const bracket of taxBracketsX) {
      const bracketFrom = bracket.from
      const bracketTo = bracket.to
      const taxPercentage = bracket.percentage

      const taxableAmount = Math.min(totalGross, bracketTo) - bracketFrom

      if (taxableAmount > 0) {
        const bracketTax = taxableAmount * taxPercentage
        componentTotalTax += bracketTax
        componentTaxPerBracket.push({
          bracket: `${bracketFrom}-${bracketTo}`,
          percentage: taxPercentage,
          tax: bracketTax,
          bracketIndex: lastBracketIndex,
        })
        componentTaxPerBracketMonthly.push({
          bracket: `${Math.floor(bracketFrom / 12)}-${Math.floor(bracketTo / 12)}`,
          percentage: taxPercentage,
          tax: Math.round((bracketTax / 12) * 100) / 100,
          bracketIndex: lastBracketIndex,
        })
      }

      if (totalGross <= bracketTo) {
        lastAmount = taxableAmount
        lastBracketDict = {
          from: bracket.from + lastAmount,
          to: bracket.to,
          percentage: bracket.percentage,
        }
        break
      } else {
        lastBracketIndex++
      }
    }

    taxPerBracket[component] = {
      total_tax: componentTotalTax,
      tax_brackets: componentTaxPerBracket,
    }
    taxPerBracketMonthly[component] = {
      total_tax: componentTotalTax / 12,
      tax_brackets: componentTaxPerBracketMonthly,
    }

    totalTax += componentTotalTax
  }

  return [tier, totalTax, taxPerBracket, taxPerBracketMonthly]
}

function getChartLabels(tier: number, taxData: TaxData): string[] {
  const labels: string[] = []
  for (const tierData of taxData.tiers) {
    if (tierData.tier === tier) {
      for (const bracket of tierData.taxBrackets) {
        labels.push(
          `${Math.floor(bracket.from / 12)} - ${Math.floor(bracket.to / 12)} ${Math.round(bracket.percentage * 10000) / 100}%`
        )
      }
      return labels
    }
  }
  return labels
}

export function getSalaryDict(
  datePicker: Date,
  grossSalaryBase: number,
  bonus: number,
  LAP: number,
  allocations: number,
  taxableDeduction: number,
  bonusBase: number,
  adjustmentsRate: number,
  taxData: TaxData = defaultTaxData
): SalaryBreakdown {
  const nonTaxable = taxData.nonTaxable
  const adjustmentRate = adjustmentsRate
  const bonusTaxBase = bonusBase
  const allocationRate = taxData.allocationRate
  const martyrsTaxRate = taxData.martyrsTaxRate
  const dailyRate = grossSalaryBase / 30

  const allocationDailyRate = dailyRate * allocationRate
  const grossAllocations = allocationDailyRate * allocations
  const annualAllocation = dailyRate * 5
  const adjustments = grossSalaryBase * adjustmentRate
  const monthlyNonTaxable = nonTaxable / 12
  const socialInsurance = calculateSocialInsurance(grossSalaryBase, taxData.insurance)

  // let taxTier: number
  // let totalTax: number
  // let taxPerBracket: ComponentTax
  // let taxPerBracketMonthly: ComponentTaxMonthly

  const totalMonthly = grossSalaryBase - taxableDeduction
  const totalMonthlyCombined =
    grossSalaryBase + adjustments + bonus + LAP + grossAllocations - taxableDeduction
  const totalMonthlyTaxable = Math.max(
    totalMonthlyCombined - socialInsurance.employee_contribution - monthlyNonTaxable,
    0
  )
  const annualGrossTaxable = Math.floor((totalMonthlyTaxable * 12) / 10) * 10
  const bonusTaxPar = bonus * 12
  const adjustmentTaxPar = adjustments * 12
  const LAPTaxPar = LAP * 12
  const allocationsTaxPar = grossAllocations * 12
  const salaryTaxPar =
    annualGrossTaxable - bonusTaxPar - adjustmentTaxPar - LAPTaxPar - allocationsTaxPar

  const [taxTier, totalTax, taxPerBracket, taxPerBracketMonthly] = calculateTax(
    {
      salary: salaryTaxPar,
      bonus: bonusTaxPar,
      adjustment: adjustmentTaxPar,
      lap: LAPTaxPar,
      allocations: allocationsTaxPar,
    },
    taxData
  )

  const salaryTax = taxPerBracket['Salary']['total_tax']
  const bonusTax = taxPerBracketMonthly['Bonus']['total_tax']
  const allocationsTax = taxPerBracketMonthly['Allocations']['total_tax']
  const LAPTax = taxPerBracketMonthly['LAP']['total_tax']
  const adjustmentsTax = taxPerBracketMonthly['Adjustment']['total_tax']

  const netAllocations = grossAllocations - allocationsTax
  const netLAP = LAP - LAPTax
  const netBonus = bonus - bonusTax
  const netAdjustments = adjustments - adjustmentsTax
  const totalBonus = grossAllocations + LAP + bonus + adjustments
  const totalBonusTax = allocationsTax + LAPTax + bonusTax + adjustmentsTax
  const netTotalBonus = netAllocations + netLAP + netBonus + netAdjustments

  const monthlyTax = salaryTax / 12
  const netMonthlySalary = grossSalaryBase - monthlyTax - socialInsurance.employee_contribution
  const netMonthlySalaryNoSocial = grossSalaryBase - monthlyTax

  const martyrTax = totalMonthly * martyrsTaxRate
  const totalGrossMonthly = totalMonthly + bonus + grossAllocations + LAP + adjustments
  const totalTaxMonthly =
    monthlyTax +
    bonusTax +
    allocationsTax +
    adjustmentsTax +
    LAPTax +
    martyrTax +
    socialInsurance.employee_contribution
  const otherDeductions = 0
  const totalTaxesAndDeductions = otherDeductions + totalTaxMonthly

  const netPay =
    totalMonthly +
    bonus +
    grossAllocations +
    LAP +
    adjustments -
    monthlyTax -
    bonusTax -
    allocationsTax -
    adjustmentsTax -
    LAPTax -
    otherDeductions -
    martyrTax -
    socialInsurance.employee_contribution

  const monthsWorked = calculateMonthsDifference(datePicker)
  const remainingMonths = calculateRemainingMonths(monthsWorked)
  const nextLap = calculateLAPBonus(monthsWorked + remainingMonths, taxData.lap) * grossSalaryBase

  const lap6Percentage = taxData.lap.half.percentage
  const lap12Percentage = taxData.lap.one.percentage
  const lap18Percentage = taxData.lap.oneAndHalf.percentage
  const lap24Percentage = taxData.lap.two.percentage
  const lap30Percentage = taxData.lap.twoAndHalf.percentage

  const bonusPaidPercentage = bonusTaxBase === 404 ? 1 - 0.225 : 1 - bonusTaxBase

  const chartLabels = getChartLabels(taxTier, taxData)
  const tableData = [
    {
      Months: 6,
      Percentage: lap6Percentage,
      GrossBonus: Math.round(grossSalaryBase * lap6Percentage * 100) / 100,
      NetBonus: Math.round(grossSalaryBase * lap6Percentage * bonusPaidPercentage * 100) / 100,
    },
    {
      Months: 12,
      Percentage: lap12Percentage,
      GrossBonus: Math.round(grossSalaryBase * lap12Percentage * 100) / 100,
      NetBonus: Math.round(grossSalaryBase * lap12Percentage * bonusPaidPercentage * 100) / 100,
    },
    {
      Months: 18,
      Percentage: lap18Percentage,
      GrossBonus: Math.round(grossSalaryBase * lap18Percentage * 100) / 100,
      NetBonus: Math.round(grossSalaryBase * lap18Percentage * bonusPaidPercentage * 100) / 100,
    },
    {
      Months: 24,
      Percentage: lap24Percentage,
      GrossBonus: Math.round(grossSalaryBase * lap24Percentage * 100) / 100,
      NetBonus: Math.round(grossSalaryBase * lap24Percentage * bonusPaidPercentage * 100) / 100,
    },
    {
      Months: 30,
      Percentage: lap30Percentage,
      GrossBonus: Math.round(grossSalaryBase * lap30Percentage * 100) / 100,
      NetBonus: Math.round(grossSalaryBase * lap30Percentage * bonusPaidPercentage * 100) / 100,
    },
  ]

  const salaryBreakdown: SalaryBreakdown = {
    grossDailyRate: Math.round(dailyRate * 100) / 100,
    grossAllocationDailyRate: Math.round(allocationDailyRate * 100) / 100,
    grossAnnualAllocation: Math.round(annualAllocation * 100) / 100,
    grossBasicSalary: Math.round(totalMonthly * 100) / 100,
    salaryTax: Math.round(monthlyTax * 100) / 100,
    netBasicWithoutInsurance: Math.round(netMonthlySalaryNoSocial * 100) / 100,
    socialInsurance: Math.round(socialInsurance.employee_contribution * 100) / 100,
    netBasic: Math.round(netMonthlySalary * 100) / 100,
    grossAllocations: Math.round(grossAllocations * 100) / 100,
    allocationsTax: Math.round(allocationsTax * 100) / 100,
    netAllocations: Math.round(netAllocations * 100) / 100,
    grossAdjustments: Math.round(adjustments * 100) / 100,
    adjustmentsTax: Math.round(adjustmentsTax * 100) / 100,
    netAdjustments: Math.round(netAdjustments * 100) / 100,
    grossLAP: Math.round(LAP * 100) / 100,
    LAPTax: Math.round(LAPTax * 100) / 100,
    netLAP: Math.round(netLAP * 100) / 100,
    grossBonus: Math.round(bonus * 100) / 100,
    bonusTax: Math.round(bonusTax * 100) / 100,
    netBonus: Math.round(netBonus * 100) / 100,
    totalBonus: Math.round(totalBonus * 100) / 100,
    totalBonusFixedTax: Math.round(totalBonusTax * 100) / 100,
    netTotalBonus: Math.round(netTotalBonus * 100) / 100,
    grossMonthlyTaxable: Math.round(totalMonthlyTaxable * 100) / 100,
    grossAnnualTaxable: Math.round(annualGrossTaxable * 100) / 100,
    taxTier: taxTier,
    martyrsTax: Math.round(martyrTax * 100) / 100,
    taxableDeduction: Math.round(taxableDeduction * 100) / 100,
    monthsWorked: Math.round(monthsWorked * 100) / 100,
    nextLapMonths: Math.round(remainingMonths * 100) / 100,
    nextLapAmount: Math.round(nextLap * 100) / 100,
    totalGross: Math.round(totalGrossMonthly * 100) / 100,
    totalTax: Math.round(totalTaxMonthly * 100) / 100,
    totalDeductions: Math.round(otherDeductions * 100) / 100,
    totalTaxesAndDeductions: Math.round(totalTaxesAndDeductions * 100) / 100,
    finalPayment: Math.round(netPay * 100) / 100,
    LAP: tableData,
    taxLabels: chartLabels,
    taxBrackets: taxPerBracket,
    taxBracketsMonthly: taxPerBracketMonthly,
  }

  return salaryBreakdown
}

export type SalaryBreakdown = {
  grossDailyRate: number
  grossAllocationDailyRate: number
  grossAnnualAllocation: number
  grossBasicSalary: number
  salaryTax: number
  netBasicWithoutInsurance: number
  socialInsurance: number
  netBasic: number
  grossAllocations: number
  allocationsTax: number
  netAllocations: number
  grossAdjustments: number
  adjustmentsTax: number
  netAdjustments: number
  grossLAP: number
  LAPTax: number
  netLAP: number
  grossBonus: number
  bonusTax: number
  netBonus: number
  totalBonus: number
  totalBonusFixedTax: number
  netTotalBonus: number
  grossMonthlyTaxable: number
  grossAnnualTaxable: number
  taxTier: number
  martyrsTax: number
  taxableDeduction: number
  monthsWorked: number
  nextLapMonths: number
  nextLapAmount: number
  totalGross: number
  totalTax: number
  totalDeductions: number
  totalTaxesAndDeductions: number
  finalPayment: number
  LAP: {
    Months: number
    Percentage: number
    GrossBonus: number
    NetBonus: number
  }[]
  taxLabels: string[]
  taxBrackets: ComponentTax
  taxBracketsMonthly: ComponentTaxMonthly
}
