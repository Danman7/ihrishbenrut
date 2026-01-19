import { getRouteTreeForPath } from '@/app/actions/getRouteTree'
import { BOOKS_BASE_URL, BOOKS_TITLE } from '@/app/constants'
import { SectionLayout } from '@/app/ui/SectionLayout'

export default async function BooksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const items = await getRouteTreeForPath(BOOKS_BASE_URL)

  return (
    <SectionLayout items={items} title={BOOKS_TITLE} rootUrl={BOOKS_BASE_URL}>
      {children}
    </SectionLayout>
  )
}
