'use server'

import prisma from '@/lib/prisma'
import { getRoutesFrom, type RouteItem } from '@/lib/routes'

const getBookRouteTree = async (): Promise<RouteItem[]> => {
  const books = await prisma.book.findMany({
    select: {
      id: true,
      title: true,
      chapters: {
        select: {
          id: true,
          title: true,
          number: true,
        },
        orderBy: { number: 'asc' },
      },
    },
    orderBy: { title: 'asc' },
  })

  return books.map((book) => ({
    title: book.title,
    href: `/books/${book.id}`,
    children: book.chapters.map((chapter) => ({
      title: chapter.number
        ? `${chapter.number}. ${chapter.title}`
        : chapter.title,
      href: `/books/${book.id}/chapters/${chapter.id}`,
    })),
  }))
}

export async function getRouteTreeForPath(
  pathname: string
): Promise<RouteItem[]> {
  const route =
    pathname === '/' ? '/' : '/' + pathname.replace(/^\/+|\/+$/g, '')
  if (route.startsWith('/books')) {
    return getBookRouteTree()
  }

  if (route.startsWith('/prayers') || route.startsWith('/wisdom')) {
    return []
  }

  return getRoutesFrom(route)
}
