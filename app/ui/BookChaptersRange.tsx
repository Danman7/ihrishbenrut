import { getYearRange } from '@/app/utils'
import prisma from '@/lib/prisma'

export default async function BookChaptersRange({
  bookId,
}: {
  bookId: string
}) {
  const chapters = await prisma.chapter.findMany({
    where: {
      bookId,
    },
    select: { date: true },
  })

  const yearRange = getYearRange(chapters)

  return (
    <div className="text-sm">
      {chapters.length} глави - {yearRange}
    </div>
  )
}
