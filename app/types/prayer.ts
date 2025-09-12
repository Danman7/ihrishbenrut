import { Prisma } from '@/app/generated/prisma'

export type Prayer = Prisma.PrayerGetPayload<Record<string, never>>

export interface PrayersPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}
