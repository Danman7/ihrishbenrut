import { BooksPageProps } from '@/app/types/book'
import { BookFilters } from '@/app/ui/BookFilters'
import BooksList from '@/app/ui/BooksList'
import {
  getFilteredBooks,
  getContextualBookFilterOptions,
  parseFilterParams,
} from '@/app/utils'
import { Metadata } from 'next'
import { GiBookCover } from 'react-icons/gi'

export const metadata: Metadata = {
  title: 'Само Твоята Воля | Книги',
}

export default async function Books({ searchParams }: BooksPageProps) {
  const { selectedSeries, selectedAuthors, selectedYear } =
    await parseFilterParams(searchParams)

  // Fetch books and filter options in parallel
  const [books, filterOptions] = await Promise.all([
    getFilteredBooks(selectedSeries, selectedAuthors, selectedYear),
    getContextualBookFilterOptions(
      selectedSeries,
      selectedAuthors,
      selectedYear
    ),
  ])

  return (
    <>
      <article className="max-w-4xl mx-auto">
        <h1 className="flex gap-4 justify-center items-center text-5xl font-bold my-16">
          <GiBookCover /> Книги
        </h1>

        <BookFilters
          series={filterOptions.allSeries}
          authors={filterOptions.allAuthors}
          years={filterOptions.allYears}
          availableSeries={filterOptions.availableSeries}
          availableAuthors={filterOptions.availableAuthors}
          availableYears={filterOptions.availableYears}
        />

        <hr className="my-8 text-border" />

        <BooksList filteredBooks={books} />
      </article>
    </>
  )
}
