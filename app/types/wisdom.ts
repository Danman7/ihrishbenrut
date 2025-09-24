import { Prisma } from '@/app/generated/prisma'

export type Wisdom = Prisma.WisdomGetPayload<Record<string, never>>

export interface WisdomPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
