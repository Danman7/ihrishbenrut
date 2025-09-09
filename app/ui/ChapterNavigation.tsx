import prisma from '@/lib/prisma'
import Link from 'next/link'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

export default async function ChapterNavigation({
  bookId,
  chapterNumber,
}: {
  bookId: string
  chapterNumber: number | null
}) {
  if (chapterNumber === null) {
    return null
  }

  // Get all chapters for this book, ordered by number
  const chapters = await prisma.chapter.findMany({
    where: {
      bookId,
    },
    select: { number: true, title: true, id: true },
    orderBy: { number: 'asc' },
  })

  // Find current chapter index
  const currentIndex = chapters.findIndex(
    (chapter) => chapter.number === chapterNumber
  )

  if (currentIndex === -1) {
    return null // Current chapter not found
  }

  // Get previous and next chapters
  const previousChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null
  const nextChapter =
    currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null

  return (
    <div className="w-full flex justify-between items-center py-4">
      <div>
        {previousChapter ? (
          <Link
            href={`/books/${bookId}/chapters/${previousChapter.id}`}
            className="flex items-center underline underline-offset-2 hover:decoration-3 text-left"
          >
            <IoIosArrowBack />

            <div>
              {previousChapter.number && `${previousChapter.number}.`}{' '}
              {previousChapter.title}
            </div>
          </Link>
        ) : (
          <div></div>
        )}
      </div>

      <div>
        {nextChapter ? (
          <Link
            href={`/books/${bookId}/chapters/${nextChapter.id}`}
            className="flex items-center underline underline-offset-2 hover:decoration-3 text-right"
          >
            <div>
              {nextChapter.number && `${nextChapter.number}.`}{' '}
              {nextChapter.title}
            </div>

            <IoIosArrowForward />
          </Link>
        ) : (
          <div></div> // Empty div to maintain spacing
        )}
      </div>
    </div>
  )
}
