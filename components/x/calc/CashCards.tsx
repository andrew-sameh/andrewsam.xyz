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
import { GiReceiveMoney } from 'react-icons/gi'
import { GiPayMoney } from 'react-icons/gi'
import { GiTakeMyMoney } from 'react-icons/gi'
import { GiMoneyStack } from 'react-icons/gi'

import { RxCardStackPlus } from 'react-icons/rx'
import { FaMoneyBillTrendUp } from 'react-icons/fa6'
import { CgCalendarToday } from 'react-icons/cg'
import { BsCalendarDay } from 'react-icons/bs'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: string
  amount?: number
  progress?: number
  mode?: 'gross' | 'tax' | 'final' | 'basic' | 'bonus' | 'lap' | 'day' | 'alloc'
}

export function CashCard({ header, amount, children, className, progress, ...props }: CardProps) {
  return (
    <Card className={cn('', className)} {...props}>
      <CardHeader className="pb-2">
        <CardDescription>{header} E&pound;</CardDescription>
        <CardTitle className="text-4xl">{amount ? amount.toLocaleString() : 0} </CardTitle>
      </CardHeader>
      <CardContent>{children} </CardContent>

      {progress && (
        <CardFooter>
          <Progress value={progress} aria-label={`${progress}%`} />
        </CardFooter>
      )}
    </Card>
  )
}

export function CashCardU({ header, amount, children, className, progress, ...props }: CardProps) {
  return (
    <Card className="rounded-lg bg-background p-6 shadow-md">
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-primary p-3">
          <GiReceiveMoney className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{header}</h3>
          <p className="text-2xl font-bold">E₤ {amount ? amount.toLocaleString() : 0}</p>
        </div>
      </div>
    </Card>
  )
}

export function CashCardX({
  header,
  amount,
  children,
  className,
  progress,
  mode,
  ...props
}: CardProps) {
  return (
    <Card className={cn('justify-between', className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{header}</CardTitle>
        {mode === 'gross' && <GiReceiveMoney className="h-6 w-6 text-muted-foreground" />}
        {mode === 'tax' && <GiPayMoney className="h-6 w-6 text-muted-foreground" />}
        {mode === 'final' && <GiTakeMyMoney className="h-6 w-6 text-muted-foreground" />}
        {mode === 'basic' && <GiMoneyStack className="h-6 w-6 text-muted-foreground" />}
        {mode === 'bonus' && <RxCardStackPlus className="h-6 w-6 text-muted-foreground" />}
        {mode === 'lap' && <FaMoneyBillTrendUp className="h-6 w-6 text-muted-foreground" />}
        {mode === 'day' && <CgCalendarToday className="h-6 w-6 text-muted-foreground" />}
        {mode === 'alloc' && <BsCalendarDay className="h-6 w-6 text-muted-foreground" />}
      </CardHeader>
      <CardContent className="m-0 pb-4">
        <div className="text-xl font-bold">E₤ {amount ? amount.toLocaleString() : 0}</div>
        {/* <p className="text-xs text-muted-foreground">+19% from last month</p> */}
      </CardContent>
      {progress && (
        <CardFooter>
          <Progress value={progress} aria-label={`${progress}%`} />
        </CardFooter>
      )}
    </Card>
  )
}
