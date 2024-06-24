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

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: string
  amount?: number
  progress?: number
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
export function CashCardX({ header, amount, children, className, progress, ...props }: CardProps) {
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
