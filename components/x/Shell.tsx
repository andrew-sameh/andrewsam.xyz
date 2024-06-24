import * as React from 'react'

import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
interface ShellProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: string
  text?: string
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export function Shell({ children, className, ...props }: ShellProps) {
  return (
    <div
      className={cn(
        'flex h-[calc(100vh-56px)] flex-1 flex-col gap-4 p-4 lg:h-[calc(100vh-60px)] lg:gap-6 lg:p-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface ShellHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
  separator?: boolean
}

export function ShellHeader({ heading, text, children, separator }: ShellHeaderProps) {
  return (
    <div className={`flex flex-col`}>
      <div className={`flex-dir-row flex items-center justify-between px-2`}>
        <div className="grid gap-1">
          <div className="flex-dir-row m-0 flex p-0">
            <h1 className="font-heading text-start text-3xl font-semibold md:text-4xl ">
              {heading}
            </h1>
          </div>
          {text && (
            <div className="flex-dir-row m-0 flex p-0">
              <p className="text-start text-lg text-muted-foreground">{text}</p>
            </div>
          )}
        </div>
        {children}
      </div>
      {separator && <Separator className="my-4" />}
    </div>
  )
}

export function DashedShellContainer({ children, className, text, header, ...props }: ShellProps) {
  return (
    <div
      className={cn(
        'flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50',
        className
      )}
      {...props}
    >
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center gap-1 text-center">
        {header && <h3 className="text-2xl font-bold tracking-tight">{header}</h3>}
        {text && <p className="text-sm text-muted-foreground">{text}</p>}
        {children}
      </div>
    </div>
  )
}

export function ShellContainer({ children, className, containerSize, ...props }: ShellProps) {
  return (
    <div
      className={cn(
        't flex min-h-[400px] w-full flex-col gap-4 lg:gap-6',
        containerSize === 'sm' ? 'mx-auto max-w-[420px]' : '',
        containerSize === 'md' ? 'mx-auto max-w-[720px]' : '',
        containerSize === 'lg' ? 'mx-auto max-w-[960px]' : '',
        containerSize === 'xl' ? 'mx-auto max-w-[1200px]' : '',
        containerSize === '2xl' ? 'mx-auto max-w-[1440px]' : '',

        className
      )}
      {...props}
    >
      <div className="flex flex-col">{children}</div>
    </div>
  )
}
