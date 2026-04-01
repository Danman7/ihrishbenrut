import { headers } from 'next/headers'
import { getRouteTreeForPath } from '@/app/actions/getRouteTree'
import {
  BOOKS_BASE_URL,
  BOOKS_TITLE,
  PRAYERS_BASE_URL,
  PRAYERS_TITLE,
  WISDOM_BASE_URL,
  WISDOM_TITLE,
} from '@/app/constants'
import { SectionLayout } from '@/app/ui/SectionLayout'

const SECTION_CONFIG: Record<
  string,
  { title: string; baseUrl: string; fetchTree: boolean }
> = {
  books: { title: BOOKS_TITLE, baseUrl: BOOKS_BASE_URL, fetchTree: true },
  prayers: {
    title: PRAYERS_TITLE,
    baseUrl: PRAYERS_BASE_URL,
    fetchTree: true,
  },
  wisdom: { title: WISDOM_TITLE, baseUrl: WISDOM_BASE_URL, fetchTree: true },
  search: { title: BOOKS_TITLE, baseUrl: BOOKS_BASE_URL, fetchTree: false },
}

export default async function SectionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') ?? '/'
  const segment = pathname.split('/').filter(Boolean)[0] ?? 'books'

  const config = SECTION_CONFIG[segment] ?? SECTION_CONFIG.books

  const items = config.fetchTree
    ? await getRouteTreeForPath(config.baseUrl)
    : undefined

  return (
    <SectionLayout items={items} title={config.title} rootUrl={config.baseUrl}>
      {children}
    </SectionLayout>
  )
}
