'use client'

import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
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

function MultiFilterEntry({ config }: { config: MultiFilterConfig }) {
  const filter = useMultiFilterState({
    paramName: config.paramName,
    allOptions: config.options,
  })

  return (
    <FilterGroup
      title={config.title}
      options={config.options}
      selectedOptions={filter.selected as string[]}
      availableOptions={config.availableOptions ?? config.options}
      onToggle={filter.handleToggle}
      idPrefix={config.idPrefix}
    />
  )
}

function SingleFilterEntry({ config }: { config: SingleFilterConfig }) {
  const filter = useSingleFilterState({
    paramName: config.paramName,
    allOptions: config.options,
  })

  return (
    <FilterSelect
      title={config.title}
      value={filter.selected as number | null}
      onChange={filter.handleChange}
      options={config.options}
      availableOptions={config.availableOptions ?? config.options}
      placeholder={config.placeholder ?? ''}
    />
  )
}

function FilterEntry({ config }: { config: FilterConfig }) {
  if (config.type === 'multi') {
    return <MultiFilterEntry config={config} />
  }
  return <SingleFilterEntry config={config} />
}

export function Filters({ configs }: { configs: FilterConfig[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const hasFilters = configs.some((config) => {
    const value = searchParams.get(config.paramName)
    return value !== null && value.length > 0
  })

  const clearAll = () => {
    const params = new URLSearchParams(searchParams.toString())
    configs.forEach((config) => {
      params.delete(config.paramName)
    })

    const query = params.toString()
    const newUrl = query ? `${pathname}?${query}` : pathname
    router.push(newUrl, { scroll: false })
  }

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
