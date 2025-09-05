import { Anchor } from '@/app/ui/Anchor'
import prisma from '@/lib/prisma'
import { FaBookmark } from 'react-icons/fa'
import { GiBookCover } from 'react-icons/gi'

export default async function ChaptersSideList({ bookId }: { bookId: string }) {
  const book = await prisma.book.findUnique({
    where: { id: bookId },
    select: { title: true },
  })

  const chapters = await prisma.chapter.findMany({
    where: { bookId },
    orderBy: { number: 'asc' },
    select: { id: true, title: true, number: true },
  })

  return (
    <>
      <h2 className="flex gap-2 text-2xl mb-6 font-bold font-serif">
        <GiBookCover /> {book?.title}
      </h2>

      <h3 className="flex items-center gap-2 text-lg font-bold mb-4 font-serif">
        <FaBookmark /> Глави
      </h3>

      <div className="flex flex-col gap-2">
        {chapters.map((chapter) => (
          <Anchor
            key={chapter.id}
            href={`/books/${bookId}/chapters/${chapter.id}`}
          >
            <h4>
              {chapter.number && `${chapter.number}.`} {chapter.title}
            </h4>
          </Anchor>
        ))}
      </div>
    </>
  )
}
