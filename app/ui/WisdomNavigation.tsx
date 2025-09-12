import Link from 'next/link'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

export default function WisdomNavigation({
  hasNext,
  hasPrev,
  nextCursor,
  prevCursor,
  selectedTopics,
  selectedAuthors,
}: {
  hasNext: boolean
  hasPrev: boolean
  nextCursor: string | null
  prevCursor: string | null
  selectedTopics?: string[]
  selectedAuthors?: string[]
}) {
  // Build query parameters for preserving filters
  const buildQueryParams = (
    cursor: string | null,
    direction: 'next' | 'prev'
  ) => {
    const params = new URLSearchParams()

    if (selectedTopics && selectedTopics.length > 0) {
      params.set('topics', selectedTopics.join(','))
    }

    if (selectedAuthors && selectedAuthors.length > 0) {
      params.set('authors', selectedAuthors.join(','))
    }

    if (cursor) {
      params.set('cursor', cursor)
      params.set('direction', direction)
    }

    return params.toString() ? `?${params.toString()}` : ''
  }

  return (
    <div className="w-full flex justify-between items-center mt-4">
      <div>
        {hasPrev ? (
          <Link
            href={`/wisdom${buildQueryParams(prevCursor, 'prev')}`}
            className="flex items-center underline underline-offset-2 hover:decoration-3 text-left gap-2"
          >
            <IoIosArrowBack />
            <div>Предишни</div>
          </Link>
        ) : (
          <div></div>
        )}
      </div>

      <div>
        {hasNext ? (
          <Link
            href={`/wisdom${buildQueryParams(nextCursor, 'next')}`}
            className="flex items-center underline underline-offset-2 hover:decoration-3 text-right gap-2"
          >
            <div>Следващи</div>
            <IoIosArrowForward />
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}
