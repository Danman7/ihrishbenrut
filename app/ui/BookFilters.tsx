'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'

interface BookFiltersProps {
  series: string[]
}

export const BookFilters = ({ series }: BookFiltersProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isFiltersMenuOpen, setIsFiltersMenuOpen] = useState(false)

  // Initialize selected series from URL params or default to all series
  const [selectedSeries, setSelectedSeries] = useState<string[]>(() => {
    const seriesParam = searchParams.get('series')
    if (seriesParam) {
      return seriesParam.split(',').filter((s) => series.includes(s))
    }
    return series
  })

  // Update URL when selected series changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const currentSeriesParam = params.get('series')

    let newSeriesParam: string | null = null

    if (
      selectedSeries.length === 0 ||
      selectedSeries.length === series.length
    ) {
      // If no series selected or all series selected, remove the parameter
      newSeriesParam = null
    } else {
      // Add selected series to URL
      newSeriesParam = selectedSeries.join(',')
    }

    // Only update URL if the parameter actually changed
    if (currentSeriesParam !== newSeriesParam) {
      if (newSeriesParam === null) {
        params.delete('series')
      } else {
        params.set('series', newSeriesParam)
      }

      // Update URL without causing a page reload
      const newUrl = params.toString() ? `?${params.toString()}` : ''
      router.push(`${window.location.pathname}${newUrl}`, { scroll: false })
    }
  }, [selectedSeries, router, searchParams, series])

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
