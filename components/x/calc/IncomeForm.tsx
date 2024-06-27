'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { LuCalendarDays } from 'react-icons/lu'
import * as React from 'react'
import { LuLoader2 } from 'react-icons/lu'
import { getSalaryDict } from '@/components/x/calc/CalFunctions'
import { Badge } from '@/components/ui/badge'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'

import { useAtom } from 'jotai'
import { salaryBreakdownAtom, salarySettingsAtom } from '@/components/atoms/toolsAtoms' // Import the atom
import { type SalaryBreakdown } from './CalFunctions' // Import the SalaryBreakdown type

const formSchema = z.object({
  startingDate: z.date({
    required_error: 'A date of birth is required.',
  }),
  gross: z.coerce.number({
    required_error: 'Gross income is required.',
  }),
  grossBonus: z.coerce.number().optional(),
  allocations: z.coerce.number().optional(),
  lap: z.coerce.number().optional(),
  deductions: z.coerce.number().optional(),
})

type FormData = z.infer<typeof formSchema>

export function IncomeForm() {
  const [, setSalaryBreakdown] = useAtom(salaryBreakdownAtom)
  const [salarySettings] = useAtom(salarySettingsAtom)

  React.useEffect(() => {
    return () => {
      // Reset the atom when the component unmounts
      setSalaryBreakdown(null)
    }
  }, [setSalaryBreakdown])

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startingDate: new Date(2022, 0, 20),
      deductions: 0,
      gross: 0,
      grossBonus: 0,
      lap: 0,
      allocations: 0,
    },
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  // 2. Define a submit handler.
  async function onSubmit(values: FormData) {
    setIsLoading(true)

    const registrationResult = await fetch('/api/tools/calc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...values,
        adjustment: salarySettings.adjustment,
        increase: salarySettings.increase,
      }),
    })
    const responseBody = await registrationResult.json()
    setSalaryBreakdown(responseBody)

    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full  items-start gap-6 overflow-auto p-4 pt-0"
      >
        <fieldset className="grid grid-cols-2 gap-4 rounded-lg border p-4 md:grid-cols-3 xl:grid-cols-6">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Salary Details
            {salarySettings.adjustment > 0 && (
              <Badge variant="outline" className="ml-1">
                Adj: {salarySettings.adjustment}%
              </Badge>
            )}
            {salarySettings.increase > 0 && (
              <Badge variant="outline" className="ml-1">
                Inc: {salarySettings.increase}%
              </Badge>
            )}
          </legend>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="startingDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Hiring Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            ' pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? format(field.value, 'PP') : <span>Pick a date</span>}
                          <LuCalendarDays className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                        initialFocus
                        captionLayout="dropdown-buttons"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>The hiring date.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="gross"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Gross Salary</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>Gross salary amount.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="grossBonus"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Gross Bonus</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>Gross bonus amount.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="allocations"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Allocations</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>Number of allocation days.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="lap"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Gross LAP</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>Gross LAP amount.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="deductions"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Deductions</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>Gross deductions amount.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </fieldset>
        <Button
          type="submit"
          disabled={isLoading}
          variant={'outline'}
          className="sm:mx-auto sm:w-56"
        >
          {isLoading && <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  )
}

// {
//     "GrossDailyRate": 42183.27,
//     "GrossAllocationsDayRate": 63274.9,
//     "GrossEOY5Annuals": 210916.33,
//     "GrossBasicSalary": 1257498,
//     "SalaryTax": 342472.31,
//     "NetBasicWithoutInsurance": 923025.69,
//     "SocialInsurace": 1386,
//     "NetBasic": 921639.69,
//     "GrossAllocations": 316374.5,
//     "allocationsTax": 87002.99,
//     "NetAllocations": 229371.51,
//     "GrossAdjustments": 0,
//     "AdjustmentsTax": 0,
//     "NetAdjustments": 0,
//     "GrossLAP": 10025,
//     "LAPTax": 2756.88,
//     "NetLAP": 7268.13,
//     "GrossBonus": 45264,
//     "bonusTax": 12447.6,
//     "NetBonus": 32816.4,
//     "TotalBonus": 371663.5,
//     "TotalBonusFixedTax": 102207.46,
//     "NetTotalBonus": 269456.04,
//     "GrossMonthlyTaxable": 1626108.83,
//     "GrossAnnualTaxable": 19513300,
//     "TaxTier": 6,
//     "MartyrsTax": 0,
//     "DeductionsTaxable": 8000,
//     "MonthsWorked": 29,
//     "NextLapMonths": 1,
//     "NextLapAmount": 7592988,
//     "TotalGross": 1629161.5,
//     "TotalTax": 446065.77,
//     "TotalDeductions": 0,
//     "TotalTaxesAndDeductions": 446065.77,
//     "FinalPayment": 1183095.73,
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
