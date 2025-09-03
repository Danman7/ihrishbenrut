import prisma from '@/lib/prisma'
import Link from 'next/link'
import { GiBookCover } from 'react-icons/gi'
import { getYearRange } from '@/app/utils'

export default async function Books() {
  const books = await prisma.book.findMany({
    include: {
      chapters: true,
    },
  })

  return (
    <article>
      <h1 className="text-center">
        <GiBookCover className="inline" /> Книги
      </h1>
      <div className="flex flex-col sm:flex-row gap-4">
        {books.map((book) => {
          const yearRange = getYearRange(book.chapters)

          return (
            <Link
              href={`/books/${book.id}`}
              key={book.id}
              className="relative w-full sm:w-1/2 md:w-1/3 flex flex-col items-center justify-center border-2 border-border shadow-md rounded-2xl p-4 hover:shadow-lg hover:border-primary transition active:text-background active:bg-primary text-center"
            >
              <div className="underline text-2xl mb-4 font-bold">
                {book.title}
              </div>
              <div className="text-xl mb-2 italic">{book.author}</div>
              <div>{book.series.join(', ')}</div>

              <div className="text-sm text-light">
                {book.chapters.length} глави - {yearRange}
              </div>
            </Link>
          )
        })}
      </div>
    </article>
  )
}
