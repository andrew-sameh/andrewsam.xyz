'use client'
import * as React from 'react'
import { ReactNode } from 'react'
import { NavBar } from '@/components/x/NavBar'
import { Header } from '@/components/x/Header'
import { Session } from 'next-auth'

import { ScrollArea } from '@/components/ui/scroll-area'

interface AppLayoutProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode
  defaultCollapsed?: boolean
  session: Session | null
}

export function AppLayout({ children, defaultCollapsed = false, session }: AppLayoutProps) {
  return (
    <div className="grid w-full md:grid-cols-[56px_1fr] lg:grid-cols-[56px_1fr]">
      {/* <div className="grid w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"> */}
      <NavBar />
      <div className="flex h-screen flex-col">
        <Header session={session} />
        <ScrollArea className="">{children}</ScrollArea>
      </div>
    </div>
  )
}
