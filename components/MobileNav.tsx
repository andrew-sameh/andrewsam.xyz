'use client'

import { headerNavLinks } from '@/data/navLinks'
// import { Menu, X } from 'lucide-react'
import { LuMenu as Menu } from 'react-icons/lu'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

import { useState } from 'react'

// import Link from './Link'
import Link, { LinkProps } from 'next/link'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import siteMetadata from '@/data/siteMetadata'
import SiteLogo from '@/components/SiteLogos'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'

const MobileNav = () => {
  // const [navShow, setNavShow] = useState(false)
  const [open, setOpen] = useState(false)

  // const onToggleNav = () => {
  //   setNavShow((status) => {
  //     if (status) {
  //       document.body.style.overflow = 'auto'
  //     } else {
  //       // Prevent scrolling
  //       document.body.style.overflow = 'hidden'
  //     }
  //     return !status
  //   })
  // }
  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button
    //       className="flex size-9 items-center justify-center p-2 md:hidden"
    //       type="button"
    //       aria-label="Toggle menu"
    //       variant="ghost"
    //       // onClick={onToggleNav}
    //     >
    //       <span className="sr-only">Toggle menu</span>
    //       <Menu className="h-5 w-5" />
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent align="end" className="min-w-[10rem]">
    //     {headerNavLinks.map(
    //       (link) =>
    //         !link.hidden && (
    //           <DropdownMenuItem key={link.title} disabled={!!link.disabled} asChild>
    //             <Link href={link.href} className="flex items-center gap-4">
    //               {/* {link.icon} */}
    //               <div>{link.title}</div>
    //             </Link>
    //           </DropdownMenuItem>
    //         )
    //     )}
    //   </DropdownMenuContent>
    // </DropdownMenu>
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mx-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
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
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink href="/" className="flex items-center" onOpenChange={setOpen}>
          {/* <Icons.logo className="mr-2 h-4 w-4" /> */}
          <SiteLogo kind="logo" size={6} logoType="image" className="mr-2" />
          <span className="font-bold">{siteMetadata.title}</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            {headerNavLinks.map(
              (item) =>
                item.href &&
                !item.hidden && (
                  <MobileLink key={item.href} href={item.href} onOpenChange={setOpen}>
                    {item.title}
                  </MobileLink>
                )
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
export default MobileNav

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
