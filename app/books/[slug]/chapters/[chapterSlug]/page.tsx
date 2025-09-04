import Breadcrumbs from '@/app/ui/Breadcrumbs'
import { formatDateAndLocation, formatParagraphs } from '@/app/utils'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { GiBookmarklet } from 'react-icons/gi'

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

  const content = await prisma.chapterContent.findFirst({
    where: { chapterId: chapter.id },
  })

  if (!content) {
    notFound()
  }

  const { title, date, book, quote, location, number } = chapter

  const breadcrumbs = [
    { href: '/books', title: 'Книги' },
    { href: `/books/${bookSlug}`, title: book.title },
    { href: `/books/${bookSlug}/chapters/${chapterSlug}`, title },
  ]

  return (
    <article>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      {number ? (
        <div className="flex justify-center items-center text-2xl font-serif gap-2 mb-2">
          <GiBookmarklet />
          {number}
        </div>
      ) : null}

      <h1 className="text-center text-3xl font-bold font-serif mb-10">
        {title}
      </h1>

      <p className="text-sm">{formatDateAndLocation(date, location)}</p>

      {quote && <div className="italic font-bold mb-2">{quote}</div>}

      <section className="flex flex-col items-center">
        {formatParagraphs(content.content).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>
    </article>
  )
}
