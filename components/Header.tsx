'use client'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from '@/components/ThemeSwitcher'
import SearchButton from './SearchButton'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import AnalyticsButton from '@/components/UmamiButton'
import { usePathname } from 'next/navigation'
import { Session } from 'next-auth'
import UserDropdown from '@/components/UserDropdown'
import { Suspense } from 'react'
import SiteLogo from '@/components/SiteLogos'

const Header = ({ session }: { session: Session | null }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  // const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const changeBackground = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    document.addEventListener('scroll', changeBackground)

    return () => document.removeEventListener('scroll', changeBackground)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 left-[calc(100vw-100%)] top-4 z-40 mx-8 flex h-[60px] items-center justify-between rounded-3xl border border-border bg-card px-4 shadow-sm saturate-100 backdrop-blur-[4px] transition-all duration-200 header-md:mx-auto header-md:max-w-[768px] header-md:px-8 header-lg:max-w-[1168px]',
        isScrolled && 'border-transparent bg-background/80'
      )}
    >
      <div className="mx-auto flex h-[60px] w-full items-center justify-between">
        <div>
          <SiteLogo kind={'logo'} size={10} logoType="link" />
        </div>
        <div className="flex items-center md:space-x-3">
          <ul className="hidden space-x-2 md:flex">
            {headerNavLinks.map(
              (link, i) =>
                !link.hidden && (
                  <li key={i}>
                    <Button
                      disabled={!!link.disabled}
                      variant={
                        (pathname.startsWith(link.href) && link.href !== '/') ||
                        pathname === link.href
                          ? 'secondary'
                          : 'outline'
                      }
                      // className={` px-3 py-2 text-sm font-medium ${pathname === link.href ? 'bg-accent text-muted-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                      className={` border-0 px-3 py-2 text-sm font-medium`}
                      asChild
                    >
                      <Link
                        // className="rounded px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-secondary hover:brightness-125"
                        href={link.href}
                      >
                        {link.title}
                      </Link>
                    </Button>
                  </li>
                )
            )}
          </ul>
          <SearchButton />
          <AnalyticsButton />
          <ThemeSwitch />
          {session ? (
            <UserDropdown session={session} />
          ) : // (
          //   <Suspense fallback="...">
          //     <SignInModal />
          //   </Suspense>
          // )
          null}
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header
