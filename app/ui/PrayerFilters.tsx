'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { IoIosArrowDown, IoIosArrowForward, IoMdClose } from 'react-icons/io'
import { Checkbox } from './Checkbox'

interface PrayerFiltersProps {
  series: string[]
  sources: string[]
}

export const PrayerFilters = ({ series, sources }: PrayerFiltersProps) => {
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

  // Initialize selected sources from URL params or default to no sources
  const [selectedSources, setSelectedSources] = useState<string[]>(() => {
    const sourcesParam = searchParams.get('sources')
    if (sourcesParam) {
      return sourcesParam.split(',').filter((s) => sources.includes(s))
    }
    return []
  })

  // Update URL when selected series or sources change
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const currentSeriesParam = params.get('series')
    const currentSourcesParam = params.get('sources')

    let newSeriesParam: string | null = null
    let newSourcesParam: string | null = null

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
      selectedSources.length === 0 ||
      selectedSources.length === sources.length
    ) {
      // If no sources selected or all sources selected, remove the parameter
      newSourcesParam = null
    } else {
      // Add selected sources to URL
      newSourcesParam = selectedSources.join(',')
    }

    // Only update URL if any parameter actually changed
    if (
      currentSeriesParam !== newSeriesParam ||
      currentSourcesParam !== newSourcesParam
    ) {
      if (newSeriesParam === null) {
        params.delete('series')
      } else {
        params.set('series', newSeriesParam)
      }

      if (newSourcesParam === null) {
        params.delete('sources')
      } else {
        params.set('sources', newSourcesParam)
      }

      // Update URL without causing a page reload
      const newUrl = params.toString() ? `?${params.toString()}` : ''
      router.push(`${window.location.pathname}${newUrl}`, { scroll: false })
    }
  }, [selectedSeries, selectedSources, router, searchParams, series, sources])

  const handleSeriesChange = (seriesName: string) => {
    setSelectedSeries((prev) =>
      prev.includes(seriesName)
        ? prev.filter((s) => s !== seriesName)
        : [...prev, seriesName]
    )
  }

  const handleSourcesChange = (sourceName: string) => {
    setSelectedSources((prev) =>
      prev.includes(sourceName)
        ? prev.filter((s) => s !== sourceName)
        : [...prev, sourceName]
    )
  }

  const handleClearFilters = () => {
    setSelectedSeries([])
    setSelectedSources([])
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <button
          className="underline underline-offset-2 hover:decoration-3 items-center flex gap-2 cursor-pointer"
          onClick={() => setIsFiltersMenuOpen((prev) => !prev)}
          aria-expanded={isFiltersMenuOpen}
          aria-controls="filters-panel"
        >
          {isFiltersMenuOpen ? <IoIosArrowDown /> : <IoIosArrowForward />} Избор
          (Филтри)
        </button>

        {(selectedSeries.length > 0 || selectedSources.length > 0) && (
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
            id="filters-panel"
            className="overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: 320 }}
            exit={{ height: 0 }}
          >
            <fieldset className="border border-foreground p-4 rounded-md">
              <legend className="text-lg">Само от следните поредици</legend>

              <div
                className="flex flex-wrap gap-4"
                role="group"
                aria-labelledby="series-legend"
              >
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
              <legend className="text-lg">Само от следните източници</legend>

              <div
                className="flex flex-wrap gap-4"
                role="group"
                aria-labelledby="sources-legend"
              >
                {sources.map((sourceName) => (
                  <Checkbox
                    key={sourceName}
                    id={`source-${sourceName}`}
                    name={`source-${sourceName}`}
                    label={sourceName}
                    checked={selectedSources.includes(sourceName)}
                    onChange={() => handleSourcesChange(sourceName)}
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
