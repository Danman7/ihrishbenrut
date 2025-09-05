import BookChaptersList from '@/app/ui/BookChaptersList'
import Breadcrumbs from '@/app/ui/Breadcrumbs'
import { ChapterListSkeleton } from '@/app/ui/ChapterListSkeleton'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { GiBookCover, GiBookmarklet } from 'react-icons/gi'

export async function generateStaticParams() {
  const books = await prisma.book.findMany()

  return books.map((book) => ({
    bookSlug: book.id,
  }))
}

export default async function Book({
  params,
}: {
  params: Promise<{ bookSlug: string }>
}) {
  const { bookSlug } = await params

  const book = await prisma.book.findUnique({
    where: { id: bookSlug },
  })

  if (!book) {
    notFound()
  }

  const { title, originalNotes, rewriteNotes, series } = book

  const breadcrumbs = [
    { href: '/books', title: 'Книги' },
    { href: `/books/${bookSlug}`, title },
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

        <Suspense fallback={<ChapterListSkeleton />}>
          <BookChaptersList bookId={bookSlug} />
        </Suspense>
      </section>
    </article>
  )
}
