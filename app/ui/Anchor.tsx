'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Anchor: React.FC<{
  children: React.ReactNode
  href: string
  className?: string
}> = ({ href, children, className = '' }) => {
  const pathname = usePathname()

  const isActive = pathname.startsWith(href)

  const baseClasses =
    'underline underline-offset-2 hover:decoration-3 transition hover:text-foreground inline-flex items-center gap-2'

  const activeClasses = isActive ? 'text-primary' : ''

  const combinedClasses = [baseClasses, activeClasses, className]
    .filter(Boolean)
    .join(' ')

  return (
    <Link className={combinedClasses} href={href}>
      {children}
    </Link>
  )
}
