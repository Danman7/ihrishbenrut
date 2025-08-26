import Breadcrumbs from '@/app/ui/Breadcrumbs'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GiBookmarklet } from 'react-icons/gi'

export default async function Book({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const book = await prisma.book.findUnique({
    where: { id: slug },
  })

  if (!book) {
    notFound()
  }

  const chapters = await prisma.chapter.findMany({
    where: {
      bookId: slug,
    },
  })

  const { title, originalNotes, rewriteNotes } = book

  const breadcrumbs = [
    { href: '/books', title: 'Книги' },
    { href: `/books/${slug}`, title },
  ]

  return (
    <article>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <h1 className="text-center">{title}</h1>

      <p className="text-sm text-light">
        <strong>Оригинал:</strong> {originalNotes}
      </p>
      <p className="text-sm text-light">
        <strong>Препис:</strong> {rewriteNotes}
      </p>
      <section className="flex flex-col items-center">
        <h2 className="flex items-center gap-4">
          <GiBookmarklet /> Глави
        </h2>
        {chapters.map((chapter) => (
          <div key={chapter.id}>
            <Link
              href={`/books/${slug}/chapters/${chapter.id}`}
              className="text-lg font-bold"
            >
              {chapter.title}
            </Link>
          </div>
        ))}
      </section>
    </article>
  )
}
