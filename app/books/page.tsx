import prisma from '@/lib/prisma'
import Link from 'next/link'
import { GiBookCover } from 'react-icons/gi'

export default async function Books() {
  const books = await prisma.book.findMany()

  return (
    <article>
      <h1>
        <GiBookCover className="inline" /> Книги
      </h1>
      <div className="flex gap-4">
        {books.map((book) => (
          <Link
            href={`/books/${book.id}`}
            key={book.id}
            className="relative w-1/2 md:w-1/3 flex items-center justify-center h-24 border-2 border-border shadow-md"
            style={{ borderRadius: '3em 0.5em 0.5em 0' }}
          >
            {book.title}
          </Link>
        ))}
      </div>
    </article>
  )
}
