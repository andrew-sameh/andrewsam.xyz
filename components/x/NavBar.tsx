'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
// import { Badge } from '@/components/ui/badge'
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import SiteLogo from '@/components/SiteLogos'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { dashboardNavLinks } from '@/data/navLinks'
import IconsBundle from '@/components/social-icons'
interface NavProps {
  isCollapsed?: boolean
}

function checkURLPath(href: string, pathname: string) {
  const pathParts = href.split('/')

  if (pathParts.length < 3) {
    return href === pathname
  } else {
    return pathname.startsWith(href)
  }
}
export function NavBar({ isCollapsed }: NavProps) {
  const pathname = usePathname()
  return (
    <div className="hidden border-r bg-muted/40 dark:border-gray-700 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        {/* <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6"> */}
        <div className="flex h-14 items-center border-b p-2 dark:border-gray-700 lg:h-[60px]">
          <Button variant="ghost" size="icon" aria-label="Home" asChild>
            <Link href="/" className="flex items-center gap-2 font-semibold" prefetch={false}>
              {/* <Package2Icon className="h-5 w-5" /> */}
              <SiteLogo kind="darklogo" logoType="image" size={6} />
              {/* <span className="">Acme Inc</span> */}
            </Link>
          </Button>

          {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <BellIcon className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button> */}
        </div>
        <div className="flex-1">
          <nav className="grid items-start p-2 text-sm font-medium">
            {/* <nav className="grid items-start px-2 text-sm font-medium lg:px-4"> */}
            <TooltipProvider>
              {/* <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                prefetch={false}
              >
                <HomeIcon className="h-4 w-4" />
                Dashboard
              </Link> */}
              {/* <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg bg-muted"
                    aria-label="Playground"
                  >
                    <SquareTerminalIcon className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Playground
                </TooltipContent>
              </Tooltip> */}
              {dashboardNavLinks.map((navLink) => {
                if (!navLink.hidden && navLink.location === 'top') {
                  return (
                    <Tooltip key={navLink.title}>
                      <TooltipTrigger asChild>
                        <Link
                          {...(!navLink.active && { disabled: true })} // Add disabled prop based on link.active
                          key={`${navLink.title}-xnavtop`}
                          href={navLink.href}
                          prefetch={false}
                          className={cn(
                            buttonVariants({
                              variant: checkURLPath(navLink.href, pathname) ? 'outline' : 'ghost',
                              size: 'icon',
                            }),
                            'my-1',

                            // checkURLPath(navLink.href, pathname) &&
                            //   'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
                            !navLink.active && 'pointer-events-none opacity-50'
                          )}
                        >
                          <IconsBundle
                            kind={navLink.icon}
                            size={5}
                            hover={false}
                            iconType={'icon'}
                            strokeWidth={2}
                          />
                          <span className="sr-only">{navLink.title}</span>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        sideOffset={5}
                        className="flex items-center gap-4"
                      >
                        {navLink.title}
                        {navLink.label && <span className="ml-auto">{navLink.label}</span>}
                      </TooltipContent>
                    </Tooltip>
                  )
                }
              })}
            </TooltipProvider>
          </nav>
        </div>
        {/* <div className="mt-auto p-4"> */}
        <div className="mt-auto p-2">
          {/* <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>Unlock all features and get unlimited access to our support team.</CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card> */}
          {dashboardNavLinks.map((navLink) => {
            if (!navLink.hidden && navLink.location === 'bottom') {
              return (
                <Tooltip key={navLink.title}>
                  <TooltipTrigger asChild>
                    <Link
                      {...(!navLink.active && { disabled: true })} // Add disabled prop based on link.active
                      key={`${navLink.title}-xnavbottom`}
                      href={navLink.href}
                      prefetch={false}
                      className={cn(
                        buttonVariants({
                          variant: checkURLPath(navLink.href, pathname) ? 'secondary' : 'ghost',
                          size: 'icon',
                        }),
                        'my-1',
                        // checkURLPath(navLink.href, pathname) &&
                        //   'dark:bg-accent dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
                        !navLink.active && 'pointer-events-none opacity-50'
                      )}
                    >
                      <IconsBundle
                        kind={navLink.icon}
                        size={5}
                        hover={false}
                        iconType={'icon'}
                        strokeWidth={2}
                      />
                      <span className="sr-only">{navLink.title}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={5} className="flex items-center gap-4">
                    {navLink.title}
                    {navLink.label && <span className="ml-auto">{navLink.label}</span>}
                  </TooltipContent>
                </Tooltip>
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}
