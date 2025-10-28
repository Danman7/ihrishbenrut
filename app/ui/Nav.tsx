'use client'

import { Anchor } from '@/app/ui/Anchor'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IoMdClose, IoMdMenu } from 'react-icons/io'
import { IoTriangleOutline } from 'react-icons/io5'
import { motion, AnimatePresence } from 'motion/react'
import { Searchbar } from '@/app/ui/Searchbar'

const navigation = [
  { name: 'Книги', href: '/books' },
  { name: 'Молитви', href: '/prayers' },
  { name: 'Мъдрости', href: '/wisdom' },
]

export const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const pathname = usePathname()
  const router = useRouter()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="shadow-md">
      <nav className="flex items-center justify-between mx-auto p-4 md:px-8 gap-10">
        <div className="text-2xl font-serif">
          <Link className="flex items-center gap-2" href="/">
            <IoTriangleOutline />
            Само Твоята Воля
          </Link>
        </div>

        <div className="gap-4 hidden md:flex">
          {navigation.map((item) => (
            <Anchor key={item.href} href={item.href}>
              {item.name}
            </Anchor>
          ))}
        </div>

        <div className="justify-end md:hidden">
          {isMobileMenuOpen ? (
            <IoMdClose className="text-xl" onClick={toggleMobileMenu} />
          ) : (
            <IoMdMenu className="text-xl" onClick={toggleMobileMenu} />
          )}
        </div>

        <Searchbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearchSubmit={handleSearchSubmit}
        />
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <nav className="md:hidden text-center flex flex-col gap-4 overflow-hidden px-4 pb-4">
            <hr className="text-border" />

            {navigation.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{
                  delay: index * 0.1,
                }}
              >
                <Anchor href={item.href}>{item.name}</Anchor>
              </motion.div>
            ))}

            <hr className="text-border" />

            <Searchbar
              isMobile
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearchSubmit={handleSearchSubmit}
            />
          </nav>
        )}
      </AnimatePresence>
    </header>
  )
}
