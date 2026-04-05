'use client'

import { Anchor } from '@/app/ui/Anchor'
import type { RouteItem } from '@/lib/routes'
import { usePathname } from 'next/navigation'
import { GiBookCover } from 'react-icons/gi'

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
      <p className="lead">{bookItem?.title ?? title}</p>
      <div className="mt-2 flex flex-col gap-2 text-left">
        {chapterItems.map((item) => (
          <Anchor key={item.href} href={item.href}>
            {item.title}
          </Anchor>
        ))}
      </div>
    </nav>
  )
}
