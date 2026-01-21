'use client'

import { AnimatePresence, motion } from 'motion/react'

import { Wisdom } from '@/app/generated/prisma'

export default function WisdomList({
  filteredWisdom,
}: {
  filteredWisdom: Wisdom[]
}) {
  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence>
        {filteredWisdom.map((wisdom) => {
          return (
            <motion.div
              key={wisdom.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full border-2 border-border shadow-md rounded-2xl p-4 transition"
            >
              <div className="text-lg">{wisdom.text}</div>
              <div className="text-right">{wisdom.source}</div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
