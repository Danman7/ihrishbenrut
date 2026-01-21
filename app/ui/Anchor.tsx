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

  const isActive = pathname.endsWith(href)

  return (
    <Link
      className={`rounded w-full px-2 py-1 hover:bg-surface-dim border border-transparent hover:border-foreground/10 ${isActive ? 'bg-primary-surface border-primary/20! text-primary-text' : ''} ${className}`}
      href={href}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  )
}
