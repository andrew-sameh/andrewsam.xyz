'use client'
import * as React from 'react'

import { cn } from '@/lib/utils'
import useMediaQuery from '@/lib/hooks/use-media-query'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { LuFileLock as Icon } from 'react-icons/lu'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  taxData,
  type TaxData,
  type Tier,
  type TaxBracket as BaseTaxBracket,
} from '@/components/x/calc/defaults'

interface TaxBracket {
  tier: number
  from: number
  to: number
  percentage: number
}

interface Lap {
  months: number
  percentage: number
}

interface Insurance {
  name: string
  amount: string
}

interface Other {
  name: string
  amount: string
}

interface FormattedTaxData {
  taxBrackets: TaxBracket[]
  lap: Lap[]
  insurance: Insurance[]
  other: Other[]
}

export const formatTaxData = (taxData: TaxData): FormattedTaxData => {
  const taxBrackets: TaxBracket[] = taxData.tiers.flatMap((tier: Tier) =>
    tier.taxBrackets.map((bracket: BaseTaxBracket) => ({
      tier: tier.tier,
      from: bracket.from,
      to: bracket.to,
      percentage: bracket.percentage,
    }))
  )

  const lap: Lap[] = Object.keys(taxData.lap).map((key) => ({
    months: taxData.lap[key].months,
    percentage: taxData.lap[key].percentage,
  }))

  const insurance: Insurance[] = [
    { name: 'Minimum Limit', amount: `${taxData.insurance.minimumLimit} EGP` },
    { name: 'Maximum Limit', amount: `${taxData.insurance.maximumLimit} EGP` },
    {
      name: 'Employee Contribution Percentage',
      amount: `${(taxData.insurance.employeeContributionPercentage * 100).toFixed(2)}%`,
    },
    {
      name: 'Employer Contribution Percentage',
      amount: `${(taxData.insurance.employerContributionPercentage * 100).toFixed(2)}%`,
    },
  ]

  const other: Other[] = [
    { name: 'Non Taxable', amount: `${taxData.nonTaxable} EGP` },
    { name: 'Adjustment Rate', amount: `${(taxData.adjustmentRate * 100).toFixed(2)}%` },
    { name: 'Allocation Rate', amount: `${taxData.allocationRate + 1}X` },
    { name: 'Martyrs Tax Rate', amount: `${(taxData.martyrsTaxRate * 100).toFixed(2)}%` },
    {
      name: 'Virtual Increase Percentage',
      amount: `${(taxData.virtualIncreasePercentage * 100).toFixed(2)}%`,
    },
  ]

  return {
    taxBrackets,
    lap,
    insurance,
    other,
  }
}

export function DefaultValuesDrawer() {
  const [open, setOpen] = React.useState(false)
  const media = useMediaQuery()

  if (media.isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Icon className="h-4 w-4" />
            <span className="sr-only">Default Values</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Default Values</DialogTitle>
            <DialogDescription>
              The default values used to calculate the salary breakdown.
            </DialogDescription>
          </DialogHeader>
          <SettingsForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <Icon className="h-4 w-4" />
          <span className="sr-only">Default Values</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Default Values</DrawerTitle>
          <DrawerDescription>
            The default values used to calculate the salary breakdown.
          </DrawerDescription>
        </DrawerHeader>
        <SettingsForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function SettingsForm({ className }: React.ComponentProps<'form'>) {
  const formattedData = formatTaxData(taxData)

  return (
    <Accordion type="single" collapsible className={cn('grid items-start gap-4', className)}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Tax Brackets</AccordionTrigger>
        <AccordionContent>
          <ScrollArea className="h-36">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Tier</TableHead>
                  <TableHead className="text-center">From - EGP</TableHead>
                  <TableHead className="text-center">To - EGP</TableHead>
                  <TableHead className="text-center">Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formattedData.taxBrackets.map((bracket) => (
                  <TableRow key={`${bracket.tier}-${bracket.from}`}>
                    <TableCell className="text-center font-medium">{bracket.tier}</TableCell>
                    <TableCell className="text-center">{bracket.from}</TableCell>
                    <TableCell className="text-center">{bracket.to}</TableCell>
                    <TableCell className="text-center">
                      {(bracket.percentage * 100).toFixed(2)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>LAP</AccordionTrigger>
        <AccordionContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Months</TableHead>
                <TableHead className="text-center">Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formattedData.lap.map((bracket) => (
                <TableRow key={`${bracket.months}-${bracket.percentage}`}>
                  <TableCell className="text-center font-medium">{bracket.months}</TableCell>
                  <TableCell className="text-center">
                    {(bracket.percentage * 100).toFixed(2)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>{' '}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Insurance</AccordionTrigger>
        <AccordionContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formattedData.insurance.map((bracket) => (
                <TableRow key={`${bracket.name}`}>
                  <TableCell className="text-center font-medium">{bracket.name}</TableCell>
                  <TableCell className="text-center">{bracket.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Other</AccordionTrigger>
        <AccordionContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formattedData.other.map((bracket) => (
                <TableRow key={`${bracket.name}`}>
                  <TableCell className="text-center font-medium">{bracket.name}</TableCell>
                  <TableCell className="text-center">{bracket.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
