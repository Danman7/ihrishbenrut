import BookChaptersRange from '@/app/ui/BookChaptersRange'
import { ChapterRangeSkeleton } from '@/app/ui/ChapterRangeSkeleton'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Suspense } from 'react'
import { GiBookCover } from 'react-icons/gi'

export default async function Books() {
  const books = await prisma.book.findMany()

  return (
    <article className="max-w-4xl mx-auto">
      <h1 className="flex gap-2 text-center text-5xl font-bold font-serif mt-8 mb-10">
        <GiBookCover /> Книги
      </h1>

      <div className="flex flex-col md:flex-row gap-4">
        {books.map((book) => {
          return (
            <Link
              href={`/books/${book.id}`}
              key={book.id}
              className="relative w-full md:w-1/3 flex flex-col items-center justify-center border-2 border-border shadow-md rounded-2xl p-4 hover:shadow-lg hover:border-primary transition active:text-background active:bg-primary text-center"
            >
              <div className="underline underline-offset-2 text-2xl mb-4 font-bold font-serif">
                {book.title}
              </div>
              <div className="text-xl mb-2 italic">{book.author}</div>
              <div>{book.series.join(', ')}</div>

              <Suspense fallback={<ChapterRangeSkeleton />}>
                <BookChaptersRange bookId={book.id} />
              </Suspense>
            </Link>
          )
        })}
      </div>
    </article>
  )
}
