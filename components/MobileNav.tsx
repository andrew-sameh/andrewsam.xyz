'use client'

import headerNavLinks from '@/data/headerNavLinks'
// import { Menu, X } from 'lucide-react'
import { LuMenu as Menu } from 'react-icons/lu'

import { useState } from 'react'

import Link from './Link'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const MobileNav = () => {
  // const [navShow, setNavShow] = useState(false)

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex size-9 items-center justify-center p-2 md:hidden"
          type="button"
          aria-label="Toggle menu"
          variant="ghost"
          // onClick={onToggleNav}
        >
          <span className="sr-only">Toggle menu</span>
          <Menu className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[10rem]">
        {headerNavLinks.map(
          (link) =>
            !link.hidden && (
              <DropdownMenuItem key={link.title} disabled={!!link.disabled} asChild>
                <Link href={link.href} className="flex items-center gap-4">
                  {/* {link.icon} */}
                  <div>{link.title}</div>
                </Link>
              </DropdownMenuItem>
            )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default MobileNav
