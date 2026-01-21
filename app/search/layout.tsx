import { BOOKS_BASE_URL, BOOKS_TITLE } from '@/app/constants'
import { SectionLayout } from '@/app/ui/SectionLayout'

export default async function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SectionLayout title={BOOKS_TITLE} rootUrl={BOOKS_BASE_URL}>
      {children}
    </SectionLayout>
  )
}
