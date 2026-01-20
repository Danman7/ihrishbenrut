import Link from 'next/link'
import type { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  href?: string
}

export default function Card({ children, href }: CardProps) {
  const className =
    'relative flex h-full flex-col items-center bg-surface text-foreground justify-center border-2 border-foreground/10 shadow-sm rounded-2xl p-4 hover:shadow-md hover:border-primary transition active:text-background active:bg-primary text-center no-underline'

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }

  return <div className={className}>{children}</div>
}
