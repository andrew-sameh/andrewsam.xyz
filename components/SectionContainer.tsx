import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
interface Props {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  className?: string
}

export default function SectionContainer({ children, size = 'lg', className }: Props) {
  let classNameN

  switch (size) {
    case 'sm':
      classNameN = 'mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-[50rem] xl:px-8'
      break
    case 'md':
      classNameN = 'mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-[64rem] xl:px-8'
      break
    case 'lg':
      classNameN = 'mx-auto max-w-3xl px-4 sm:px-9 xl:max-w-[73rem] xl:px-0'
      break
    case 'xl':
      classNameN = 'mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-[80rem] xl:px-8'
      break
    case '2xl':
      classNameN = 'mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-[96rem] xl:px-8'
  }

  return <section className={cn(classNameN, className)}>{children}</section>
}
