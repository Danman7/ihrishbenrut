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
  const yearsParam = searchParams.years

  const selectedSeries =
    typeof seriesParam === 'string' ? seriesParam.split(',') : undefined
  const selectedAuthors =
    typeof authorsParam === 'string' ? authorsParam.split(',') : undefined
  const selectedYear =
    typeof yearsParam === 'string' ? Number(yearsParam) : undefined

  return { selectedSeries, selectedAuthors, selectedYear }
}

export function buildBooksWhereClause(
  selectedSeries?: string[],
  selectedAuthors?: string[],
  selectedYear?: number
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

  if (selectedYear) {
    conditions.push({
      yearPublished: selectedYear,
    })
  }

  return conditions.length > 0 ? { AND: conditions } : {}
}

export async function getFilteredBooks(
  selectedSeries?: string[],
  selectedAuthors?: string[],
  selectedYear?: number
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
    where: buildBooksWhereClause(selectedSeries, selectedAuthors, selectedYear),
  })
}

export const getFilterOptions = async () => {
  const allBooks = await prisma.book.findMany({
    select: { series: true, author: true, yearPublished: true },
  })

  const allSeries = allBooks.flatMap((book) => book.series)
  const uniqueSeries = [...new Set(allSeries)].sort()

  const allAuthors = allBooks.map((book) => book.author)
  const uniqueAuthors = [...new Set(allAuthors)].sort()

  const allYears = allBooks.map((book) => book.yearPublished)
  const uniqueYears = [...new Set(allYears)].sort((a, b) => a - b) // Sort ascending (oldest first)

  return { uniqueSeries, uniqueAuthors, uniqueYears }
}

export function parsePrayerFilterParams(searchParams: {
  [key: string]: string | string[] | undefined
}) {
  const seriesParam = searchParams.series
  const sourcesParam = searchParams.sources

  const selectedSeries =
    typeof seriesParam === 'string' ? seriesParam.split(',') : undefined
  const selectedSources =
    typeof sourcesParam === 'string' ? sourcesParam.split(',') : undefined

  return { selectedSeries, selectedSources }
}

export function buildPrayersWhereClause(
  selectedSeries?: string[],
  selectedSources?: string[]
) {
  const conditions = []

  if (selectedSeries && selectedSeries.length > 0) {
    conditions.push({
      series: {
        hasSome: selectedSeries,
      },
    })
  }

  if (selectedSources && selectedSources.length > 0) {
    conditions.push({
      source: {
        in: selectedSources,
      },
    })
  }

  return conditions.length > 0 ? { AND: conditions } : {}
}

export async function getFilteredPrayers(
  selectedSeries?: string[],
  selectedSources?: string[]
) {
  return await prisma.prayer.findMany({
    orderBy: { rank: 'asc' },
    where: buildPrayersWhereClause(selectedSeries, selectedSources),
  })
}

export const getPrayerFilterOptions = async () => {
  const allPrayers = await prisma.prayer.findMany({
    select: { series: true, source: true },
  })

  const allSeries = allPrayers.flatMap((prayer) => prayer.series)
  const uniqueSeries = [...new Set(allSeries)].sort()

  const allSources = allPrayers.map((prayer) => prayer.source)
  const uniqueSources = [...new Set(allSources)].sort()

  return { uniqueSeries, uniqueSources }
}

export function parseWisdomFilterParams(searchParams: {
  [key: string]: string | string[] | undefined
}) {
  const topicsParam = searchParams.topics
  const authorsParam = searchParams.authors
  const cursorParam = searchParams.cursor
  const directionParam = searchParams.direction

  const selectedTopics =
    typeof topicsParam === 'string' ? topicsParam.split(',') : undefined
  const selectedAuthors =
    typeof authorsParam === 'string' ? authorsParam.split(',') : undefined
  const cursor = typeof cursorParam === 'string' ? cursorParam : undefined
  const direction =
    typeof directionParam === 'string' &&
    (directionParam === 'next' || directionParam === 'prev')
      ? (directionParam as 'next' | 'prev')
      : 'next'

  return { selectedTopics, selectedAuthors, cursor, direction }
}

export function buildWisdomWhereClause(
  selectedTopics?: string[],
  selectedAuthors?: string[]
) {
  const conditions = []

  if (selectedTopics && selectedTopics.length > 0) {
    conditions.push({
      topics: {
        hasSome: selectedTopics,
      },
    })
  }

  if (selectedAuthors && selectedAuthors.length > 0) {
    conditions.push({
      source: {
        in: selectedAuthors,
      },
    })
  }

  return conditions.length > 0 ? { AND: conditions } : {}
}

export async function getFilteredWisdom(
  selectedTopics?: string[],
  selectedAuthors?: string[],
  cursor?: string,
  direction: 'next' | 'prev' = 'next'
) {
  const pageSize = 50

  if (direction === 'next') {
    const wisdom = await prisma.wisdom.findMany({
      take: pageSize + 1, // Take one extra to know if there are more
      skip: cursor ? 1 : 0, // Skip the cursor item
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'desc' },
      where: buildWisdomWhereClause(selectedTopics, selectedAuthors),
    })

    const hasNext = wisdom.length > pageSize
    const items = hasNext ? wisdom.slice(0, -1) : wisdom

    return {
      items,
      hasNext,
      hasPrev: !!cursor,
      nextCursor: hasNext ? items[items.length - 1]?.id : null,
      prevCursor: items[0]?.id || null,
    }
  } else {
    // For previous page, we need to reverse the order, take from cursor backwards
    const wisdom = await prisma.wisdom.findMany({
      take: -(pageSize + 1), // Negative take for backwards pagination
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'desc' },
      where: buildWisdomWhereClause(selectedTopics, selectedAuthors),
    })

    const hasPrev = wisdom.length > pageSize
    const items = hasPrev ? wisdom.slice(1) : wisdom

    return {
      items,
      hasNext: !!cursor,
      hasPrev,
      nextCursor: items[items.length - 1]?.id || null,
      prevCursor: hasPrev ? items[0]?.id : null,
    }
  }
}

export const getWisdomFilterOptions = async () => {
  const allWisdom = await prisma.wisdom.findMany({
    select: { topics: true, source: true },
  })

  const allTopics = allWisdom.flatMap((wisdom) => wisdom.topics)
  const uniqueTopics = [...new Set(allTopics)].sort()

  const allAuthors = allWisdom.map((wisdom) => wisdom.source)
  const uniqueAuthors = [...new Set(allAuthors)].sort()

  return { uniqueTopics, uniqueAuthors }
}
