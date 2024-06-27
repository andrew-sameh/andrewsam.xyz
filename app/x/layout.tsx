import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { AppLayout } from '@/components/x/AppLayout'

export default async function XLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  if (!session) {
    redirect('/auth')
  }

  return <AppLayout session={session}>{children}</AppLayout>
}
