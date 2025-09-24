'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface UseFilterStateOptions {
  paramName: string
  allOptions: string[] | number[]
  isMultiSelect?: boolean
}

interface UseFilterStateReturn<T> {
  selected: T[]
  setSelected: (value: T[] | ((prev: T[]) => T[])) => void
  handleToggle: (value: T) => void
  hasFilters: boolean
}

interface UseSingleFilterStateReturn<T> {
  selected: T | null
  setSelected: (value: T | null) => void
  handleChange: (value: T | null) => void
  hasFilters: boolean
}

// Multi-select hook (for checkboxes)
export function useMultiFilterState<T extends string | number>({
  paramName,
  allOptions,
}: UseFilterStateOptions): UseFilterStateReturn<T> {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selected, setSelected] = useState<T[]>(() => {
    const param = searchParams.get(paramName)
    if (param) {
      const values = param
        .split(',')
        .map((v) => (typeof allOptions[0] === 'number' ? Number(v) : v)) as T[]
      return values.filter((v) => (allOptions as T[]).includes(v))
    }
    return []
  })

  // Update URL when selection changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const currentParam = params.get(paramName)

    let newParam: string | null = null

    if (selected.length === 0 || selected.length === allOptions.length) {
      // If no selection or all selected, remove parameter
      newParam = null
    } else {
      // Add selected items to URL
      newParam = selected.join(',')
    }

    // Only update URL if parameter actually changed
    if (currentParam !== newParam) {
      if (newParam === null) {
        params.delete(paramName)
      } else {
        params.set(paramName, newParam)
      }

      // Update URL without causing a page reload
      const newUrl = params.toString() ? `?${params.toString()}` : ''
      router.push(`${window.location.pathname}${newUrl}`, { scroll: false })
    }
  }, [selected, paramName, allOptions, router, searchParams])

  const handleToggle = (value: T) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    )
  }

  return {
    selected,
    setSelected,
    handleToggle,
    hasFilters: selected.length > 0,
  }
}

// Single-select hook (for dropdowns)
export function useSingleFilterState<T extends string | number>({
  paramName,
  allOptions,
}: UseFilterStateOptions): UseSingleFilterStateReturn<T> {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selected, setSelected] = useState<T | null>(() => {
    const param = searchParams.get(paramName)
    if (param) {
      const value = typeof allOptions[0] === 'number' ? Number(param) : param
      return (allOptions as T[]).includes(value as T) ? (value as T) : null
    }
    return null
  })

  // Update URL when selection changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const currentParam = params.get(paramName)

    const newParam = selected ? selected.toString() : null

    // Only update URL if parameter actually changed
    if (currentParam !== newParam) {
      if (newParam === null) {
        params.delete(paramName)
      } else {
        params.set(paramName, newParam)
      }

      // Update URL without causing a page reload
      const newUrl = params.toString() ? `?${params.toString()}` : ''
      router.push(`${window.location.pathname}${newUrl}`, { scroll: false })
    }
  }, [selected, paramName, router, searchParams])

  const handleChange = (value: T | null) => {
    setSelected(value)
  }

  return {
    selected,
    setSelected,
    handleChange,
    hasFilters: selected !== null,
  }
}
