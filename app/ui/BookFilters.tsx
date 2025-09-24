'use client'

import { useState } from 'react'
import { FilterPanel } from './FilterPanel'
import { FilterGroup } from './FilterGroup'
import { FilterSelect } from './FilterSelect'
import {
  useMultiFilterState,
  useSingleFilterState,
} from './hooks/useFilterState'

interface BookFiltersProps {
  series: string[]
  authors: string[]
  years: number[]
  availableSeries?: string[]
  availableAuthors?: string[]
  availableYears?: number[]
}

export const BookFilters = ({
  series,
  authors,
  years,
  availableSeries = series,
  availableAuthors = authors,
  availableYears = years,
}: BookFiltersProps) => {
  const [isFiltersMenuOpen, setIsFiltersMenuOpen] = useState(false)

  const seriesFilter = useMultiFilterState({
    paramName: 'series',
    allOptions: series,
  })

  const authorsFilter = useMultiFilterState({
    paramName: 'authors',
    allOptions: authors,
  })

  const yearsFilter = useSingleFilterState({
    paramName: 'years',
    allOptions: years,
  })

  const handleClearFilters = () => {
    seriesFilter.setSelected([])
    authorsFilter.setSelected([])
    yearsFilter.setSelected(null)
  }

  const hasFilters =
    seriesFilter.hasFilters ||
    authorsFilter.hasFilters ||
    yearsFilter.hasFilters

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
          title="Само от следните автори"
          options={authors}
          selectedOptions={authorsFilter.selected as string[]}
          availableOptions={availableAuthors}
          onToggle={authorsFilter.handleToggle}
          idPrefix="author"
        />
      </div>

      <div className="mt-4">
        <FilterSelect
          title="Година на публикуване"
          value={yearsFilter.selected as number | null}
          onChange={yearsFilter.handleChange}
          options={years}
          availableOptions={availableYears}
          placeholder="Всички години"
        />
      </div>
    </FilterPanel>
  )
}
