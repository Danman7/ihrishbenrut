import { BooksPageProps } from '@/app/types/book'
import { PrayersPageProps } from '@/app/types/prayer'
import { WisdomPageProps } from '@/app/types/wisdom'
import { SearchResult, SearchPageProps } from '@/app/types/search'
import prisma from '@/lib/prisma'

export const formatParagraphs = (content: string) =>
  content
    .split(/\r?\n\s*\r?\n/) // any blank line
    .map((p) => p.trim())
    .filter(Boolean)

export async function parseFilterParams(
  searchParams: BooksPageProps['searchParams']
) {
  const params = await searchParams
  const seriesParam = params.series
  const authorsParam = params.authors
  const yearsParam = params.years

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

export async function parsePrayerFilterParams(
  searchParams: PrayersPageProps['searchParams']
) {
  const params = await searchParams
  const seriesParam = params.series
  const sourcesParam = params.sources

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

export async function parseWisdomFilterParams(
  searchParams: WisdomPageProps['searchParams']
) {
  const params = await searchParams
  const topicsParam = params.topics
  const authorsParam = params.authors
  const cursorParam = params.cursor
  const directionParam = params.direction

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

export const getContextualWisdomFilterOptions = async (
  selectedTopics?: string[],
  selectedAuthors?: string[]
) => {
  // Get all available options (for initial state)
  const allOptions = await getWisdomFilterOptions()

  // If no filters are applied, return all options
  if (
    (!selectedTopics || selectedTopics.length === 0) &&
    (!selectedAuthors || selectedAuthors.length === 0)
  ) {
    return {
      availableTopics: allOptions.uniqueTopics,
      availableAuthors: allOptions.uniqueAuthors,
      allTopics: allOptions.uniqueTopics,
      allAuthors: allOptions.uniqueAuthors,
    }
  }

  // Get wisdom entries based on current filters to determine available options
  const whereClause = buildWisdomWhereClause(selectedTopics, selectedAuthors)

  const filteredWisdom = await prisma.wisdom.findMany({
    select: { topics: true, source: true },
    where: whereClause,
  })

  // Extract available topics and authors from filtered results
  const availableTopics = [
    ...new Set(filteredWisdom.flatMap((wisdom) => wisdom.topics)),
  ].sort()
  const availableAuthors = [
    ...new Set(filteredWisdom.map((wisdom) => wisdom.source)),
  ].sort()

  return {
    availableTopics,
    availableAuthors,
    allTopics: allOptions.uniqueTopics,
    allAuthors: allOptions.uniqueAuthors,
  }
}

export const getContextualPrayerFilterOptions = async (
  selectedSeries?: string[],
  selectedSources?: string[]
) => {
  // Get all available options (for initial state)
  const allOptions = await getPrayerFilterOptions()

  // If no filters are applied, return all options
  if (
    (!selectedSeries || selectedSeries.length === 0) &&
    (!selectedSources || selectedSources.length === 0)
  ) {
    return {
      availableSeries: allOptions.uniqueSeries,
      availableSources: allOptions.uniqueSources,
      allSeries: allOptions.uniqueSeries,
      allSources: allOptions.uniqueSources,
    }
  }

  // Get prayer entries based on current filters to determine available options
  const whereClause = buildPrayersWhereClause(selectedSeries, selectedSources)

  const filteredPrayers = await prisma.prayer.findMany({
    select: { series: true, source: true },
    where: whereClause,
  })

  // Extract available series and sources from filtered results
  const availableSeries = [
    ...new Set(filteredPrayers.flatMap((prayer) => prayer.series)),
  ].sort()
  const availableSources = [
    ...new Set(filteredPrayers.map((prayer) => prayer.source)),
  ].sort()

  return {
    availableSeries,
    availableSources,
    allSeries: allOptions.uniqueSeries,
    allSources: allOptions.uniqueSources,
  }
}

export const getContextualBookFilterOptions = async (
  selectedSeries?: string[],
  selectedAuthors?: string[],
  selectedYear?: number
) => {
  // Get all available options (for initial state)
  const allOptions = await getFilterOptions()

  // If no filters are applied, return all options
  if (
    (!selectedSeries || selectedSeries.length === 0) &&
    (!selectedAuthors || selectedAuthors.length === 0) &&
    !selectedYear
  ) {
    return {
      availableSeries: allOptions.uniqueSeries,
      availableAuthors: allOptions.uniqueAuthors,
      availableYears: allOptions.uniqueYears,
      allSeries: allOptions.uniqueSeries,
      allAuthors: allOptions.uniqueAuthors,
      allYears: allOptions.uniqueYears,
    }
  }

  // Get book entries based on current filters to determine available options
  const whereClause = buildBooksWhereClause(
    selectedSeries,
    selectedAuthors,
    selectedYear
  )

  const filteredBooks = await prisma.book.findMany({
    select: { series: true, author: true, yearPublished: true },
    where: whereClause,
  })

  // Extract available options from filtered results
  const availableSeries = [
    ...new Set(filteredBooks.flatMap((book) => book.series)),
  ].sort()
  const availableAuthors = [
    ...new Set(filteredBooks.map((book) => book.author)),
  ].sort()
  const availableYears = [
    ...new Set(filteredBooks.map((book) => book.yearPublished)),
  ].sort((a, b) => a - b)

  return {
    availableSeries,
    availableAuthors,
    availableYears,
    allSeries: allOptions.uniqueSeries,
    allAuthors: allOptions.uniqueAuthors,
    allYears: allOptions.uniqueYears,
  }
}

// Search functionality
export async function parseSearchParams(
  searchParams: SearchPageProps['searchParams']
) {
  const params = await searchParams
  const query = typeof params.q === 'string' ? params.q : ''
  const typeParam = params.type

  const selectedTypes =
    typeof typeParam === 'string'
      ? (typeParam.split(',') as ('book' | 'chapter' | 'prayer' | 'wisdom')[])
      : undefined

  return { query, selectedTypes }
}

export async function performSearch(
  query: string,
  types?: ('book' | 'chapter' | 'prayer' | 'wisdom')[]
): Promise<SearchResult[]> {
  if (!query.trim()) {
    return []
  }

  const searchQuery = query.trim()
  const results: SearchResult[] = []

  // Search in books
  if (!types || types.includes('book')) {
    const books = await prisma.book.findMany({
      where: {
        OR: [
          { title: { contains: searchQuery, mode: 'insensitive' } },
          { author: { contains: searchQuery, mode: 'insensitive' } },
          { notes: { contains: searchQuery, mode: 'insensitive' } },
          { shortNotes: { contains: searchQuery, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        title: true,
        author: true,
        notes: true,
        shortNotes: true,
        series: true,
      },
    })

    books.forEach((book) => {
      results.push({
        id: book.id,
        title: book.title,
        type: 'book',
        content: book.shortNotes || book.notes || '',
        href: `/books/${book.id}`,
        metadata: {
          author: book.author,
          series: book.series,
        },
      })
    })
  }

  // Search in chapters
  if (!types || types.includes('chapter')) {
    const chapters = await prisma.chapter.findMany({
      where: {
        OR: [
          { title: { contains: searchQuery, mode: 'insensitive' } },
          { notes: { contains: searchQuery, mode: 'insensitive' } },
          { quote: { contains: searchQuery, mode: 'insensitive' } },
        ],
      },
      include: {
        book: {
          select: {
            id: true,
            title: true,
            author: true,
          },
        },
      },
    })

    chapters.forEach((chapter) => {
      results.push({
        id: chapter.id,
        title: chapter.title,
        type: 'chapter',
        content: chapter.quote || chapter.notes || '',
        href: `/books/${chapter.book.id}/chapters/${chapter.id}`,
        metadata: {
          author: chapter.book.author,
          bookTitle: chapter.book.title,
          chapterNumber: chapter.number,
        },
      })
    })
  }

  // Search in prayers
  if (!types || types.includes('prayer')) {
    const prayers = await prisma.prayer.findMany({
      where: {
        OR: [
          { title: { contains: searchQuery, mode: 'insensitive' } },
          { content: { contains: searchQuery, mode: 'insensitive' } },
          { notes: { contains: searchQuery, mode: 'insensitive' } },
          { source: { contains: searchQuery, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        title: true,
        content: true,
        notes: true,
        source: true,
        series: true,
      },
    })

    prayers.forEach((prayer) => {
      // Truncate content for display
      const contentPreview =
        prayer.content.length > 200
          ? prayer.content.substring(0, 200) + '...'
          : prayer.content

      results.push({
        id: prayer.id,
        title: prayer.title,
        type: 'prayer',
        content: contentPreview,
        href: `/prayers/${prayer.id}`,
        metadata: {
          source: prayer.source,
          series: prayer.series,
        },
      })
    })
  }

  // Search in wisdom
  if (!types || types.includes('wisdom')) {
    const wisdom = await prisma.wisdom.findMany({
      where: {
        OR: [
          { text: { contains: searchQuery, mode: 'insensitive' } },
          { source: { contains: searchQuery, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        text: true,
        source: true,
        topics: true,
      },
    })

    wisdom.forEach((item) => {
      // Truncate text for display
      const textPreview =
        item.text.length > 200 ? item.text.substring(0, 200) + '...' : item.text

      results.push({
        id: item.id,
        title: textPreview.split(' ').slice(0, 8).join(' ') + '...', // Use first few words as title
        type: 'wisdom',
        content: textPreview,
        href: `/wisdom?cursor=${item.id}`, // Navigate to wisdom page with this item
        metadata: {
          source: item.source,
          topics: item.topics,
        },
      })
    })
  }

  return results
}
