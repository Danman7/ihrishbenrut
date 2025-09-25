import { SearchResult } from '@/app/types/search'
import Link from 'next/link'
import { GiBookCover, GiScrollUnfurled } from 'react-icons/gi'
import { PiHandsPraying } from 'react-icons/pi'
import { MdArticle } from 'react-icons/md'

interface SearchResultsProps {
  results: SearchResult[]
  query: string
}

const getTypeIcon = (type: SearchResult['type']) => {
  switch (type) {
    case 'book':
      return <GiBookCover className="text-lg" />
    case 'chapter':
      return <MdArticle className="text-lg" />
    case 'prayer':
      return <PiHandsPraying className="text-lg" />
    case 'wisdom':
      return <GiScrollUnfurled className="text-lg" />
  }
}

const getTypeLabel = (type: SearchResult['type']) => {
  switch (type) {
    case 'book':
      return 'Книги'
    case 'chapter':
      return 'Глави'
    case 'prayer':
      return 'Молитви'
    case 'wisdom':
      return 'Мъдрости'
  }
}

const highlightText = (text: string, query: string) => {
  if (!query.trim()) return text

  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
    'gi'
  )
  const parts = text.split(regex)

  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className="bg-yellow-200 px-1 rounded">
        {part}
      </mark>
    ) : (
      part
    )
  )
}

export default function SearchResults({ results, query }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">
          Няма намерени резултати за &ldquo;{query}&rdquo;
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Опитайте с различни ключови думи или проверете правописа
        </p>
      </div>
    )
  }

  // Group results by type
  const groupedResults = results.reduce(
    (acc, result) => {
      if (!acc[result.type]) {
        acc[result.type] = []
      }
      acc[result.type].push(result)
      return acc
    },
    {} as Record<SearchResult['type'], SearchResult[]>
  )

  return (
    <div className="space-y-8">
      <div className="text-sm text-gray-600">
        Намерени са {results.length} резултат{results.length === 1 ? '' : 'а'}{' '}
        за &ldquo;{query}&rdquo;
      </div>

      {Object.entries(groupedResults).map(([type, typeResults]) => (
        <section key={type}>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            {getTypeIcon(type as SearchResult['type'])}
            {getTypeLabel(type as SearchResult['type'])} ({typeResults.length})
          </h2>

          <div className="space-y-4">
            {typeResults.map((result) => (
              <Link
                key={result.id}
                href={result.href}
                className="block border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="text-gray-500 mt-1">
                    {getTypeIcon(result.type)}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">
                      {highlightText(result.title, query)}
                    </h3>

                    {result.content && (
                      <p className="text-gray-700 mb-2">
                        {highlightText(result.content, query)}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                      {result.metadata?.author && (
                        <span>Автор: {result.metadata.author}</span>
                      )}
                      {result.metadata?.source && (
                        <span>Източник: {result.metadata.source}</span>
                      )}
                      {result.metadata?.bookTitle && (
                        <span>Книга: {result.metadata.bookTitle}</span>
                      )}
                      {result.metadata?.chapterNumber && (
                        <span>Глава {result.metadata.chapterNumber}</span>
                      )}
                      {result.metadata?.series &&
                        result.metadata.series.length > 0 && (
                          <span>
                            Серия: {result.metadata.series.join(', ')}
                          </span>
                        )}
                      {result.metadata?.topics &&
                        result.metadata.topics.length > 0 && (
                          <span>Теми: {result.metadata.topics.join(', ')}</span>
                        )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
