'use client'

import { useState } from 'react'
import { FilterPanel } from './FilterPanel'
import { FilterGroup } from './FilterGroup'
import { useMultiFilterState } from './hooks/useFilterState'

interface WisdomFiltersProps {
  topics: string[]
  authors: string[]
  availableTopics?: string[]
  availableAuthors?: string[]
}

export const WisdomFilters = ({
  topics,
  authors,
  availableTopics = topics,
  availableAuthors = authors,
}: WisdomFiltersProps) => {
  const [isFiltersMenuOpen, setIsFiltersMenuOpen] = useState(false)

  const topicsFilter = useMultiFilterState({
    paramName: 'topics',
    allOptions: topics,
  })

  const authorsFilter = useMultiFilterState({
    paramName: 'authors',
    allOptions: authors,
  })

  const handleClearFilters = () => {
    topicsFilter.setSelected([])
    authorsFilter.setSelected([])
  }

  const hasFilters = topicsFilter.hasFilters || authorsFilter.hasFilters

  return (
    <FilterPanel
      isOpen={isFiltersMenuOpen}
      onToggle={() => setIsFiltersMenuOpen((prev) => !prev)}
      onClear={handleClearFilters}
      hasFilters={hasFilters}
    >
      <FilterGroup
        title="Само по следните теми"
        options={topics}
        selectedOptions={topicsFilter.selected as string[]}
        availableOptions={availableTopics}
        onToggle={topicsFilter.handleToggle}
        idPrefix="topic"
      />

      <div className="mt-4">
        <FilterGroup
          title="Само от следните източници"
          options={authors}
          selectedOptions={authorsFilter.selected as string[]}
          availableOptions={availableAuthors}
          onToggle={authorsFilter.handleToggle}
          idPrefix="author"
        />
      </div>
    </FilterPanel>
  )
}
