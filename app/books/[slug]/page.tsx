import Breadcrumbs from '@/app/ui/Breadcrumbs'
import { formatDateAndLocation } from '@/app/utils'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GiBookCover, GiBookmarklet } from 'react-icons/gi'

export default async function Book({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const book = await prisma.book.findUnique({
    where: { id: slug },
  })

  if (!book) {
    notFound()
  }

  const chapters = await prisma.chapter.findMany({
    where: {
      bookId: slug,
    },
  })

  const { title, originalNotes, rewriteNotes, series } = book

  const breadcrumbs = [
    { href: '/books', title: 'Книги' },
    { href: `/books/${slug}`, title },
  ]

  return (
    <article>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <GiBookCover className="text-center w-full text-4xl" />
      <h1 className="text-4xl font-bold text-center font-serif mb-10">
        {title}
      </h1>

      {series.length ? (
        <p className="text-lg italic">
          <span>{series.join(', ')}</span>
        </p>
      ) : null}

      {originalNotes && (
        <p>
          <strong>Оригинал:</strong> {originalNotes}
        </p>
      )}

      {rewriteNotes && (
        <p>
          <strong>Препис:</strong> {rewriteNotes}
        </p>
      )}
      <section className="flex flex-col ">
        <h2 className="flex items-center gap-4 text-3xl my-6 font-bold font-serif">
          <GiBookmarklet /> Глави
        </h2>
        {chapters.map((chapter) => (
          <Link
            key={chapter.id}
            href={`/books/${slug}/chapters/${chapter.id}`}
            className="text-lg mb-4"
          >
            <div className="underline underline-offset-2 hover:decoration-3 font-bold">
              {chapter.number && `${chapter.number}.`} {chapter.title}
            </div>
            {chapter.date && (
              <div className="text-sm">
                {formatDateAndLocation(chapter.date, chapter.location)}
              </div>
            )}
          </Link>
        ))}
      </section>
    </article>
  )
}
