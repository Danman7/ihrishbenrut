'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { IoIosArrowDown, IoIosArrowForward, IoMdClose } from 'react-icons/io'
import { Checkbox } from './Checkbox'

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
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isFiltersMenuOpen, setIsFiltersMenuOpen] = useState(false)

  // Initialize selected topics from URL params or default to no topics
  const [selectedTopics, setSelectedTopics] = useState<string[]>(() => {
    const topicsParam = searchParams.get('topics')
    if (topicsParam) {
      return topicsParam.split(',').filter((t) => topics.includes(t))
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

  // Update URL when selected topics or authors change
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const currentTopicsParam = params.get('topics')
    const currentAuthorsParam = params.get('authors')

    let newTopicsParam: string | null = null
    let newAuthorsParam: string | null = null

    if (
      selectedTopics.length === 0 ||
      selectedTopics.length === topics.length
    ) {
      // If no topics selected or all topics selected, remove the parameter
      newTopicsParam = null
    } else {
      // Add selected topics to URL
      newTopicsParam = selectedTopics.join(',')
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
      currentTopicsParam !== newTopicsParam ||
      currentAuthorsParam !== newAuthorsParam
    ) {
      if (newTopicsParam === null) {
        params.delete('topics')
      } else {
        params.set('topics', newTopicsParam)
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
  }, [selectedTopics, selectedAuthors, router, searchParams, topics, authors])

  const handleTopicsChange = (topicName: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topicName)
        ? prev.filter((t) => t !== topicName)
        : [...prev, topicName]
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
    setSelectedTopics([])
    setSelectedAuthors([])
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

        {(selectedTopics.length > 0 || selectedAuthors.length > 0) && (
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
            animate={{ height: 440 }}
            exit={{ height: 0 }}
          >
            <fieldset className="border border-foreground p-4 rounded-md">
              <legend className="text-lg">Само по следните теми</legend>

              <div
                className="flex flex-wrap gap-4"
                role="group"
                aria-labelledby="topics-legend"
              >
                {topics.map((topicName) => {
                  const isAvailable = availableTopics.includes(topicName)
                  const isSelected = selectedTopics.includes(topicName)

                  // Hide unavailable topics unless they are selected
                  if (!isAvailable && !isSelected) {
                    return null
                  }

                  return (
                    <div
                      key={topicName}
                      className={!isAvailable ? 'opacity-50' : ''}
                    >
                      <Checkbox
                        id={`topic-${topicName}`}
                        name={`topic-${topicName}`}
                        label={topicName}
                        checked={isSelected}
                        onChange={() => handleTopicsChange(topicName)}
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
                aria-labelledby="authors-legend"
              >
                {authors.map((authorName) => {
                  const isAvailable = availableAuthors.includes(authorName)
                  const isSelected = selectedAuthors.includes(authorName)

                  // Hide unavailable authors unless they are selected
                  if (!isAvailable && !isSelected) {
                    return null
                  }

                  return (
                    <div
                      key={authorName}
                      className={!isAvailable ? 'opacity-50' : ''}
                    >
                      <Checkbox
                        key={authorName}
                        id={`author-${authorName}`}
                        name={`author-${authorName}`}
                        label={authorName}
                        checked={isSelected}
                        onChange={() => handleAuthorsChange(authorName)}
                        disabled={!isAvailable && !isSelected}
                      />
                    </div>
                  )
                })}
              </div>
            </fieldset>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
