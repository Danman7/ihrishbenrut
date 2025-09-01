import Breadcrumbs from '@/app/ui/Breadcrumbs'
import { formatDateAndLocation, formatParagraphs } from '@/app/utils'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function Chapter({
  params,
}: {
  params: Promise<{ slug: string; chapterSlug: string }>
}) {
  const { slug: bookSlug, chapterSlug } = await params

  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterSlug },
    include: { book: true },
  })

  if (!chapter) {
    notFound()
  }

  const { title, date, content, book, quote, location } = chapter

  const breadcrumbs = [
    { href: '/books', title: 'Книги' },
    { href: `/books/${bookSlug}`, title: book.title },
    { href: `/books/${bookSlug}/chapters/${chapterSlug}`, title },
  ]

  return (
    <article>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <h1 className="text-center">{title}</h1>

      <p className="text-sm text-light">
        {formatDateAndLocation(date, location)}
      </p>

      {quote && <strong className="text-xl text-light">{quote}</strong>}

      <section className="flex flex-col items-center">
        {formatParagraphs(content).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>
    </article>
  )
}
