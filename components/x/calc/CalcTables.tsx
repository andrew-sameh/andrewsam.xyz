import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { type SalaryBreakdown } from '@/components/x/calc/CalFunctions' // Assuming you have the SalaryBreakdown type in a types file

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

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: string
  details: SalaryBreakdown
}

export function SalaryBreakdownTable({ header, details, className, ...props }: CardProps) {
  const rows = [
    {
      item: 'Salary',
      gross: details.grossBasicSalary,
      tax: details.salaryTax,
      net: details.netBasicWithoutInsurance,
    },
    {
      item: 'Allocations',
      gross: details.grossAllocations,
      tax: details.allocationsTax,
      net: details.netAllocations,
    },
    {
      item: 'Bonus',
      gross: details.grossBonus,
      tax: details.bonusTax,
      net: details.netBonus,
    },
    {
      item: 'LAP',
      gross: details.grossLAP,
      tax: details.LAPTax,
      net: details.netLAP,
    },
    {
      item: 'Adjustments',
      gross: details.grossAdjustments,
      tax: details.adjustmentsTax,
      net: details.netAdjustments,
    },
    {
      item: 'Social Insurance',
      gross: 0,
      tax: details.socialInsurance,
      net: details.socialInsurance * -1,
    },
    {
      item: 'Deductions',
      gross: 0,
      tax: details.totalDeductions,
      net: details.totalDeductions === 0 ? details.totalDeductions : details.totalDeductions * -1,
    },
  ]
  return (
    <Card className={cn('', className)} {...props}>
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl">Salary Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of your salary line items.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Item</TableHead>
              <TableHead>Gross</TableHead>
              <TableHead>Tax/Deduction</TableHead>
              <TableHead className="text-right">Net</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.item}>
                <TableCell className="font-medium">{row.item}</TableCell>
                <TableCell className={`font-medium ${row.gross < 0 ? 'text-red-500' : ''}`}>
                  E₤ {row.gross.toLocaleString()}
                </TableCell>
                <TableCell className={`font-medium ${row.tax < 0 ? 'text-red-500' : ''}`}>
                  E₤ {row.tax.toLocaleString()}
                </TableCell>
                <TableCell
                  className={`text-right font-medium ${row.net < 0 ? 'text-red-500' : row.net > 0 ? 'text-green-500' : ''}`}
                >
                  E₤ {row.net.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="font-medium">Total</TableCell>
              <TableCell className={`font-medium ${details.totalGross < 0 ? 'text-red-500' : ''}`}>
                E₤ {details.totalGross.toLocaleString()}
              </TableCell>
              <TableCell
                className={`font-medium ${details.totalTaxesAndDeductions < 0 ? 'text-red-500' : ''}`}
              >
                E₤ {details.totalTaxesAndDeductions.toLocaleString()}
              </TableCell>
              <TableCell
                className={`text-right font-medium ${details.finalPayment < 0 ? 'text-red-500' : details.finalPayment > 0 ? 'text-green-500' : ''}`}
              >
                E₤ {details.finalPayment.toLocaleString()}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  )
}

export function LapTable({ header, details, className, ...props }: CardProps) {
  return (
    <Card className={cn('', className)} {...props}>
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl">LAP Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list the LAP bonus across all categories</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Months</TableHead>
              <TableHead>Percentage</TableHead>
              <TableHead>Gross</TableHead>
              <TableHead className="text-right">Approx. Net</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {details.LAP.map((LapItem) => (
              <TableRow key={LapItem.Months}>
                <TableCell className="font-medium">{LapItem.Months}</TableCell>
                <TableCell className={`font-medium`}>
                  {(LapItem.Percentage * 100).toFixed(2)}%
                </TableCell>
                <TableCell className={`font-medium`}>
                  E₤ {LapItem.GrossBonus.toLocaleString()}
                </TableCell>
                <TableCell className={`text-right font-medium`}>
                  E₤ {LapItem.NetBonus.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
