import { Header } from '@/app/ui/Header'
import { SideNavigation } from '@/app/ui/SideNavigation'
import type { RouteItem } from '@/lib/routes'

interface SectionLayoutProps {
  children: React.ReactNode
  items?: RouteItem[]
  title: string
  rootUrl: string
  showDesktopSidebar?: boolean
}

export function SectionLayout({
  children,
  items,
  title,
  rootUrl,
  showDesktopSidebar = false,
}: SectionLayoutProps) {
  const hasDesktopSidebar = showDesktopSidebar && !!items?.length

  return (
    <div className="flex flex-col min-h-full">
      <Header sectionNav={items ? { items, title, rootUrl } : undefined} />

      <div className="flex relative grow">
        {hasDesktopSidebar ? (
          <aside className="hidden lg:block z-30 w-72 shrink-0 self-start sticky top-12 h-[calc(100dvh-3rem)] overflow-hidden">
            <SideNavigation
              sectionNav={items ? { items, title, rootUrl } : undefined}
            />
          </aside>
        ) : null}

        <main className="grow px-4 pt-8">
          <article className="mx-auto max-w-3xl">{children}</article>
        </main>
      </div>
    </div>
  )
}
