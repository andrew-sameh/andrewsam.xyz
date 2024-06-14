'use client'

import { motion } from 'framer-motion'
import siteMetadata from '@/data/siteMetadata'
import { useEffect, useState } from 'react'
import { LuLineChart } from 'react-icons/lu'

const AnalyticsButton = () => {
  const [mounted, setMounted] = useState(false)

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  return (
    mounted && (
      <a
        href={siteMetadata.analyticsURL ?? ''}
        target="_blank"
        rel="noopener noreferrer"
        id="analytics-btn"
        aria-label="Check Site Analytics"
        className="ml-1 mr-1 inline-block h-8 w-8 rounded p-1"
      >
        <motion.div
          whileTap={{
            scale: 0.7,
            rotate: 360,
            transition: { duration: 0.2 },
          }}
          whileHover={{ scale: 1.2 }}
        >
          <LuLineChart className="h-5 w-5" />
          <span className="sr-only">{'Umami Analytics'}</span>
        </motion.div>
      </a>
    )
  )
}

export default AnalyticsButton
