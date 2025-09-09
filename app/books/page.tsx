import AnimatedWrapper from '@/app/ui/AnimatedWrapper'
import { BookFilters } from '@/app/ui/BookFilters'
import prisma from '@/lib/prisma'
import { GiBookCover } from 'react-icons/gi'
import BooksList from '@/app/ui/BooksList'

interface BooksPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Books({ searchParams }: BooksPageProps) {
  const seriesParam = searchParams.series
  const selectedSeries =
    typeof seriesParam === 'string' ? seriesParam.split(',') : undefined

  const books = await prisma.book.findMany({
    orderBy: { numberInSeries: 'asc' },
    select: {
      id: true,
      title: true,
      author: true,
      series: true,
      shortNotes: true,
      numberInSeries: true,
    },
    where:
      selectedSeries && selectedSeries.length > 0
        ? {
            series: {
              hasSome: selectedSeries,
            },
          }
        : undefined,
  })

  const allBooks = await prisma.book.findMany({
    select: { series: true },
  })
  const allSeries = allBooks.flatMap((book) => book.series)
  const uniqueSeries = [...new Set(allSeries)].sort()

  return (
    <AnimatedWrapper>
      <article className="max-w-4xl mx-auto">
        <h1 className="flex gap-2 justify-center items-center text-5xl font-bold font-serif mt-8 mb-10">
          <GiBookCover /> Книги
        </h1>

        <BookFilters series={uniqueSeries} />

        <BooksList filteredBooks={books} />
      </article>
    </AnimatedWrapper>
  )
}
