import AnimatedWrapper from '@/app/ui/AnimatedWrapper'
import PrayersList from '@/app/ui/PrayersList'
import prisma from '@/lib/prisma'
import { PiHandsPraying } from 'react-icons/pi'

export default async function Books() {
  const prayers = await prisma.prayer.findMany()

  return (
    <AnimatedWrapper>
      <article className="max-w-4xl mx-auto">
        <h1 className="flex gap-2 justify-center items-center text-5xl font-bold font-serif mt-8 mb-10">
          <PiHandsPraying /> Молитви
        </h1>

        <PrayersList filteredPrayers={prayers} />
      </article>
    </AnimatedWrapper>
  )
}
