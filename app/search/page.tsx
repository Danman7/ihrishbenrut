import { SearchPageProps } from '@/app/types/search'
import SearchResults from '@/app/ui/SearchResults'
import { parseSearchParams, performSearch } from '@/app/utils'
import { Metadata } from 'next'
import { IoSearchOutline } from 'react-icons/io5'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchPageProps['searchParams']
}): Promise<Metadata> {
  const { query } = await parseSearchParams(searchParams)

  return {
    title: query
      ? `Търсене: ${query} | Само Твоята Воля`
      : 'Търсене | Само Твоята Воля',
  }
}

export default async function Search({ searchParams }: SearchPageProps) {
  const { query, selectedTypes } = await parseSearchParams(searchParams)

  const results = query ? await performSearch(query, selectedTypes) : []

  return (
    <>
      <article className="max-w-4xl mx-auto">
        <h1 className="flex gap-2 justify-center items-center text-5xl font-bold font-serif mt-8 mb-10">
          <IoSearchOutline />
          Търсене
        </h1>

        {query ? (
          <SearchResults results={results} query={query} />
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              Въведете заявка за търсене в полето отгore
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Можете да търсите в книги, глави, молитви и мъдрости
            </p>
          </div>
        )}
      </article>
    </>
  )
}
