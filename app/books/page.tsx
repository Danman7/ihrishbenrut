import { BooksPageProps } from '@/app/types/book'
import AnimatedWrapper from '@/app/ui/AnimatedWrapper'
import { BookFilters } from '@/app/ui/BookFilters'
import BooksList from '@/app/ui/BooksList'
import {
  getFilteredBooks,
  getContextualBookFilterOptions,
  parseFilterParams,
} from '@/app/utils'
import { GiBookCover } from 'react-icons/gi'

export default async function Books({ searchParams }: BooksPageProps) {
  const { selectedSeries, selectedAuthors, selectedYear } =
    parseFilterParams(searchParams)

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
    <AnimatedWrapper>
      <article className="max-w-4xl mx-auto">
        <h1 className="flex gap-2 justify-center items-center text-5xl font-bold font-serif mt-8 mb-10">
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

        <BooksList filteredBooks={books} />
      </article>
    </AnimatedWrapper>
  )
}
