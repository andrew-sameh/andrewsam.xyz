"use client"
import { useEffect } from 'react'

export default function Loader() {
  useEffect(() => {
    async function getLoader() {
      const { jellyTriangle } = await import('ldrs')
      jellyTriangle.register()
    }
    getLoader()
  }, [])
  return <l-jelly-triangle color="#023D72"></l-jelly-triangle>
}