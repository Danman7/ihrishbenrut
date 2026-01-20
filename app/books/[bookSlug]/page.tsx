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

        <div className="py-12 space-y-6">
          <GiBookCover className="text-center w-full text-4xl" />

          <h1 className="text-4xl font-bold text-center font-serif">{title}</h1>

          <div className="text-xl font-bold text-center">{author}</div>
        </div>

        {series.length ? (
          <p className="text-lg italic py-4">
            <span>{series.join(', ')}</span>
          </p>
        ) : null}

        <div className="space-y-6">
          {notes &&
            formatParagraphs(notes).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
        </div>

        <section className="flex flex-col ">
          <h2 className="flex items-center gap-4 text-3xl my-6 font-bold font-serif">
            <GiBookmarklet /> Глави
          </h2>

          <hr className="my-4 text-border" />

          <Suspense fallback={<ChapterListSkeleton />}>
            <BookChaptersList bookId={bookSlug} />
          </Suspense>
        </section>
      </article>
    </>
  )
}
