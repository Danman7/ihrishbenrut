import { Prisma } from '@/app/generated/prisma'

// Extract the exact type from the Prisma query
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

// Or alternatively, you can define it manually for better control:
export type BookListItem = {
  id: string
  title: string
  author: string
  series: string[]
  shortNotes: string | null
  numberInSeries: number | null
}
