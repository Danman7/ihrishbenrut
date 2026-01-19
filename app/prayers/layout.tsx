import { getRouteTreeForPath } from '@/app/actions/getRouteTree'
import { PRAYERS_BASE_URL, PRAYERS_TITLE } from '@/app/constants'
import { SectionLayout } from '@/app/ui/SectionLayout'

export default async function PrayersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const items = await getRouteTreeForPath(PRAYERS_BASE_URL)

  return (
    <SectionLayout
      items={items}
      title={PRAYERS_TITLE}
      rootUrl={PRAYERS_BASE_URL}
    >
      {children}
    </SectionLayout>
  )
}
