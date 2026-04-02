import Link from 'next/link'
import type { ReactNode } from 'react'

export const Card: React.FC<{
  title: string
  children: ReactNode
  href: string
}> = ({ title, children, href }) => (
  <Link
    href={href}
    className="box w-full h-64 flex-col no-underline p-0 items-start hover:shadow-md hover:scale-105 transition-all active:scale-100 active:shadow-sm"
  >
    <div className="h-1/2 p-4">
      <p className="font-bold text-xl">{title}</p>
    </div>

    <div className="bg-surface p-4 h-1/2 w-full">{children}</div>
  </Link>
)
