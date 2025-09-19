'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { IoIosArrowDown, IoIosArrowForward, IoMdClose } from 'react-icons/io'
import { Checkbox } from './Checkbox'

interface PrayerFiltersProps {
  series: string[]
  sources: string[]
  availableSeries?: string[]
  availableSources?: string[]
}

export const PrayerFilters = ({
  series,
  sources,
  availableSeries = series,
  availableSources = sources,
}: PrayerFiltersProps) => {
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
            className="grid overflow-hidden"
            initial={{ gridTemplateRows: '0fr' }}
            animate={{ gridTemplateRows: '1fr' }}
            exit={{ gridTemplateRows: '0fr' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="min-h-0">
              <fieldset className="border border-foreground p-4 rounded-md">
                <legend className="text-lg">Само от следните поредици</legend>

                <div
                  className="flex flex-wrap gap-4"
                  role="group"
                  aria-labelledby="series-legend"
                >
                  {series.map((seriesName) => {
                    const isAvailable = availableSeries.includes(seriesName)
                    const isSelected = selectedSeries.includes(seriesName)

                    // Hide unavailable series unless they are selected
                    if (!isAvailable && !isSelected) {
                      return null
                    }

                    return (
                      <div
                        key={seriesName}
                        className={!isAvailable ? 'opacity-50' : ''}
                      >
                        <Checkbox
                          id={`series-${seriesName}`}
                          name={`series-${seriesName}`}
                          label={seriesName}
                          checked={isSelected}
                          onChange={() => handleSeriesChange(seriesName)}
                          disabled={!isAvailable && !isSelected}
                        />
                      </div>
                    )
                  })}
                </div>
              </fieldset>

              <fieldset className="border border-foreground p-4 rounded-md mt-4">
                <legend className="text-lg">Само от следните източници</legend>

                <div
                  className="flex flex-wrap gap-4"
                  role="group"
                  aria-labelledby="sources-legend"
                >
                  {sources.map((sourceName) => {
                    const isAvailable = availableSources.includes(sourceName)
                    const isSelected = selectedSources.includes(sourceName)

                    // Hide unavailable sources unless they are selected
                    if (!isAvailable && !isSelected) {
                      return null
                    }

                    return (
                      <div
                        key={sourceName}
                        className={!isAvailable ? 'opacity-50' : ''}
                      >
                        <Checkbox
                          id={`source-${sourceName}`}
                          name={`source-${sourceName}`}
                          label={sourceName}
                          checked={isSelected}
                          onChange={() => handleSourcesChange(sourceName)}
                          disabled={!isAvailable && !isSelected}
                        />
                      </div>
                    )
                  })}
                </div>
              </fieldset>

              <div className="pb-4"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
