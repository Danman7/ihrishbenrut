import { Prisma } from '@/app/generated/prisma'

export type Prayer = Prisma.PrayerGetPayload<Record<string, never>>

export interface PrayersPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
