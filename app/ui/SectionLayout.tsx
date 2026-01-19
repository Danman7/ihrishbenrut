import { Header } from '@/app/ui/Header'
import { SideNavigation } from '@/app/ui/SideNavigation'
import type { RouteItem } from '@/lib/routes'

interface SectionLayoutProps {
  children: React.ReactNode
  items: RouteItem[]
  title: string
  rootUrl: string
}

export function SectionLayout({
  children,
  items,
  title,
  rootUrl,
}: SectionLayoutProps) {
  return (
    <div className="flex flex-col min-h-full">
      <Header sectionNav={{ items, title, rootUrl }} />

      <div className="flex relative grow gap-6 items-stretch">
        <aside className="hidden md:flex">
          <SideNavigation sectionNav={{ items, title, rootUrl }} />
        </aside>

        <main className="mx-auto max-w-[70ch] px-4 pt-8 pb-32">
          <article>{children}</article>
        </main>
      </div>
    </div>
  )
}
