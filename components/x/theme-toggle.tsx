'use client'

import { LuMoon as Moon, LuSun as Sun } from 'react-icons/lu'
import { useTheme } from 'next-themes'
import { buttonVariants } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function ThemeToggle({
  className,
  isDisabled,
}: {
  className?: string
  isDisabled?: boolean
}) {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={isDisabled}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className={cn(
        'h-9 w-9 rounded-3xl border',
        // buttonVariants({ variant: "ghost" }),
        className
      )}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />

      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
