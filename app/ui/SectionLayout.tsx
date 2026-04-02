'use client'

import { Header } from '@/app/ui/Header'
import { SideNavigation } from '@/app/ui/SideNavigation'
import { usePathname } from 'next/navigation'
import type { RouteItem } from '@/lib/routes'

interface SectionLayoutProps {
  children: React.ReactNode
  items?: RouteItem[]
  title: string
  rootUrl: string
}

export function SectionLayout({
  children,
  items,
  title,
  rootUrl,
}: SectionLayoutProps) {
  const pathname = usePathname()
  const hasDesktopSidebar =
    !!items?.length && /^\/books\/[^/]+(?:\/chapters\/[^/]+)?$/.test(pathname)

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

        <main className="grow px-4 py-10">
          <article className="mx-auto max-w-3xl">{children}</article>
        </main>
      </div>
    </div>
  )
}
