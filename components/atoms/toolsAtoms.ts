import { atom } from 'jotai'
import { type SalaryBreakdown } from '@/components/x/calc/CalFunctions' // Assuming you have the SalaryBreakdown type in a types file
import { type SettingsValue as CalsSettingsValue } from '@/components/x/calc/settings'
import { taxData } from '@/components/x/calc/defaults'
// Salary Calculator
export const salaryBreakdownAtom = atom<SalaryBreakdown | null>(null)
export const salarySettingsAtom = atom<CalsSettingsValue>({
  adjustment: taxData.adjustmentRate ? taxData.adjustmentRate * 100 : 0,
  increase: taxData.virtualIncreasePercentage ? taxData.virtualIncreasePercentage * 100 : 0,
})
