import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { formatDistanceToNow, differenceInMonths, format } from 'date-fns'

export type TimelinePropsItem = Omit<TimelineItemProps, 'bulletSize' | 'lineSize'> & {
  bulletSize?: number
}

export type TimelineProps = {
  items: TimelinePropsItem[]
  activeItem: number
  bulletSize?: number
  lineSize?: number
  mode?: 'timeline' | 'manual'
}

/*
  --Timeline Mode--
  No bullet or line is active when activeItem is -1
  First bullet is active only if activeItem is 0 or more
  First line is active only if activeItem is 1 or more
*/

export const Timeline = ({
  items,
  activeItem,
  bulletSize = 16,
  lineSize = 2,
  mode = 'timeline',
}: TimelineProps) => {
  return (
    <ul
      style={{
        paddingLeft: bulletSize / 2,
      }}
    >
      {items.map((item, index) => {
        const isActiveItem =
          mode === 'timeline'
            ? activeItem === -1
              ? false
              : activeItem >= index + 1
            : item.isActive
        const isActiveBulletItem =
          mode === 'timeline'
            ? activeItem === -1
              ? false
              : activeItem >= index
            : item.isActiveBullet ?? false
        const isLastItem = mode === 'timeline' ? index === items.length - 1 : item.isLast ?? false
        return (
          <TimelineItem
            key={index}
            title={item.title}
            bullet={item.bullet}
            isLast={isLastItem}
            isActive={isActiveItem}
            isActiveBullet={isActiveBulletItem}
            bulletSize={bulletSize}
            lineSize={lineSize}
          >
            {item.children}
          </TimelineItem>
        )
      })}
    </ul>
  )
}

export type TimelineItemProps = {
  title: ReactNode
  bullet?: ReactNode
  children: ReactNode
  isLast?: boolean
  isActive?: boolean
  isActiveBullet?: boolean
  className?: string
  bulletSize: number
  lineSize: number
}

export const TimelineItemBullet = ({
  children,
  isActive,
  bulletSize,
  lineSize,
}: {
  children?: ReactNode
  isActive?: boolean
  bulletSize: number
  lineSize: number
}) => {
  return (
    <div
      className={cn(
        'absolute top-0 flex items-center justify-center rounded-full border bg-background',
        isActive && 'border-green-300 bg-green-300'
      )}
      style={{
        width: bulletSize,
        height: bulletSize,
        left: -bulletSize / 2 - lineSize / 2,
        borderWidth: lineSize,
      }}
      aria-hidden="true"
    >
      {children}
    </div>
  )
}

export const TimelineItemTitle = ({ children }: { children: ReactNode }) => {
  return <div className="mb-1 text-base font-semibold leading-none">{children}</div>
}

export const TimelineItem = ({
  children,
  bullet,
  title,
  isLast,
  isActive,
  isActiveBullet,
  bulletSize,
  className,
  lineSize,
  ...props
}: TimelineItemProps) => {
  return (
    <li
      className={cn(
        'relative border-l pb-8 pl-8',
        isLast && 'border-l-transparent pb-0',
        isActive && !isLast && 'border-l-primary',
        className
      )}
      style={{
        borderLeftWidth: lineSize,
      }}
      {...props}
    >
      <TimelineItemBullet lineSize={lineSize} bulletSize={bulletSize} isActive={isActiveBullet}>
        {bullet}
      </TimelineItemBullet>
      <TimelineItemTitle>{title}</TimelineItemTitle>
      {children}
    </li>
  )
}

export const TimelineItemDescription = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return <p className={cn('text-sm text-muted-foreground', className)}>{children}</p>
}

export const TimelineItemSmallText = ({ children }: { children: ReactNode }) => {
  return <div className="pt-1 text-xs">{children}</div>
}

export const TimelineItemDateRange = ({
  startDate,
  endDate,
}: {
  startDate: Date
  endDate?: Date
}) => {
  const formattedStartDate = format(startDate, 'MMM yyyy')
  const formattedEndDate = endDate ? format(endDate, 'MMM yyyy') : 'Present'
  const totalMonths = endDate
    ? differenceInMonths(endDate, startDate)
    : differenceInMonths(new Date(), startDate)

  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  const duration =
    years > 0
      ? `${years} yr${years > 1 ? 's' : ''} ${months} mo${months > 1 ? 's' : ''}`
      : `${months} mo${months > 1 ? 's' : ''}`

  return (
    <div className="pt-1 text-xs">{`${formattedStartDate} - ${formattedEndDate} · ${duration}`}</div>
  )
}
