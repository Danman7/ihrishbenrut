import AnimatedWrapper from '@/app/ui/AnimatedWrapper'
import BookChaptersList from '@/app/ui/BookChaptersList'
import Breadcrumbs from '@/app/ui/Breadcrumbs'
import { ChapterListSkeleton } from '@/app/ui/ChapterListSkeleton'
import { formatParagraphs } from '@/app/utils'
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
    <AnimatedWrapper>
      <article className="max-w-3xl mx-auto">
        <Breadcrumbs breadcrumbs={breadcrumbs} />

        <GiBookCover className="text-center w-full text-4xl" />
        <h1 className="text-4xl font-bold text-center font-serif mb-2">
          {title}
        </h1>

        <div className="text-xl font-bold text-center mb-10">{author}</div>

        {series.length ? (
          <p className="text-lg italic">
            <span>{series.join(', ')}</span>
          </p>
        ) : null}

        {notes &&
          formatParagraphs(notes).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

        <section className="flex flex-col ">
          <h2 className="flex items-center gap-4 text-3xl my-6 font-bold font-serif">
            <GiBookmarklet /> Глави
          </h2>

          <Suspense fallback={<ChapterListSkeleton />}>
            <BookChaptersList bookId={bookSlug} />
          </Suspense>
        </section>
      </article>
    </AnimatedWrapper>
  )
}
