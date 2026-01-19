import { formatParagraphs } from '@/app/utils'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function ChapterContent({
  chapterId,
}: {
  chapterId: string
}) {
  const content = await prisma.chapterContent.findFirst({
    where: { chapterId },
    select: { text: true },
  })

  if (!content) {
    notFound()
  }

  return (
    <section className="flex flex-col space-y-4">
      {formatParagraphs(content.text).map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  )
}
