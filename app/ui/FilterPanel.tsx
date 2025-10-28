'use client'

import { ReactNode } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { IoIosArrowDown, IoIosArrowForward, IoMdClose } from 'react-icons/io'

interface FilterPanelProps {
  isOpen: boolean
  onToggle: () => void
  onClear: () => void
  hasFilters: boolean
  children: ReactNode
}

export const FilterPanel = ({
  isOpen,
  onToggle,
  onClear,
  hasFilters,
  children,
}: FilterPanelProps) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <button
          className="underline underline-offset-2 hover:decoration-3 items-center flex gap-2 cursor-pointer"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls="filters-panel"
        >
          {isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />} Избор (Филтри)
        </button>

        {hasFilters && (
          <button
            onClick={onClear}
            className="text-red-500 flex items-center gap-2 underline underline-offset-2 hover:decoration-3 cursor-pointer"
          >
            <IoMdClose />
            Изчисти
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="filters-panel"
            className="grid overflow-hidden"
            initial={{ gridTemplateRows: '0fr' }}
            animate={{ gridTemplateRows: '1fr' }}
            exit={{ gridTemplateRows: '0fr' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="min-h-0">
              {children}
              <div className="pb-4"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
