'use client'

import { useState } from 'react'
import { FilterPanel } from './FilterPanel'
import { FilterGroup } from './FilterGroup'
import { FilterSelect } from './FilterSelect'
import {
  useMultiFilterState,
  useSingleFilterState,
} from './hooks/useFilterState'

type MultiFilterConfig = {
  type: 'multi'
  paramName: string
  title: string
  idPrefix: string
  options: string[]
  availableOptions?: string[]
}

type SingleFilterConfig = {
  type: 'single'
  paramName: string
  title: string
  options: number[]
  availableOptions?: number[]
  placeholder?: string
}

export type FilterConfig = MultiFilterConfig | SingleFilterConfig

function MultiFilter({ config }: { config: MultiFilterConfig }) {
  const filter = useMultiFilterState({
    paramName: config.paramName,
    allOptions: config.options,
  })

  return {
    filter,
    element: (
      <FilterGroup
        title={config.title}
        options={config.options}
        selectedOptions={filter.selected as string[]}
        availableOptions={config.availableOptions ?? config.options}
        onToggle={filter.handleToggle}
        idPrefix={config.idPrefix}
      />
    ),
  }
}

function SingleFilter({ config }: { config: SingleFilterConfig }) {
  const filter = useSingleFilterState({
    paramName: config.paramName,
    allOptions: config.options,
  })

  return {
    filter,
    element: (
      <FilterSelect
        title={config.title}
        value={filter.selected as number | null}
        onChange={filter.handleChange}
        options={config.options}
        availableOptions={config.availableOptions ?? config.options}
        placeholder={config.placeholder ?? ''}
      />
    ),
  }
}

function FilterEntry({ config }: { config: FilterConfig }) {
  if (config.type === 'multi') {
    return MultiFilter({ config }).element
  }
  return SingleFilter({ config }).element
}

function useFilterEntries(configs: FilterConfig[]) {
  const entries = configs.map((config) => {
    if (config.type === 'multi') {
      return MultiFilter({ config })
    }
    return SingleFilter({ config })
  })

  const hasFilters = entries.some((e) => e.filter.hasFilters)
  const clearAll = () => {
    entries.forEach((e) => {
      if ('setSelected' in e.filter) {
        if (Array.isArray(e.filter.selected)) {
          ;(e.filter.setSelected as (value: (string | number)[]) => void)([])
        } else {
          ;(e.filter.setSelected as (value: string | number | null) => void)(
            null
          )
        }
      }
    })
  }

  return { hasFilters, clearAll }
}

export function Filters({ configs }: { configs: FilterConfig[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const { hasFilters, clearAll } = useFilterEntries(configs)

  return (
    <FilterPanel
      isOpen={isOpen}
      onToggle={() => setIsOpen((prev) => !prev)}
      onClear={clearAll}
      hasFilters={hasFilters}
    >
      {configs.map((config, i) => (
        <div key={config.paramName} className={i > 0 ? 'mt-4' : undefined}>
          <FilterEntry config={config} />
        </div>
      ))}
    </FilterPanel>
  )
}
