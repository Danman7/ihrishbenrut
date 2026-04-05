'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { IoMdClose, IoMdMenu } from 'react-icons/io'
import { IoTriangleOutline } from 'react-icons/io5'

import { ROOT_NAVIGATION_ITEMS } from '@/app/constants'
import { Anchor } from '@/app/ui/Anchor'
import { SideNavigation } from '@/app/ui/SideNavigation'
import type { RouteItem } from '@/lib/routes'
import { Searchbar } from './Searchbar'

type HeaderProps = {
  sectionNav?: {
    items: RouteItem[]
    title: string
    rootUrl: string
  }
  isMobileMenuOpen: boolean
  onToggleMobileMenu: () => void
}

export const Header = ({
  sectionNav,
  isMobileMenuOpen,
  onToggleMobileMenu,
}: HeaderProps) => {
  const [lastPathname, setLastPathname] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY

      if (isMobileMenuOpen) {
        lastScrollY.current = currentY
        return
      }

      const delta = currentY - lastScrollY.current

      if (delta > 0 && currentY > 50) {
        downScrollAccumulator.current += delta
        if (downScrollAccumulator.current > 250) {
          setIsHeaderVisible(false)
        }
      } else if (delta < 0) {
        downScrollAccumulator.current = 0
        setIsHeaderVisible(true)
      }

      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isMobileMenuOpen])

  // Close mobile menu when route changes
  if (pathname !== lastPathname && isMobileMenuOpen) {
    onToggleMobileMenu()
    setLastPathname(pathname)
  } else if (pathname !== lastPathname) {
    setLastPathname(pathname)
  }

  const toggleMobileMenu = () => {
    onToggleMobileMenu()
  }

  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  // Scroll-hide behavior
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const lastScrollY = useRef(0)
  const downScrollAccumulator = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY

      if (isMobileMenuOpen) {
        lastScrollY.current = currentY
        return
      }

      const delta = currentY - lastScrollY.current

      if (delta > 0 && currentY > 50) {
        downScrollAccumulator.current += delta
        if (downScrollAccumulator.current > 250) {
          setIsHeaderVisible(false)
        }
      } else if (delta < 0) {
        downScrollAccumulator.current = 0
        setIsHeaderVisible(true)
      }

      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isMobileMenuOpen])

  return (
    <>
      <header
        className={`blurred-surface edge-padding flex-center z-50 py-3 sticky top-0 border-b border-foreground/20 font-bold transition-transform duration-300 justify-between ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <section className="flex-list text-2xl">
          <button
            className="lg:hidden cursor-pointer hover:text-primary transition-all m-0"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Затвори менюто' : 'Отвори менюто'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-haspopup="true"
            type="button"
          >
            {isMobileMenuOpen ? <IoMdClose /> : <IoMdMenu />}
          </button>

          <Link
            className="flex-center hover:gap-4 hover:text-primary font-bold transition-all"
            href="/"
            aria-label="Go to homepage"
          >
            <IoTriangleOutline className="text-primary" />
            <span className="hidden md:inline">Само Твоята Воля</span>
          </Link>
        </section>

        <nav className="hidden lg:flex flex-center gap-4">
          <div className="flex flex-list gap-4 text-lg">
            {ROOT_NAVIGATION_ITEMS.map((item) => (
              <Anchor key={item.href} href={item.href}>
                {item.name}
              </Anchor>
            ))}
          </div>

          <Searchbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearchSubmit={handleSearchSubmit}
          />
        </nav>
      </header>
    </>
  )
}
