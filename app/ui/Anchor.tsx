'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Anchor: React.FC<{
  children: React.ReactNode
  href: string
  className?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}> = ({ href, children, className = '', onClick }) => {
  const pathname = usePathname()

  const isActive = pathname.includes(href)

  return (
    <Link
      href={href}
      scroll
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={`${className} ${isActive ? 'text-primary' : ''}`}
    >
      {children}
    </Link>
  )
}
