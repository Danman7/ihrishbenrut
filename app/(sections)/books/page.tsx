import { BooksPageProps } from '@/app/types/book'
import { FilterConfig, Filters } from '@/app/ui/Filters'
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

  const filterConfigs: FilterConfig[] = [
    {
      type: 'multi',
      paramName: 'series',
      title: 'Само от следните поредици',
      idPrefix: 'series',
      options: filterOptions.allSeries,
      availableOptions: filterOptions.availableSeries,
    },
    {
      type: 'multi',
      paramName: 'authors',
      title: 'Само от следните автори',
      idPrefix: 'author',
      options: filterOptions.allAuthors,
      availableOptions: filterOptions.availableAuthors,
    },
    {
      type: 'single',
      paramName: 'years',
      title: 'Година на публикуване',
      options: filterOptions.allYears,
      availableOptions: filterOptions.availableYears,
      placeholder: 'Всички години',
    },
  ]

  return (
    <>
      <article className="max-w-4xl mx-auto">
        <h1 className="flex gap-4 justify-center items-center font-bold my-16">
          <GiBookCover /> Книги
        </h1>

        <Filters configs={filterConfigs} />

        <hr className="my-8 text-border" />

        <BooksList filteredBooks={books} />
      </article>
    </>
  )
}
