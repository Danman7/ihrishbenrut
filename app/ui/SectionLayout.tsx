'use client'

import { Header } from '@/app/ui/Header'
import { SideNavigation } from '@/app/ui/SideNavigation'
import { usePathname } from 'next/navigation'
import type { RouteItem } from '@/lib/routes'
import { useState } from 'react'

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [lastPathname, setLastPathname] = useState(pathname)

  // Close mobile menu on route change
  if (pathname !== lastPathname) {
    setLastPathname(pathname)
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
  }

  if (pathname === '/') {
    return <div className="grow">{children}</div>
  }

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev)

  return (
    <div className="flex flex-col min-h-full">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={toggleMobileMenu}
        sectionNav={items ? { items, title, rootUrl } : undefined}
      />

      <div className="flex relative grow">
        <aside className="hidden lg:block z-30 w-72 shrink-0 self-start sticky top-12 h-[calc(100dvh-3rem)] overflow-hidden">
          <SideNavigation
            sectionNav={items ? { items, title, rootUrl } : undefined}
          />
        </aside>

        <main className="grow px-4 py-10 mx-auto max-w-[70ch]">{children}</main>
      </div>

      <div
        id="mobile-nav"
        className={`fixed top-0 left-0 h-full transition z-40 lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <SideNavigation
          isMobile
          sectionNav={items ? { items, title, rootUrl } : undefined}
        />
      </div>
    </div>
  )
}
