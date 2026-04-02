'use client'

import { AnimatePresence, motion } from 'motion/react'

import { Card } from '@/app/ui/Card'
import { Prayer } from '@/app/generated/prisma'

export default function PrayersList({
  filteredPrayers,
}: {
  filteredPrayers: Prayer[]
}) {
  return (
    <div className="grid-list">
      <AnimatePresence>
        {filteredPrayers.map((prayer) => {
          return (
            <motion.div
              key={prayer.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card title={prayer.title} href={`/prayers/${prayer.id}`}>
                <section>
                  <p>
                    {prayer.content.length > 50
                      ? prayer.content.substring(0, 50) + '...'
                      : prayer.content}
                  </p>
                </section>
              </Card>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
