'use client'

import { AnimatePresence, motion } from 'motion/react'

import Link from 'next/link'
import { FilteredBook } from '@/app/types/book'

export default function BooksList({
  filteredBooks,
}: {
  filteredBooks: FilteredBook[]
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <AnimatePresence>
        {filteredBooks.map((book) => {
          return (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full md:w-1/3 flex flex-col items-center justify-center border-2 border-border shadow-md rounded-2xl p-4 hover:shadow-lg hover:border-primary transition active:text-background active:bg-primary text-center"
            >
              <Link href={`/books/${book.id}`}>
                <div className="text-2xl mb-4 font-bold font-serif">
                  {book.title}
                </div>
                <div className="text-xl mb-2 italic">{book.author}</div>
                <div>{book.series.join(', ')}</div>
                {book.shortNotes && (
                  <div className="text-sm">{book.shortNotes}</div>
                )}
              </Link>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
