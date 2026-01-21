'use client'

import { AnimatePresence, motion } from 'motion/react'

import Card from '@/app/ui/Card'
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
              <Card href={`/books/${book.id}`}>
                <h2 className="text-2xl">{book.title}</h2>
                <p>{book.author}</p>

                {book.shortNotes && (
                  <div className="text-sm font-light">{book.shortNotes}</div>
                )}
              </Card>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
