import '@/app/globals.css'
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: { href: string; title: string }[]
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center mb-4 text-sm text-light"
    >
      {breadcrumbs.map((crumb, idx) => (
        <span key={crumb.href}>
          <Link href={crumb.href} className="hover:text-foreground">
            {crumb.title}
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
