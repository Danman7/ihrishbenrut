import { Prisma } from '@/app/generated/prisma'

export type FilteredBook = Prisma.BookGetPayload<{
  select: {
    id: true
    title: true
    author: true
    series: true
    shortNotes: true
    numberInSeries: true
  }
}>

export type BookListItem = {
  id: string
  title: string
  author: string
  series: string[]
  shortNotes: string | null
  numberInSeries: number | null
}

export interface BooksPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
