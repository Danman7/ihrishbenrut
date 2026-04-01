'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ROOT_NAVIGATION_ITEMS } from './constants'

export default function Page() {
  return (
    <main tabIndex={-1} className="edge-padding py-12 md:py-0">
      <section className="max-w-3xl mx-auto space-y-20 h-dvh flex flex-col justify-around">
        <div className="space-y-2 md:space-y-4 font-bold text-center font-display">
          <motion.div
            className="text-5xl md:text-6xl text-primary"
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            Библиотека
          </motion.div>

          <motion.div
            className="text-3xl md:text-4xl"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut', delay: 0.3 }}
          >
            на <span className="italic border-b">търсача</span>
          </motion.div>
        </div>

        <div className="space-y-4">
          <div className="flex-list text-lg justify-center">
            {ROOT_NAVIGATION_ITEMS.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  ease: 'easeOut',
                  delay: 0.6 + index * 0.3,
                }}
              >
                <Link href={item.href}>{item.name}</Link>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 1.2 }}
        >
          <p>
            В живота търсѝ първо обвивката, после – обвитото, след това –
            семката, и най-после – разумното.
          </p>
          <p className="font-bold text-right!">Учителят</p>

          <p>
            Да бъдеш свободен, значи да действаш в съгласие с Божията истина.
            Лошо е, когато търсиш истина, която да отговаря на твоите желания.
          </p>
          <p className="font-bold text-right!">Брат Михаил Омраам</p>

          <p>
            Защото всичко що е от по-напред писано, за поучение нам е
            преднаписано, та чрез търпението и утешението на писанието да имаме
            надежда.
          </p>
          <p className="font-bold text-right!">Римляни 15:4</p>

          <p>
            Търсенето е неизбежно. Търсачът на Истината си залага живота. Той е
            Цялостен - търси с ума, сърцето, и волята заедно.
          </p>
          <p className="font-bold text-right!">Елеазар Хараш</p>
        </motion.section>
      </section>
    </main>
  )
}
