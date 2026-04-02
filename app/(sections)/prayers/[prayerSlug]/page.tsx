import Breadcrumbs from '@/app/ui/Breadcrumbs'
import { formatParagraphs } from '@/app/utils'
import prisma from '@/lib/prisma'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PiHandsPraying } from 'react-icons/pi'
import { TfiPencil } from 'react-icons/tfi'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ prayerSlug: string }>
}): Promise<Metadata> {
  const { prayerSlug } = await params

  const prayer = await prisma.prayer.findUnique({
    where: { id: prayerSlug },
    select: {
      title: true,
    },
  })

  if (!prayer)
    return {
      title: 'Само Твоята Воля',
    }

  return {
    title: `${prayer.title}`,
  }
}

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
    <>
      <article>
        <Breadcrumbs breadcrumbs={breadcrumbs} />

        <section>
          <h1 className="flex-center flex-wrap">{title}</h1>

          <section className="space-y-6">
            {formatParagraphs(content).map((paragraph, index) => (
              <p className="text-lg" key={index}>
                {paragraph}
              </p>
            ))}
          </section>

          {notes && (
            <section>
              <h2 className="flex-center">
                <TfiPencil /> Бележки
              </h2>

              <section className="space-y-6">
                {formatParagraphs(notes).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </section>
            </section>
          )}
        </section>
      </article>
    </>
  )
}
