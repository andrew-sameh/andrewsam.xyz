'user client'
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
import React, { useCallback, useState } from 'react'
import {
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: string
  details: SalaryBreakdown
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={payload.color}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={payload.color}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={payload.color} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={payload.color} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill={payload.color}
      >{`E₤ ${value.toLocaleString()}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill={payload.color}
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}

export function SalaryBreakdownPie({ header, details, className, ...props }: CardProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const onPieEnter = useCallback(
    (_: React.MouseEvent, index: number) => {
      setActiveIndex(index)
    },
    [setActiveIndex]
  )

  const data = [
    {
      name: 'Salary Net',
      value: details.netBasicWithoutInsurance,
      color: '#FFBB28',
    },
    {
      name: 'Salary Tax',
      value: details.salaryTax,
      color: '#FF8042',
    },
    {
      name: 'Alloc. Net',
      value: details.netAllocations,
      color: '#FF3042',
    },
    {
      name: 'Alloc. Tax',
      value: details.allocationsTax,
      color: '#FF8042',
    },
    {
      name: 'Bonus Net',
      value: details.netBonus,
      color: '#FFBB28',
    },
    {
      name: 'Bonus Tax',
      value: details.bonusTax,
      color: '#FF8042',
    },
    {
      name: 'LAP Net',
      value: details.netLAP,
      color: '#FF8042',
    },
    {
      name: 'LAP Tax',
      value: details.LAPTax,
      color: '#FF8042',
    },
    {
      name: 'Adjust. Net',
      value: details.netAdjustments,
      color: '#FFBB28',
    },
    {
      name: 'Adjust. Tax',
      value: details.adjustmentsTax,
      color: '#FFBB28',
    },
    {
      name: 'Insurance',
      value: details.socialInsurance,
      color: '#FF8042',
    },
    {
      item: 'Deductions',
      value: details.totalDeductions,
      color: '#FF8042',
    },
  ]

  return (
    <Card className={cn('h-96 lg:h-auto ', className)} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={600} height={600}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  )
}
interface DataEntry {
  name: string
  Salary: number
  Bonus: number
  Allocations: number
  LAP: number
  Adjustment: number
}

export function TaxStackedBarChart({ header, details, className, ...props }: CardProps) {
  const data: DataEntry[] = details.taxLabels.map((label, i) => {
    const entry: DataEntry = {
      name: label,
      Salary: 0,
      Bonus: 0,
      Allocations: 0,
      LAP: 0,
      Adjustment: 0,
    }
    return entry
  })

  for (const [key, value] of Object.entries(details.taxBracketsMonthly)) {
    for (let i = 0; i < value.tax_brackets.length; i++) {
      data[value.tax_brackets[i].bracketIndex][key] = value.tax_brackets[i].tax as number // Add a semicolon at the end        }
    }
  }

  return (
    <Card className={cn('h-96 p-5 lg:h-auto ', className)} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Salary" stackId="a" fill="#EF8354" opacity={0.7} />
          <Bar dataKey="Bonus" stackId="a" fill="#EE4B6A" opacity={0.7} />
          <Bar dataKey="Allocations" stackId="a" fill="#92D1C3" opacity={0.7} />
          <Bar dataKey="LAP" stackId="a" fill="#2C2C54" opacity={0.7} />
          <Bar dataKey="Adjustments" stackId="a" fill="#B47EB3" opacity={0.7} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
