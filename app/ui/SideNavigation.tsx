'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import { ROOT_NAVIGATION_ITEMS } from '@/app/constants'
import { Anchor } from '@/app/ui/Anchor'
import { Searchbar } from '@/app/ui/Searchbar'
import { SectionNav } from '@/app/ui/SectionNav'
import type { RouteItem } from '@/lib/routes'

type SideNavigationProps = {
  sectionNav?: {
    items: RouteItem[]
    title: string
    rootUrl: string
  }
  isMobile?: boolean
}

export const SideNavigation = ({
  sectionNav,
  isMobile,
}: SideNavigationProps) => {
  const pathname = usePathname()
  const isBookDetail = /^\/books\/[^/]+(?:\/chapters\/[^/]+)?$/.test(pathname)
  const shouldShowSectionNav = !!sectionNav && isBookDetail
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <nav
      className={`edge-padding blurred-surface divide-y divide-foreground/10 ${
        isMobile ? 'h-dvh overflow-y-auto pt-4' : 'h-full w-72 overflow-y-auto'
      }`}
    >
      <div className="flex flex-col lg:hidden font-bold space-y-2">
        {ROOT_NAVIGATION_ITEMS.map((item) => (
          <Anchor key={item.href} href={item.href}>
            {' '}
            {item.name}
          </Anchor>
        ))}

        <Searchbar
          isFullWidth
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearchSubmit={handleSearchSubmit}
        />
      </div>

      {shouldShowSectionNav ? (
        <SectionNav
          items={sectionNav.items}
          title={sectionNav.title}
          rootUrl={sectionNav.rootUrl}
        />
      ) : null}
    </nav>
  )
}
