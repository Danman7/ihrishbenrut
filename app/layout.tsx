import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import './globals.css'
import { Nav } from '@/app/ui/Nav'

const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
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
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${notoSans.variable} font-serif antialiased`}>
        <Nav />
        <main className="mx-auto max-w-4xl p-4">{children}</main>
        <footer className="bg-foreground text-background flex justify-between bottom-0 left-0 right-0 p-4 gap-4">
          <div>Все що е писано</div>
          <div>
            <a href="mailto:danmanm@gmail.com">danmanm@gmail.com</a>
          </div>
        </footer>
      </body>
    </html>
  )
}
