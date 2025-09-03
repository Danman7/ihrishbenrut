import '@/app/globals.css'
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: { href: string; title: string }[]
}) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center mb-10 flex-wrap">
      {breadcrumbs.map((crumb, idx) => (
        <span key={crumb.href}>
          <Link
            href={crumb.href}
            className="underline underline-offset-2 hover:decoration-3"
          >
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
