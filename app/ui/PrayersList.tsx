'use client'

import { AnimatePresence, motion } from 'motion/react'

import { Prayer } from '@/app/generated/prisma'
import Link from 'next/link'

export default function PrayersList({
  filteredPrayers,
}: {
  filteredPrayers: Prayer[]
}) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <AnimatePresence>
        {filteredPrayers.map((prayer) => {
          return (
            <motion.div
              key={prayer.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative flex flex-col items-center justify-center border-2 border-border shadow-md rounded-2xl p-4 hover:shadow-lg hover:border-primary transition active:text-background active:bg-primary text-center"
            >
              <Link href={`/prayers/${prayer.id}`}>
                <div className="text-2xl mb-2 font-bold font-serif">
                  {prayer.title}
                </div>

                <div>
                  {prayer.content.length > 100
                    ? prayer.content.substring(0, 100) + '...'
                    : prayer.content}
                </div>
              </Link>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
