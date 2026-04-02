import Link from 'next/link'
import type { ReactNode } from 'react'

export const Card: React.FC<{
  title: string
  children: ReactNode
  href: string
}> = ({ title, children, href }) => (
  <Link href={href} className="box w-full h-full flex-col">
    <h2 className="lead">{title}</h2>
    {children}
  </Link>
)
