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
  return <l-jelly-triangle color="#AFF5F5"></l-jelly-triangle>
}