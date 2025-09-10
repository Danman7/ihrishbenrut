import AnimatedWrapper from '@/app/ui/AnimatedWrapper'
import Breadcrumbs from '@/app/ui/Breadcrumbs'
import { formatParagraphs } from '@/app/utils'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { PiHandsPraying } from 'react-icons/pi'
import { TfiPencil } from 'react-icons/tfi'

export async function generateStaticParams() {
  const prayers = await prisma.prayer.findMany()

  return prayers.map((prayer) => ({
    prayerSlug: prayer.id,
  }))
}

export default async function Prayer({
  params,
}: {
  params: Promise<{ prayerSlug: string }>
}) {
  const { prayerSlug } = await params

  const prayer = await prisma.prayer.findUnique({
    where: { id: prayerSlug },
    select: {
      title: true,
      content: true,
      notes: true,
    },
  })

  if (!prayer) {
    notFound()
  }

  const { title, content, notes } = prayer

  const breadcrumbs = [
    { href: '/prayers', title: 'Молитви' },
    { href: `/prayers/${prayerSlug}`, title },
  ]

  return (
    <AnimatedWrapper>
      <article className="max-w-3xl mx-auto">
        <Breadcrumbs breadcrumbs={breadcrumbs} />

        <PiHandsPraying className="text-center w-full text-4xl" />
        <h1 className="text-4xl font-bold text-center font-serif mb-10">
          {title}
        </h1>

        {formatParagraphs(content).map((paragraph, index) => (
          <p className="font-serif text-lg text-center!" key={index}>
            {paragraph}
          </p>
        ))}

        {notes && (
          <section className="flex flex-col ">
            <h2 className="flex items-center gap-2 text-2xl mt-12 font-bold font-serif">
              <TfiPencil /> Бележки
            </h2>

            {formatParagraphs(notes).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </section>
        )}
      </article>
    </AnimatedWrapper>
  )
}
