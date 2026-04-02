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
    <html lang="bg" className="h-full bg-background text-foreground">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${notoSerif.variable} ${notoSerifDisplay.variable} text-pretty leading-[1.6] font-medium antialiased h-full font-serif selection:bg-primary selection:text-background`}
      >
        <div id="main-content" className="grow">
          {children}
        </div>
      </body>
    </html>
  )
}
