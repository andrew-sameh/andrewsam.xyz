import SectionContainer from '@/components/SectionContainer'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  className?: string
  length?: number
  color?: string
}

export default function FullWidthSection({
  children,
  size = 'sm',
  className,
  length = 40,
  color = 'secondary',
}: Props) {
  let classNameN

  switch (size) {
    case 'sm':
      classNameN = 'mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-[50rem] xl:px-8'
      break
    case 'md':
      classNameN = 'mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-[64rem] xl:px-8'
      break
    case 'lg':
      classNameN = 'mx-auto max-w-3xl px-4 sm:px-9 xl:max-w-[73rem] xl:px-0 py-4'
      break
    case 'xl':
      classNameN = 'mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-[80rem] xl:px-8'
      break
    case '2xl':
      classNameN = 'mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-[96rem] xl:px-8'
  }

  //     return(
  //   <section className=" my-4">
  //     <div className="absolute left-0 z-1 w-screen bg-red-500 m-10">
  //       <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-[50rem] xl:px-8">
  //         This element is full width of the viewport.This element is full width of the viewport.This
  //         element is full width of the viewport.This element is full width of the viewport.This
  //         element is full width of the viewport.This element is full width of the viewport.
  //       </div>
  //     </div>
  //   </section>
  // )
  return (
    <>
      <section className="pb-4 pt-4">
        <div className={`z-1 absolute left-0 w-screen bg-${color} p-10`}>
          <section className={cn(classNameN, className)}>{children}</section>
        </div>
      </section>
      <section className={`h-[${length}rem]`} />
      {/* <section className={`h-[40rem]`} /> */}
    </>
  )
}
