'use client'
import siteMetadata from '@/data/siteMetadata'
import { headerNavLinks } from '@/data/navLinks'
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

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

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
          <NavigationMenu className="hidden  md:flex">
            <NavigationMenuList>
              {headerNavLinks.map(
                (link, i) =>
                  !link.hidden && (
                    <NavigationMenuItem key={link.href}>
                      <Link href={link.href} key={`link-${link.href}`} legacyBehavior passHref>
                        <NavigationMenuLink
                          active={
                            (pathname.startsWith(link.href) && link.href !== '/') ||
                            pathname === link.href
                          }
                          className={cn(
                            navigationMenuTriggerStyle(),
                            (pathname.startsWith(link.href) && link.href !== '/') ||
                              pathname === link.href
                              ? 'text-foreground'
                              : 'text-foreground/60'
                          )}
                        >
                          {link.title}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  )
              )}
            </NavigationMenuList>
          </NavigationMenu>

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

// export function NavigationMenuDemo() {
//   return (
//     <NavigationMenu>
//       <NavigationMenuList>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
//               <li className="row-span-3">
//                 <NavigationMenuLink asChild>
//                   <a
//                     className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
//                     href="/"
//                   >
//                     <Icons.logo className="h-6 w-6" />
//                     <div className="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
//                     <p className="text-sm leading-tight text-muted-foreground">
//                       Beautifully designed components that you can copy and paste into your apps.
//                       Accessible. Customizable. Open Source.
//                     </p>
//                   </a>
//                 </NavigationMenuLink>
//               </li>
//               <ListItem href="/docs" title="Introduction">
//                 Re-usable components built using Radix UI and Tailwind CSS.
//               </ListItem>
//               <ListItem href="/docs/installation" title="Installation">
//                 How to install dependencies and structure your app.
//               </ListItem>
//               <ListItem href="/docs/primitives/typography" title="Typography">
//                 Styles for headings, paragraphs, lists...etc
//               </ListItem>
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger>Components</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
//               {components.map((component) => (
//                 <ListItem key={component.title} title={component.title} href={component.href}>
//                   {component.description}
//                 </ListItem>
//               ))}
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <Link href="/docs" legacyBehavior passHref>
//             <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//               Documentation
//             </NavigationMenuLink>
//           </Link>
//         </NavigationMenuItem>
//       </NavigationMenuList>
//     </NavigationMenu>
//   )
// }

// const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
//   ({ className, title, children, ...props }, ref) => {
//     return (
//       <li>
//         <NavigationMenuLink asChild>
//           <a
//             ref={ref}
//             className={cn(
//               'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
//               className
//             )}
//             {...props}
//           >
//             <div className="text-sm font-medium leading-none">{title}</div>
//             <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
//           </a>
//         </NavigationMenuLink>
//       </li>
//     )
//   }
// )
// ListItem.displayName = 'ListItem'
