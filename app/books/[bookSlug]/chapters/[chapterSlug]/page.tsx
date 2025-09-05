import AnimatedWrapper from '@/app/ui/AnimatedWrapper'
import { BreadcrumbsSkeleton } from '@/app/ui/BreadcrumbsSkeleton'
import ChapterBreadcrumbs from '@/app/ui/ChapterBreadcrumbs'
import ChapterContent from '@/app/ui/ChapterContent'
import ChapterNavigation from '@/app/ui/ChapterNavigation'
import { ChapterRangeSkeleton } from '@/app/ui/ChapterRangeSkeleton'
import ChaptersSideList from '@/app/ui/ChaptersSideList'
import { MultiLineSkeleton } from '@/app/ui/MultiLineSkeleton'
import PageProgressBar from '@/app/ui/PageProgressBar'
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
    select: {
      title: true,
      date: true,
      quote: true,
      location: true,
      number: true,
    },
  })

  if (!chapter) {
    notFound()
  }

  const { title, date, quote, location, number } = chapter

  return (
    <AnimatedWrapper>
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <PageProgressBar />
      </div>

      <div className="flex gap-4">
        <aside className="hidden md:block w-full max-w-64 pt-4">
          <div className="fixed scroll-auto">
            <Suspense fallback={<MultiLineSkeleton />}>
              <ChaptersSideList bookId={bookSlug} />
            </Suspense>
          </div>
        </aside>

        <article className="max-w-3xl w-full mx-auto scroll-auto">
          <Suspense fallback={<BreadcrumbsSkeleton />}>
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

          <p className="text-sm italic">
            {formatDateAndLocation(date, location)}
          </p>

          {quote && <div className="font-bold my-4">{quote}</div>}

          <Suspense fallback={<MultiLineSkeleton />}>
            <ChapterContent chapterId={chapterSlug} />
          </Suspense>

          <Suspense fallback={<ChapterRangeSkeleton />}>
            <ChapterNavigation bookId={bookSlug} chapterNumber={number} />
          </Suspense>
        </article>

        <div className="hidden xl:block w-full max-w-64"></div>
      </div>
    </AnimatedWrapper>
  )
}
