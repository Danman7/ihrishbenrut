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
      className="md:hidden"
      id="scroll-indicator"
      style={{
        scaleX,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 10,
        originX: 0,
        backgroundColor: 'var(--primary)',
        transformOrigin: '0%',
      }}
    />
  )
}
