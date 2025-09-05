'use client'

import { motion, useScroll, useTransform } from 'motion/react'

export default function PageProgressBar() {
  const { scrollYProgress, scrollY } = useScroll()

  // Create a reactive scaleX that only activates when scrollY > 1
  const scaleX = useTransform(() =>
    scrollY.get() > 1 ? scrollYProgress.get() : 0
  )

  return (
    <motion.div
      className="h-2 md:h-1 w-full"
      id="scroll-indicator"
      style={{
        scaleX,
        originX: 0,
        backgroundColor: 'var(--primary)',
      }}
    />
  )
}
