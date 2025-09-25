import AnimatedWrapper from '@/app/ui/AnimatedWrapper'
import { BreadcrumbsSkeleton } from '@/app/ui/BreadcrumbsSkeleton'
import ChapterBreadcrumbs from '@/app/ui/ChapterBreadcrumbs'
import ChapterContent from '@/app/ui/ChapterContent'
import ChapterNavigation from '@/app/ui/ChapterNavigation'
import { SingleLineSkeleton } from '@/app/ui/SingleLineSkeleton'
import { MultiLineSkeleton } from '@/app/ui/MultiLineSkeleton'
import PageProgressBar from '@/app/ui/PageProgressBar'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { GiBookmarklet } from 'react-icons/gi'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bookSlug: string; chapterSlug: string }>
}): Promise<Metadata> {
  const { bookSlug, chapterSlug } = await params

  const book = await prisma.book.findUnique({
    where: { id: bookSlug },
    select: {
      title: true,
      author: true,
    },
  })

  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterSlug },
    select: {
      title: true,
      number: true,
    },
  })

  if (!book || !chapter)
    return {
      title: 'Само Твоята Воля',
    }

  return {
    title: `${book.author} | ${book.title} |  ${chapter.number}. ${chapter.title}`,
  }
}

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
      notes: true,
      quote: true,
      number: true,
    },
  })

  if (!chapter) {
    notFound()
  }

  const { title, quote, notes, number } = chapter

  return (
    <AnimatedWrapper>
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <PageProgressBar />
      </div>

      <article className="max-w-3xl w-full mx-auto scroll-auto">
        <Suspense fallback={<BreadcrumbsSkeleton />}>
          <ChapterBreadcrumbs
            bookId={bookSlug}
            chapterSlug={chapterSlug}
            chapterTitle={title}
            chapterNumber={number}
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

        <p className="text-sm italic">{notes}</p>

        {quote && <div className="font-bold my-4">{quote}</div>}

        <Suspense fallback={<MultiLineSkeleton />}>
          <ChapterContent chapterId={chapterSlug} />
        </Suspense>

        <Suspense fallback={<SingleLineSkeleton />}>
          <ChapterNavigation bookId={bookSlug} chapterNumber={number} />
        </Suspense>
      </article>

      <div className="hidden xl:block w-full max-w-64"></div>
    </AnimatedWrapper>
  )
}
