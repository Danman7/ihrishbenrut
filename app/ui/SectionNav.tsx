'use client'

import { Anchor } from '@/app/ui/Anchor'
import type { RouteItem } from '@/lib/routes'
import { usePathname } from 'next/navigation'

type Props = {
  items: RouteItem[]
  title: string
  rootUrl: string
}

export function SectionNav({ items, title }: Props) {
  const pathname = usePathname()
  const match = pathname.match(/^\/books\/([^/]+)/)
  const bookHref = match ? `/books/${match[1]}` : null
  const bookItem = bookHref
    ? items.find((item) => item.href === bookHref)
    : null
  const chapterItems = bookItem?.children ?? []

  if (!chapterItems.length) return null

  return (
    <nav aria-label="Навигация по раздел" className="grow flex flex-col">
      <div className="px-2 pt-2 text-sm uppercase tracking-wide text-foreground/60">
        {bookItem?.title ?? title}
      </div>
      <div className="mt-2 flex flex-col">
        {chapterItems.map((item) => (
          <Anchor key={item.href} href={item.href}>
            {item.title}
          </Anchor>
        ))}
      </div>
    </nav>
  )
}
