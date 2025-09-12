import { Prisma } from '@/app/generated/prisma'

export type Wisdom = Prisma.WisdomGetPayload<{}>

export interface WisdomPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}
