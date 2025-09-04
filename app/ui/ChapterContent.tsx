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
  })

  if (!content) {
    notFound()
  }

  return (
    <section className="flex flex-col items-center">
      {formatParagraphs(content.content).map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  )
}
