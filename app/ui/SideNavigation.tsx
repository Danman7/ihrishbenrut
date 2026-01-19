'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ROOT_NAVIGATION_ITEMS } from '@/app/constants'
import { Anchor } from '@/app/ui/Anchor'
import { SectionNav } from '@/app/ui/SectionNav'
import type { RouteItem } from '@/lib/routes'
import { IoTriangleOutline } from 'react-icons/io5'

type SideNavigationProps = {
  sectionNav?: {
    items: RouteItem[]
    title: string
    rootUrl: string
  }
  hideLogo?: boolean
  isMobile?: boolean
}

export const SideNavigation = ({
  sectionNav,
  hideLogo,
  isMobile,
}: SideNavigationProps) => {
  const pathname = usePathname()
  const isBookDetail = /^\/books\/[^/]+(?:\/chapters\/[^/]+)?$/.test(pathname)
  const shouldShowSectionNav = !!sectionNav && isBookDetail

  return (
    <nav
      aria-labelledby="primary-navigation"
      className={`flex flex-col bg-surface shadow-lg overflow-y-auto w-72 divide-y space-y-4 divide-foreground/10 p-4 *:space-y-1 ${
        isMobile ? 'h-full' : 'sticky top-0 max-h-screen'
      }`}
    >
      {!hideLogo && (
        <Link
          className="flex items-center gap-2 hover:gap-4 hover:text-primary font-bold no-underline transition-all text-xl px-2 pb-4"
          href="/"
          aria-label="Go to homepage"
        >
          <IoTriangleOutline />
          <span className="hidden sm:inline">Само Твоята Воля</span>
        </Link>
      )}

      <div className="flex flex-col font-semibold pb-4">
        {ROOT_NAVIGATION_ITEMS.map((item) => (
          <Anchor key={item.href} href={item.href}>
            {' '}
            {item.name}
          </Anchor>
        ))}
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
