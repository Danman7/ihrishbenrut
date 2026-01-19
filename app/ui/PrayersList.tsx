'use client'

import { AnimatePresence, motion } from 'motion/react'

import Card from '@/app/ui/Card'
import { Prayer } from '@/app/generated/prisma'
import Link from 'next/link'

export default function PrayersList({
  filteredPrayers,
}: {
  filteredPrayers: Prayer[]
}) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <AnimatePresence>
        {filteredPrayers.map((prayer) => {
          return (
            <motion.div
              key={prayer.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card>
                <Link href={`/prayers/${prayer.id}`} className="w-full h-full">
                  <div className="text-2xl mb-2 font-bold font-serif">
                    {prayer.title}
                  </div>

                  <div>
                    {prayer.content.length > 100
                      ? prayer.content.substring(0, 100) + '...'
                      : prayer.content}
                  </div>
                </Link>
              </Card>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
