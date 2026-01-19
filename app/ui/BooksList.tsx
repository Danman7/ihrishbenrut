'use client'

import { AnimatePresence, motion } from 'motion/react'

import Card from '@/app/ui/Card'
import Link from 'next/link'
import { FilteredBook } from '@/app/types/book'

export default function BooksList({
  filteredBooks,
}: {
  filteredBooks: FilteredBook[]
}) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <AnimatePresence>
        {filteredBooks.map((book) => {
          return (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card>
                <Link href={`/books/${book.id}`} className="w-full h-full">
                  <div className="text-2xl mb-2 font-bold font-serif">
                    {book.title}
                  </div>
                  <div className="text-xl mb-2 italic">{book.author}</div>
                  <div>{book.series.join(', ')}</div>
                  {book.shortNotes && (
                    <div className="text-sm">{book.shortNotes}</div>
                  )}
                </Link>
              </Card>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
