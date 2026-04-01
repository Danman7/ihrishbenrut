import BookChaptersList from '@/app/ui/BookChaptersList'
import Breadcrumbs from '@/app/ui/Breadcrumbs'
import { ChapterListSkeleton } from '@/app/ui/ChapterListSkeleton'
import { formatParagraphs } from '@/app/utils'
import prisma from '@/lib/prisma'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { GiBookCover, GiBookmarklet } from 'react-icons/gi'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bookSlug: string }>
}): Promise<Metadata> {
  const { bookSlug } = await params

  const book = await prisma.book.findUnique({
    where: { id: bookSlug },
    select: {
      title: true,
      author: true,
    },
  })

  if (!book)
    return {
      title: 'Само Твоята Воля',
    }

  return {
    title: `${book.title} | ${book.author}`,
  }
}

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
    select: {
      title: true,
      notes: true,
      author: true,
      series: true,
    },
  })

  if (!book) {
    notFound()
  }

  const { title, author, notes, series } = book

  const breadcrumbs = [
    { href: '/books', title: 'Книги' },
    { href: `/books/${bookSlug}`, title },
  ]

  return (
    <>
      <article className="max-w-3xl mx-auto">
        <Breadcrumbs breadcrumbs={breadcrumbs} />

        <section className="py-12">
          <h1 className="font-bold flex-center justify-center">
            <GiBookCover /> {title}
          </h1>

          <div className="font-bold text-center">{author}</div>
        </section>

        {series.length ? (
          <p className="text-lg italic">
            <span>{series.join(', ')}</span>
          </p>
        ) : null}

        <section>
          {notes &&
            formatParagraphs(notes).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
        </section>

        <section>
          <h2 className="flex items-center gap-4 font-bold">
            <GiBookmarklet /> Глави
          </h2>

          <hr />

          <Suspense fallback={<ChapterListSkeleton />}>
            <BookChaptersList bookId={bookSlug} />
          </Suspense>
        </section>
      </article>
    </>
  )
}
