'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaAsterisk } from 'react-icons/fa'
import { IoTriangleOutline } from 'react-icons/io5'

export const Anchor: React.FC<{
  children: React.ReactNode
  href: string
  className?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}> = ({ href, children, className = '', onClick }) => {
  const pathname = usePathname()

  const isActive = pathname.endsWith(href)

  return (
    <Link
      className={`flex items-center gap-1 rounded w-full px-2 py-1 border border-transparent hover:text-primary active:text-primary/80 ${className}`}
      href={href}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
    >
      {isActive && (
        <IoTriangleOutline focusable="false" className="text-primary text-xs" />
      )}

      {children}
    </Link>
  )
}
