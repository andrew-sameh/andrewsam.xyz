import SectionContainer from '@/components/SectionContainer'
import { redirect } from 'next/navigation'
import { auth } from "@/auth"

export default async function XLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) {
    redirect(`/auth`)
  }
  return (
    <div className="">
      {children}
    </div>
  )
}
