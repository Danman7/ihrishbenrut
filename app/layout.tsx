import type { Metadata } from 'next'
import { Noto_Serif, Noto_Serif_Display } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const notoSerif = Noto_Serif({
  variable: '--font-noto-serif',
  subsets: ['cyrillic'],
})

const notoSerifDisplay = Noto_Serif_Display({
  variable: '--font-noto-serif-display',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Само Твоята Воля',
  description:
    'Библиотека на търсача - книги, молитви, мъдрости. Слово което не e наше. Защото всичко, което e било писано отпреди, e било писано за наше поучение.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full bg-background text-foreground">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${notoSerif.variable} ${notoSerifDisplay.variable} antialiased h-full flex flex-col font-serif selection:bg-primary selection:text-background`}
      >
        <main className="grow">{children}</main>

        <footer className="inset-shadow-sm text-center sm:flex sm:justify-between px-6 py-4 gap-4 shadow-md bg-surface z-10">
          <div className="mb-2 md:mb-0">
            <Link href="/" className="text-foreground!">
              Само Твоята Воля
            </Link>
          </div>

          <div>
            <a href="mailto:danmanm@gmail.com">danmanm@gmail.com</a>
          </div>
        </footer>
      </body>
    </html>
  )
}
