import prisma from '@/lib/prisma'
import Link from 'next/link'

export default async function BookChaptersList({ bookId }: { bookId: string }) {
  const chapters = await prisma.chapter.findMany({
    where: {
      bookId,
    },
    orderBy: { number: 'asc' },
    select: {
      id: true,
      title: true,
      number: true,
      notes: true,
    },
  })

  return (
    <>
      {chapters.map((chapter) => (
        <Link
          key={chapter.id}
          href={`/books/${bookId}/chapters/${chapter.id}`}
          className="text-lg mb-4"
        >
          <div className="underline underline-offset-2 hover:decoration-3 font-bold">
            {chapter.number && `${chapter.number}.`} {chapter.title}
          </div>
          {chapter.notes && <div className="text-sm">{chapter.notes}</div>}
        </Link>
      ))}
    </>
  )
}
