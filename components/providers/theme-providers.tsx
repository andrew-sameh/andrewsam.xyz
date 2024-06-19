'use client'

import { ThemeProvider } from 'next-themes'
import siteMetadata from '@/data/siteMetadata'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProviders({ children, ...props }: ThemeProviderProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme} enableSystem {...props}>
      {children}
    </ThemeProvider>
  )
}
