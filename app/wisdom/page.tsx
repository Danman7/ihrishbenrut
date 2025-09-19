import { WisdomPageProps } from '@/app/types/wisdom'
import AnimatedWrapper from '@/app/ui/AnimatedWrapper'
import { WisdomFilters } from '@/app/ui/WisdomFilters'
import WisdomList from '@/app/ui/WisdomList'
import WisdomNavigation from '@/app/ui/WisdomNavigation'
import {
  getFilteredWisdom,
  getContextualWisdomFilterOptions,
  parseWisdomFilterParams,
} from '@/app/utils'
import { GiScrollUnfurled } from 'react-icons/gi'

export default async function Wisdom({ searchParams }: WisdomPageProps) {
  const { selectedTopics, selectedAuthors, cursor, direction } =
    parseWisdomFilterParams(searchParams)

  // Fetch wisdom and filter options in parallel
  const [wisdomResult, filterOptions] = await Promise.all([
    getFilteredWisdom(selectedTopics, selectedAuthors, cursor, direction),
    getContextualWisdomFilterOptions(selectedTopics, selectedAuthors),
  ])

  return (
    <AnimatedWrapper>
      <article className="max-w-4xl mx-auto">
        <h1 className="flex gap-2 justify-center items-center text-5xl font-bold font-serif mt-8 mb-10">
          <GiScrollUnfurled />
          Мъдрости
        </h1>

        <WisdomFilters
          topics={filterOptions.allTopics}
          authors={filterOptions.allAuthors}
          availableTopics={filterOptions.availableTopics}
          availableAuthors={filterOptions.availableAuthors}
        />

        <WisdomList filteredWisdom={wisdomResult.items} />

        <WisdomNavigation
          hasNext={wisdomResult.hasNext}
          hasPrev={wisdomResult.hasPrev}
          nextCursor={wisdomResult.nextCursor}
          prevCursor={wisdomResult.prevCursor}
          selectedTopics={selectedTopics}
          selectedAuthors={selectedAuthors}
        />
      </article>
    </AnimatedWrapper>
  )
}
