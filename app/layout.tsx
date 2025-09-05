import type { Metadata } from 'next'
import { Noto_Sans, Noto_Serif } from 'next/font/google'
import './globals.css'
import { Nav } from '@/app/ui/Nav'
import Link from 'next/link'

const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['cyrillic'],
})

const notoSerif = Noto_Serif({
  variable: '--font-noto-serif',
  subsets: ['cyrillic'],
})

export const metadata: Metadata = {
  title: 'Само Твоята Воля',
  description: 'Все що е писано',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${notoSans.variable} ${notoSerif.variable} font-serif antialiased h-full flex flex-col`}
      >
        <Nav />

        <main className="mx-auto w-full py-4 px-4 md:px-8 flex-grow">
          {children}
        </main>

        <footer className="bg-foreground text-background flex justify-between p-4 gap-4 mt-8">
          <Link href="/">Само Твоята Воля</Link>

          <div>
            <a href="mailto:danmanm@gmail.com">danmanm@gmail.com</a>
          </div>
        </footer>
      </body>
    </html>
  )
}
