'use client'

import '@/app/globals.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IoIosArrowForward } from 'react-icons/io'

export default function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  const breadcrumbs = [
    ...segments.slice(1).map((seg, idx) => {
      const href = '/docs/' + segments.slice(1, idx + 2).join('/')

      const name = seg
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())

      return { name, href }
    }),
  ]

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center mb-4 text-sm text-light"
    >
      {breadcrumbs.map((crumb, idx) => (
        <span key={crumb.href}>
          <Link href={crumb.href} className="hover:text-foreground">
            {crumb.name}
          </Link>

          {idx < breadcrumbs.length - 1 && (
            <span className="mx-1">
              <IoIosArrowForward className="inline" />
            </span>
          )}
        </span>
      ))}
    </nav>
  )
}
