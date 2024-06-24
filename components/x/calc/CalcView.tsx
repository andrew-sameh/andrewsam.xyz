'use client'

import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { LuCalendarDays } from 'react-icons/lu'
import * as React from 'react'
import { getSalaryDict } from '@/components/x/calc/CalFunctions'

import { useAtom } from 'jotai'
import { salaryBreakdownAtom } from '@/components/atoms/toolsAtoms' // Import the atom
import { CashCardX as CashCard } from '@/components/x/calc/CashCards'
export function IncomeView() {
  const [salaryBreakdown] = useAtom(salaryBreakdownAtom)

  if (!salaryBreakdown) {
    return null
  }

  return (
    <div className="w-full">
      {/* 
      //     "GrossDailyRate": 42183.27,
      //     "NetBasic": 921639.69,
      //     "GrossBonus": 45264,
      //     "TotalGross": 1629161.5,
      //     "FinalPayment": 1183095.73,
//     "GrossAllocationsDayRate": 63274.9,
//     "SocialInsurace": 1386,
//     "TaxTier": 6,
//     "GrossAllocations": 316374.5,
//     "TotalTax": 446065.77,
//     "TotalBonus": 371663.5,
//     "TotalDeductions": 0,
//     "NextLapMonths": 1,
//     "NextLapAmount": 7592988,

//     "MonthsWorked": 29,
//     "GrossEOY5Annuals": 210916.33,
//     "SalaryTax": 342472.31,
//     "GrossAdjustments": 0,
//     "AdjustmentsTax": 0,
*/}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-6 ">
        <CashCard header="Gross Daily Rate" amount={salaryBreakdown.grossDailyRate} />
        <CashCard header="Net Basic Salary" amount={salaryBreakdown.netBasic} />
        <CashCard header="Gross Bonus" amount={salaryBreakdown.grossBonus} />
        <CashCard header="Total Gross" amount={salaryBreakdown.totalGross} />
        <CashCard header="Final Payment" amount={salaryBreakdown.finalPayment} />
        <CashCard
          header="Gross Allocations Day Rate"
          amount={salaryBreakdown.grossAllocationDailyRate}
        />
        <CashCard header="Social Insurance" amount={salaryBreakdown.socialInsurance} />
        <CashCard header="Tax Tier" amount={salaryBreakdown.taxTier} />
        <CashCard header="Gross Allocations" amount={salaryBreakdown.grossAllocations} />
        <CashCard header="Total Tax" amount={salaryBreakdown.totalTax} />
        <CashCard header="Total Bonus" amount={salaryBreakdown.totalBonus} />
        <CashCard header="Total Deductions" amount={salaryBreakdown.totalDeductions} />
        <CashCard header="Next LAP Months" amount={salaryBreakdown.nextLapMonths} />
        <CashCard header="Next LAP Amount" amount={salaryBreakdown.nextLapAmount} />
        <CashCard header="Months Worked" amount={salaryBreakdown.monthsWorked} />
        <CashCard header="Gross EOY5 Annuals" amount={salaryBreakdown.grossAnnualAllocation} />
        <CashCard header="Salary Tax" amount={salaryBreakdown.salaryTax} />
        <CashCard header="Gross Adjustments" amount={salaryBreakdown.grossAdjustments} />
        <CashCard header="Adjustments Tax" amount={salaryBreakdown.adjustmentsTax} />
      </div>
    </div>
  )
}

// {
//     "GrossDailyRate": 42183.27,
//     "GrossAllocationsDayRate": 63274.9,
//     "SocialInsurace": 1386,
//     "TaxTier": 6,
//     "TotalGross": 1629161.5,
//     "GrossAllocations": 316374.5,
//     "GrossBonus": 45264,
//     "TotalTax": 446065.77,
//     "TotalBonus": 371663.5,
//     "TotalDeductions": 0,
//     "FinalPayment": 1183095.73,
//     "NextLapMonths": 1,
//     "NextLapAmount": 7592988,
//     "NetBasic": 921639.69,

//     "MonthsWorked": 29,
//     "GrossEOY5Annuals": 210916.33,

