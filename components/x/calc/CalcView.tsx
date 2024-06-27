'use client'

import { cn } from '@/lib/utils'
import * as React from 'react'
import { Badge } from '@/components/ui/badge'
import { LuBadgePercent } from 'react-icons/lu'
import { LuCalendarDays } from 'react-icons/lu'

import { useAtom } from 'jotai'
import { salaryBreakdownAtom } from '@/components/atoms/toolsAtoms' // Import the atom
import { CashCardX as CashCard } from '@/components/x/calc/CashCards'
import { SalaryBreakdownTable, LapTable } from '@/components/x/calc/CalcTables'
import { SalaryBreakdownPie, TaxStackedBarChart } from '@/components/x/calc/CalcCharts'
export function IncomeView() {
  const [salaryBreakdown] = useAtom(salaryBreakdownAtom)

  if (!salaryBreakdown) {
    return null
  }

  return (
    <div className="w-full">
      <div className="mb-2 flex flex-row items-center justify-center space-x-2">
        <Badge className="">
          <LuBadgePercent className="mr-1 h-4 w-4" />
          Tax Tier: {salaryBreakdown.taxTier}{' '}
        </Badge>
        <Badge className="">
          <LuCalendarDays className="mr-1 h-4 w-4" />
          Next LAP: {salaryBreakdown.nextLapMonths} Mos{' '}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 ">
        <CashCard header="Total Gross" amount={salaryBreakdown.totalGross} mode={'gross'} />
        <CashCard header="Total Tax" amount={salaryBreakdown.totalTax} mode={'tax'} />
        <CashCard header="Net Basic Salary" amount={salaryBreakdown.netBasic} mode={'basic'} />
        <CashCard header="Final Payment" amount={salaryBreakdown.finalPayment} mode={'final'} />
        <CashCard header="Total Bonus" amount={salaryBreakdown.totalBonus} mode={'bonus'} />

        <CashCard header="Next LAP Amount" amount={salaryBreakdown.nextLapAmount} mode={'lap'} />
        <CashCard header="Gross Daily Rate" amount={salaryBreakdown.grossDailyRate} mode={'day'} />

        <CashCard
          header="Gross Alloc. Day"
          amount={salaryBreakdown.grossAllocationDailyRate}
          mode={'alloc'}
        />
      </div>
      <div className="my-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SalaryBreakdownTable details={salaryBreakdown} />
        <SalaryBreakdownPie details={salaryBreakdown} />
      </div>
      <div className="my-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <LapTable details={salaryBreakdown} />
        <TaxStackedBarChart details={salaryBreakdown} />
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
