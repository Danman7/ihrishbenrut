import { getRouteTreeForPath } from '@/app/actions/getRouteTree'
import { WISDOM_BASE_URL, WISDOM_TITLE } from '@/app/constants'
import { SectionLayout } from '@/app/ui/SectionLayout'

export default async function WisdomLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const items = await getRouteTreeForPath(WISDOM_BASE_URL)

  return (
    <SectionLayout items={items} title={WISDOM_TITLE} rootUrl={WISDOM_BASE_URL}>
      {children}
    </SectionLayout>
  )
}
