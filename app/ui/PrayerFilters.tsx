'use client'

import { useState } from 'react'
import { FilterPanel } from './FilterPanel'
import { FilterGroup } from './FilterGroup'
import { useMultiFilterState } from './hooks/useFilterState'

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
  const [isFiltersMenuOpen, setIsFiltersMenuOpen] = useState(false)

  const seriesFilter = useMultiFilterState({
    paramName: 'series',
    allOptions: series,
  })

  const sourcesFilter = useMultiFilterState({
    paramName: 'sources',
    allOptions: sources,
  })

  const handleClearFilters = () => {
    seriesFilter.setSelected([])
    sourcesFilter.setSelected([])
  }

  const hasFilters = seriesFilter.hasFilters || sourcesFilter.hasFilters

  return (
    <FilterPanel
      isOpen={isFiltersMenuOpen}
      onToggle={() => setIsFiltersMenuOpen((prev) => !prev)}
      onClear={handleClearFilters}
      hasFilters={hasFilters}
    >
      <FilterGroup
        title="Само от следните поредици"
        options={series}
        selectedOptions={seriesFilter.selected as string[]}
        availableOptions={availableSeries}
        onToggle={seriesFilter.handleToggle}
        idPrefix="series"
      />

      <div className="mt-4">
        <FilterGroup
          title="Само от следните източници"
          options={sources}
          selectedOptions={sourcesFilter.selected as string[]}
          availableOptions={availableSources}
          onToggle={sourcesFilter.handleToggle}
          idPrefix="source"
        />
      </div>
    </FilterPanel>
  )
}
