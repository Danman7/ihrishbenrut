'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { IoIosArrowDown, IoIosArrowForward, IoMdClose } from 'react-icons/io'
import { Checkbox } from './Checkbox'

interface BookFiltersProps {
  series: string[]
  authors: string[]
  years: number[]
}

export const BookFilters = ({ series, authors, years }: BookFiltersProps) => {
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

  // Initialize selected years from URL params or default to no years
  const [selectedYear, setSelectedYear] = useState<number | null>(() => {
    const yearsParam = searchParams.get('years')
    if (yearsParam) {
      const year = Number(yearsParam)
      return years.includes(year) ? year : null
    }
    return null
  })

  // Update URL when selected series, authors, or years change
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const currentSeriesParam = params.get('series')
    const currentAuthorsParam = params.get('authors')
    const currentYearsParam = params.get('years')

    let newSeriesParam: string | null = null
    let newAuthorsParam: string | null = null
    let newYearsParam: string | null = null

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

    if (selectedYear === null) {
      // If no year selected, remove the parameter
      newYearsParam = null
    } else {
      // Add selected year to URL
      newYearsParam = selectedYear.toString()
    }

    // Only update URL if any parameter actually changed
    if (
      currentSeriesParam !== newSeriesParam ||
      currentAuthorsParam !== newAuthorsParam ||
      currentYearsParam !== newYearsParam
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

      if (newYearsParam === null) {
        params.delete('years')
      } else {
        params.set('years', newYearsParam)
      }

      // Update URL without causing a page reload
      const newUrl = params.toString() ? `?${params.toString()}` : ''
      router.push(`${window.location.pathname}${newUrl}`, { scroll: false })
    }
  }, [
    selectedSeries,
    selectedAuthors,
    selectedYear,
    router,
    searchParams,
    series,
    authors,
    years,
  ])

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

  const handleYearsChange = (year: number | null) => {
    setSelectedYear(year)
  }

  const handleClearFilters = () => {
    setSelectedSeries([])
    setSelectedAuthors([])
    setSelectedYear(null)
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

        {(selectedSeries.length > 0 ||
          selectedAuthors.length > 0 ||
          selectedYear !== null) && (
          <button
            onClick={handleClearFilters}
            className="text-red-500 flex items-center gap-2 underline underline-offset-2 hover:decoration-3 cursor-pointer"
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
            animate={{ height: 350 }}
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

            <fieldset className="border border-foreground p-4 rounded-md mt-4">
              <legend className="text-lg">Година на публикуване</legend>

              <select
                value={selectedYear || ''}
                onChange={(e) =>
                  handleYearsChange(
                    e.target.value ? Number(e.target.value) : null
                  )
                }
                className="w-full p-2 border rounded-md bg-background text-foreground border-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">Всички години</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </fieldset>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
