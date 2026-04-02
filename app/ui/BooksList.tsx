'use client'

import { AnimatePresence, motion } from 'motion/react'

import { Card } from '@/app/ui/Card'
import { FilteredBook } from '@/app/types/book'

export default function BooksList({
  filteredBooks,
}: {
  filteredBooks: FilteredBook[]
}) {
  return (
    <div className="grid-list">
      <AnimatePresence>
        {filteredBooks.map((book) => {
          return (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card title={book.title} href={`/books/${book.id}`}>
                <section>
                  <p>{book.author}</p>

                  {book.shortNotes && (
                    <p className="text-sm font-light">{book.shortNotes}</p>
                  )}
                </section>
              </Card>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
