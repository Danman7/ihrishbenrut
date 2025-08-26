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
      <div className="flex flex-col sm:flex-row gap-4">
        {books.map((book) => (
          <Link
            href={`/books/${book.id}`}
            key={book.id}
            className="relative w-full sm:w-1/2 md:w-1/3 flex flex-col items-center justify-center border-2 border-border shadow-md rounded-2xl p-4 hover:shadow-lg hover:border-primary transition active:text-background active:bg-primary"
          >
            <div className="text-xl mb-4">{book.title}</div>
            <div className="text-sm">Оригинал: {book.originalReleaseYear}</div>
            <div className="text-sm">Преработка: {book.yearOfRewrite}</div>
          </Link>
        ))}
      </div>
    </article>
  )
}
