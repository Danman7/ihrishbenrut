'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'

interface BookFiltersProps {
  series: string[]
}

export const BookFilters = ({ series }: BookFiltersProps) => {
  const [isFiltersMenuOpen, setIsFiltersMenuOpen] = useState(false)
  const [selectedSeries, setSelectedSeries] = useState<string[]>(series)

  const handleSeriesChange = (seriesName: string) => {
    setSelectedSeries((prev) =>
      prev.includes(seriesName)
        ? prev.filter((s) => s !== seriesName)
        : [...prev, seriesName]
    )
  }

  return (
    <>
      <button
        className="underline underline-offset-2 hover:decoration-3 items-center flex gap-2 mb-4 cursor-pointer"
        onClick={() => setIsFiltersMenuOpen((prev) => !prev)}
      >
        {isFiltersMenuOpen ? <IoIosArrowDown /> : <IoIosArrowForward />} Избор
        (Филтри)
      </button>

      <AnimatePresence>
        {isFiltersMenuOpen && (
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: 150 }}
            exit={{ height: 0 }}
          >
            <fieldset className="border border-foreground p-4 rounded-md">
              <legend className="text-lg">Поредици</legend>

              <div className="flex flex-wrap gap-4">
                {series.map((seriesName) => (
                  <div key={seriesName} className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      id={`series-${seriesName}`}
                      name={`series-${seriesName}`}
                      checked={selectedSeries.includes(seriesName)}
                      onChange={() => handleSeriesChange(seriesName)}
                    />
                    <label htmlFor={`series-${seriesName}`}>{seriesName}</label>
                  </div>
                ))}
              </div>
            </fieldset>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
