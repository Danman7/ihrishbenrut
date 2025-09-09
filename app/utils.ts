import { BooksPageProps } from '@/app/types/book'
import prisma from '@/lib/prisma'

export const formatParagraphs = (content: string) =>
  content
    .split(/\r?\n\s*\r?\n/) // any blank line
    .map((p) => p.trim())
    .filter(Boolean)

export function parseFilterParams(
  searchParams: BooksPageProps['searchParams']
) {
  const seriesParam = searchParams.series
  const authorsParam = searchParams.authors

  const selectedSeries =
    typeof seriesParam === 'string' ? seriesParam.split(',') : undefined
  const selectedAuthors =
    typeof authorsParam === 'string' ? authorsParam.split(',') : undefined

  return { selectedSeries, selectedAuthors }
}

export function buildBooksWhereClause(
  selectedSeries?: string[],
  selectedAuthors?: string[]
) {
  const conditions = []

  if (selectedSeries && selectedSeries.length > 0) {
    conditions.push({
      series: {
        hasSome: selectedSeries,
      },
    })
  }

  if (selectedAuthors && selectedAuthors.length > 0) {
    conditions.push({
      author: {
        in: selectedAuthors,
      },
    })
  }

  return conditions.length > 0 ? { AND: conditions } : {}
}

export async function getFilteredBooks(
  selectedSeries?: string[],
  selectedAuthors?: string[]
) {
  return await prisma.book.findMany({
    orderBy: { numberInSeries: 'asc' },
    select: {
      id: true,
      title: true,
      author: true,
      series: true,
      shortNotes: true,
      numberInSeries: true,
    },
    where: buildBooksWhereClause(selectedSeries, selectedAuthors),
  })
}

export const getFilterOptions = async () => {
  const allBooks = await prisma.book.findMany({
    select: { series: true, author: true },
  })

  const allSeries = allBooks.flatMap((book) => book.series)
  const uniqueSeries = [...new Set(allSeries)].sort()

  const allAuthors = allBooks.map((book) => book.author)
  const uniqueAuthors = [...new Set(allAuthors)].sort()

  return { uniqueSeries, uniqueAuthors }
}
