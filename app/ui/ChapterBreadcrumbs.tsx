import Breadcrumbs from '@/app/ui/Breadcrumbs'
import prisma from '@/lib/prisma'

export default async function ChapterBreadcrumbs({
  bookId,
  chapterTitle,
  chapterSlug,
  chapterNumber,
}: {
  bookId: string
  chapterTitle: string
  chapterSlug: string
  chapterNumber: number
}) {
  const book = await prisma.book.findUnique({
    where: { id: bookId },
    select: { title: true },
  })

  if (!book) {
    return null
  }

  const breadcrumbs = [
    { href: '/books', title: 'Книги' },
    { href: `/books/${bookId}`, title: book.title },
    {
      href: `/books/${bookId}/chapters/${chapterSlug}`,
      title: `${chapterNumber}. ${chapterTitle}`,
    },
  ]

  return <Breadcrumbs breadcrumbs={breadcrumbs} />
}
