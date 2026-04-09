'use client'

import Link from 'next/link'
import { motion, stagger } from 'motion/react'
import { ROOT_NAVIGATION_ITEMS } from './constants'
import { delay } from 'motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: stagger(0.6),
    },
  },
}

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
}

export default function Page() {
  return (
    <main tabIndex={-1} className="edge-padding py-12">
      <section className="max-w-[70ch] mx-auto space-y-20 h-dvh flex flex-col justify-around">
        <div className="space-y-2 md:space-y-4 font-bold text-center font-display">
          <motion.div
            className="text-5xl md:text-8xl text-primary"
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            Библиотека
          </motion.div>

          <motion.div
            className="text-4xl md:text-6xl"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut', delay: 0.3 }}
          >
            на <span className="italic border-b">търсача</span>
          </motion.div>
        </div>

        <div className="space-y-4">
          <div className="flex-list justify-center text-xl">
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

        <motion.section variants={container} initial="hidden" animate="show">
          <motion.div variants={item}>
            <p>
              Духът се ражда там, където е натрупан Огъня, там, където е
              натрупана енергията.
            </p>
            <p className="font-bold text-right!">Учителят</p>
          </motion.div>

          <motion.div variants={item}>
            <p>
              Търсенето е неизбежно. Търсачът на Истината си залага живота. Той
              е Цялостен - търси с ума, сърцето, и волята заедно.
            </p>
            <p className="font-bold text-right!">Елеазар Хараш</p>
          </motion.div>

          <motion.div variants={item}>
            <p>
              Да бъдеш свободен, значи да действаш в съгласие с Божията истина.
              Лошо е, когато търсиш истина, която да отговаря на твоите желания.
            </p>
            <p className="font-bold text-right!">Брат Михаил Омраам</p>
          </motion.div>

          <motion.div variants={item}>
            <p>
              Защото всичко що е от по-напред писано, за поучение нам е
              преднаписано, та чрез търпението и утешението на писанието да
              имаме надежда.
            </p>
            <p className="font-bold text-right!">Римляни 15:4</p>
          </motion.div>
        </motion.section>
      </section>
    </main>
  )
}
