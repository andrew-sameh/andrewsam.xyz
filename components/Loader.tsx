'use client'
import { useEffect } from 'react'
import { useTheme } from 'next-themes'

export default function Loader() {
  const { theme } = useTheme()
  const color = theme === 'light' ? '#023D72' : '#D4E7F7' // Change the colors as per your requirement

  useEffect(() => {
    async function getLoader() {
      const { jellyTriangle } = await import('ldrs')
      jellyTriangle.register()
    }
    getLoader()
  }, [])
  return <l-jelly-triangle color={color}></l-jelly-triangle>
}
