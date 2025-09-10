'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { IoIosArrowDown, IoIosArrowForward, IoMdClose } from 'react-icons/io'
import { Checkbox } from './Checkbox'

interface BookFiltersProps {
  series: string[]
  authors: string[]
}

export const BookFilters = ({ series, authors }: BookFiltersProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isFiltersMenuOpen, setIsFiltersMenuOpen] = useState(false)

  // Initialize selected series from URL params or default to no series
  const [selectedSeries, setSelectedSeries] = useState<string[]>(() => {
    const seriesParam = searchParams.get('series')
    if (seriesParam) {
      return seriesParam.split(',').filter((s) => series.includes(s))
    }
    return []
  })

  // Initialize selected authors from URL params or default to no authors
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>(() => {
    const authorsParam = searchParams.get('authors')
    if (authorsParam) {
      return authorsParam.split(',').filter((a) => authors.includes(a))
    }
    return []
  })

  // Update URL when selected series or authors change
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const currentSeriesParam = params.get('series')
    const currentAuthorsParam = params.get('authors')

    let newSeriesParam: string | null = null
    let newAuthorsParam: string | null = null

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

    if (
      selectedAuthors.length === 0 ||
      selectedAuthors.length === authors.length
    ) {
      // If no authors selected or all authors selected, remove the parameter
      newAuthorsParam = null
    } else {
      // Add selected authors to URL
      newAuthorsParam = selectedAuthors.join(',')
    }

    // Only update URL if any parameter actually changed
    if (
      currentSeriesParam !== newSeriesParam ||
      currentAuthorsParam !== newAuthorsParam
    ) {
      if (newSeriesParam === null) {
        params.delete('series')
      } else {
        params.set('series', newSeriesParam)
      }

      if (newAuthorsParam === null) {
        params.delete('authors')
      } else {
        params.set('authors', newAuthorsParam)
      }

      // Update URL without causing a page reload
      const newUrl = params.toString() ? `?${params.toString()}` : ''
      router.push(`${window.location.pathname}${newUrl}`, { scroll: false })
    }
  }, [selectedSeries, selectedAuthors, router, searchParams, series, authors])

  const handleSeriesChange = (seriesName: string) => {
    setSelectedSeries((prev) =>
      prev.includes(seriesName)
        ? prev.filter((s) => s !== seriesName)
        : [...prev, seriesName]
    )
  }

  const handleAuthorsChange = (authorName: string) => {
    setSelectedAuthors((prev) =>
      prev.includes(authorName)
        ? prev.filter((a) => a !== authorName)
        : [...prev, authorName]
    )
  }

  const handleClearFilters = () => {
    setSelectedSeries([])
    setSelectedAuthors([])
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <button
          className="underline underline-offset-2 hover:decoration-3 items-center flex gap-2 cursor-pointer"
          onClick={() => setIsFiltersMenuOpen((prev) => !prev)}
        >
          {isFiltersMenuOpen ? <IoIosArrowDown /> : <IoIosArrowForward />} Избор
          (Филтри)
        </button>

        {(selectedSeries.length > 0 || selectedAuthors.length > 0) && (
          <button
            onClick={handleClearFilters}
            className="text-red-500 flex items-center gap-2 underline underline-offset-2 hover:decoration-3 "
          >
            <IoMdClose />
            Изчисти
          </button>
        )}
      </div>

      <AnimatePresence>
        {isFiltersMenuOpen && (
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: 300 }}
            exit={{ height: 0 }}
          >
            <fieldset className="border border-foreground p-4 rounded-md">
              <legend className="text-lg">Само от следните поредици</legend>

              <div className="flex flex-wrap gap-4">
                {series.map((seriesName) => (
                  <Checkbox
                    key={seriesName}
                    id={`series-${seriesName}`}
                    name={`series-${seriesName}`}
                    label={seriesName}
                    checked={selectedSeries.includes(seriesName)}
                    onChange={() => handleSeriesChange(seriesName)}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset className="border border-foreground p-4 rounded-md mt-4">
              <legend className="text-lg">Само от следните автори</legend>

              <div className="flex flex-wrap gap-4">
                {authors.map((authorName) => (
                  <Checkbox
                    key={authorName}
                    id={`author-${authorName}`}
                    name={`author-${authorName}`}
                    label={authorName}
                    checked={selectedAuthors.includes(authorName)}
                    onChange={() => handleAuthorsChange(authorName)}
                  />
                ))}
              </div>
            </fieldset>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
