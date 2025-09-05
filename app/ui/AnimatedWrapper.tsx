'use client'

import { motion } from 'motion/react'

export default function AnimatedWrapper({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}