//     "GrossBasicSalary": 1257498,
//     "SalaryTax": 342472.31,
//     "NetBasicWithoutInsurance": 923025.69,
//     "allocationsTax": 87002.99,
//     "NetAllocations": 229371.51,
//     "GrossAdjustments": 0,
//     "AdjustmentsTax": 0,
//     "NetAdjustments": 0,
//     "GrossLAP": 10025,
//     "LAPTax": 2756.88,
//     "NetLAP": 7268.13,
//     "bonusTax": 12447.6,
//     "NetBonus": 32816.4,
//     "TotalBonusFixedTax": 102207.46,
//     "NetTotalBonus": 269456.04,
//     "GrossMonthlyTaxable": 1626108.83,
//     "GrossAnnualTaxable": 19513300,
//     "MartyrsTax": 0,
//     "DeductionsTaxable": 8000,
//     "TotalTaxesAndDeductions": 446065.77,
//     "LAP": [
//         {
//             "Months": 6,
//             "Percentage": 0.25,
//             "Gross_Bonus": 316374.5,
//             "Net_Bonus": 245190.24
//         },
//         {
//             "Months": 12,
//             "Percentage": 0.3,
//             "Gross_Bonus": 379649.4,
//             "Net_Bonus": 294228.28
//         },
//         {
//             "Months": 18,
//             "Percentage": 0.35,
//             "Gross_Bonus": 442924.3,
//             "Net_Bonus": 343266.33
//         },
//         {
//             "Months": 24,
//             "Percentage": 0.4,
//             "Gross_Bonus": 506199.2,
//             "Net_Bonus": 392304.38
//         },
//         {
//             "Months": 30,
//             "Percentage": 0.5,
//             "Gross_Bonus": 632749,
//             "Net_Bonus": 490380.48
//         }
//     ],
//     "TaxLabels": [
//         "0 - 100000 25%",
//         "100000 - 8333333333 27.5%"
//     ],
//     "TaxBrackets": {
//         "Salary": {
//             "total_tax": 4109667.6750000003,
//             "tax_brackets": [
//                 {
//                     "bracket": "0-1200000",
//                     "percentage": 0.25,
//                     "tax": 300000
//                 },
//                 {
//                     "bracket": "1200001-99999999999",
//                     "percentage": 0.275,
//                     "tax": 3809667.6750000003
//                 }
//             ]
//         },
//         "Bonus": {
//             "total_tax": 149371.2,
//             "tax_brackets": [
//                 {
//                     "bracket": "15053338-99999999999",
//                     "percentage": 0.275,
//                     "tax": 149371.2
//                 }
//             ]
//         },
//         "Adjustment": {
//             "total_tax": 0,
//             "tax_brackets": []
//         },
//         "LAP": {
//             "total_tax": 33082.5,
//             "tax_brackets": [
//                 {
//                     "bracket": "15596506-99999999999",
//                     "percentage": 0.275,
//                     "tax": 33082.5
//                 }
//             ]
//         },
//         "Allocations": {
//             "total_tax": 1044035.8500000001,
//             "tax_brackets": [
//                 {
//                     "bracket": "15716806-99999999999",
//                     "percentage": 0.275,
//                     "tax": 1044035.8500000001
//                 }
//             ]
//         }
//     },
//     "TaxBracketsMonthly": {
//         "Salary": {
//             "total_tax": 342472.30625,
//             "tax_brackets": [
//                 {
//                     "bracket": "0-100000",
//                     "percentage": 0.25,
//                     "tax": 25000
//                 },
//                 {
//                     "bracket": "100000-8333333333",
//                     "percentage": 0.275,
//                     "tax": 317472.31
//                 }
//             ]
//         },
//         "Bonus": {
//             "total_tax": 12447.6,
//             "tax_brackets": [
//                 {
//                     "bracket": "1254444-8333333333",
//                     "percentage": 0.275,
//                     "tax": 12447.6
//                 }
//             ]
//         },
//         "Adjustment": {
//             "total_tax": 0,
//             "tax_brackets": []
//         },
//         "LAP": {
//             "total_tax": 2756.875,
//             "tax_brackets": [
//                 {
//                     "bracket": "1299708-8333333333",
//                     "percentage": 0.275,
//                     "tax": 2756.88
//                 }
//             ]
//         },
//         "Allocations": {
//             "total_tax": 87002.9875,
//             "tax_brackets": [
//                 {
//                     "bracket": "1309733-8333333333",
//                     "percentage": 0.275,
//                     "tax": 87002.99
//                 }
//             ]
//         }
//     }
// }
