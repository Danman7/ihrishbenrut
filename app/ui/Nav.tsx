'use client'

import { Anchor } from '@/app/ui/Anchor'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IoMdClose, IoMdMenu } from 'react-icons/io'
import { IoTriangleOutline } from 'react-icons/io5'
import { motion, AnimatePresence } from 'motion/react'

const navigation = [
  { name: 'Книги', href: '/books' },
  { name: 'Молитви', href: '/prayers' },
  { name: 'Мъдрости', href: '/wisdom' },
]

export const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  return (
    <header className="shadow-md">
      <nav className="flex items-center justify-between mx-auto py-4 px-4 md:px-8 gap-10">
        <div className="text-2xl font-serif">
          <Link className="flex items-center gap-4" href="/">
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

        <input
          className="hidden lg:block rounded-md border border-foreground px-2 py-1 ml-auto focus:border-primary focus:outline focus:outline-primary w-72"
          type="search"
          id="site-search"
          placeholder="Търсене..."
        />
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <nav className="md:hidden text-center flex flex-col gap-4 px-4 pb-4 overflow-hidden">
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
          </nav>
        )}
      </AnimatePresence>
    </header>
  )
}
