'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import Link, { LinkProps } from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/x/theme-toggle'
import UserDropdown from '@/components/UserDropdown'
import { Session } from 'next-auth'
import IconsBundle from '@/components/social-icons'
import { dashboardNavLinks } from '@/data/navLinks'
import SiteLogo from '@/components/SiteLogos'

interface HeaderProps {
  isCollapsed?: boolean
  session: Session | null
}

export function Header({ session, isCollapsed }: HeaderProps) {
  const [open, setOpen] = useState(false)

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 py-4 dark:border-gray-700 lg:h-[60px] lg:px-6">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <svg
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
            >
              <path
                d="M3 5H11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M3 12H16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M3 19H21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>{' '}
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col dark:border-gray-700">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
              prefetch={false}
            >
              <SiteLogo kind="darklogo" logoType="image" size={8} />
              <span className="sr-only">Andrew Sameh</span>
            </Link>

            {dashboardNavLinks.map((navLink) => {
              if (!navLink.hidden) {
                return (
                  <MobileLink
                    key={`${navLink.title}-xnavsheet`}
                    href={navLink.href}
                    className={cn(
                      'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground',
                      !navLink.active && 'pointer-events-none opacity-50'
                    )}
                    prefetch={false}
                    onOpenChange={setOpen}
                  >
                    <IconsBundle
                      kind={navLink.icon}
                      size={5}
                      hover={false}
                      iconType={'icon'}
                      strokeWidth={2}
                    />
                    {navLink.title}
                  </MobileLink>
                )
              }
            })}
          </nav>
          <div className="mt-auto">
            {/* <Card>
              <CardHeader>
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card> */}
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
              disabled
            />
          </div>
        </form>
      </div>
      {session && <UserDropdown session={session} />}
      <ThemeToggle />
    </header>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({ href, onOpenChange, className, children, ...props }: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
