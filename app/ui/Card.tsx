import type { ReactNode } from 'react'

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center border-2 border-border shadow-md rounded-2xl p-4 hover:shadow-lg hover:border-primary transition active:text-background active:bg-primary text-center">
      {children}
    </div>
  )
}
