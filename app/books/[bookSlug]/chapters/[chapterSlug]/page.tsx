import ChapterBreadcrumbs from '@/app/ui/ChapterBreadcrumbs'
import ChapterContent from '@/app/ui/ChapterContent'
import { ChapterRangeSkeleton } from '@/app/ui/ChapterRangeSkeleton'
import { MultiLineSkeleton } from '@/app/ui/MultiLineSkeleton copy'
import { formatDateAndLocation } from '@/app/utils'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { GiBookmarklet } from 'react-icons/gi'

export async function generateStaticParams() {
  const chapters = await prisma.chapter.findMany()

  return chapters.map((chapter) => ({
    chapterSlug: chapter.id,
  }))
}

export default async function Chapter({
  params,
}: {
  params: Promise<{ bookSlug: string; chapterSlug: string }>
}) {
  const { bookSlug, chapterSlug } = await params

  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterSlug },
  })

  if (!chapter) {
    notFound()
  }

  const { title, date, quote, location, number } = chapter

  return (
    <article>
      <Suspense fallback={<ChapterRangeSkeleton />}>
        <ChapterBreadcrumbs
          bookId={bookSlug}
          chapterSlug={chapterSlug}
          chapterTitle={title}
        />
      </Suspense>

      {number ? (
        <div className="flex justify-center items-center text-2xl font-serif gap-2 mb-2">
          <GiBookmarklet />
          {number}
        </div>
      ) : null}

      <h1 className="text-center text-3xl font-bold font-serif mb-10">
        {title}
      </h1>

      <p className="text-sm italic">{formatDateAndLocation(date, location)}</p>

      {quote && <div className="font-bold my-4">{quote}</div>}

      <Suspense fallback={<MultiLineSkeleton />}>
        <ChapterContent chapterId={chapterSlug} />
      </Suspense>
    </article>
  )
}
