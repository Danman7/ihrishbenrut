import '@/app/globals.css'
import { Anchor } from '@/app/ui/Anchor'
import Breadcrumbs from '@/app/ui/Breadcrumbs'
import Link from 'next/link'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex">
      <aside className="w-1/4">
        {/* {routesConfig.map((route) => (
          <div key={route.path} className="px-0.5 last-of-type:mb-0 mb-8">
            <Link href={route.path}>{route.title}</Link>

            <ul className="ml-4">
              {route.routes?.map((subRoute) => (
                <li className="my-1.5" key={subRoute.path}>
                  <Anchor href={subRoute.path}>{subRoute.title}</Anchor>
                </li>
              ))}
            </ul>
          </div>
        ))} */}
      </aside>

      <div className="w-3/4">
        <Breadcrumbs />

        {children}
      </div>
    </div>
  )
}
