import { WisdomPageProps } from '@/app/types/wisdom'
import AnimatedWrapper from '@/app/ui/AnimatedWrapper'
import { WisdomFilters } from '@/app/ui/WisdomFilters'
import WisdomList from '@/app/ui/WisdomList'
import {
  getFilteredWisdom,
  getWisdomFilterOptions,
  parseWisdomFilterParams,
} from '@/app/utils'
import { GiScrollUnfurled } from 'react-icons/gi'

export default async function Wisdom({ searchParams }: WisdomPageProps) {
  const { selectedTopics, selectedAuthors } =
    parseWisdomFilterParams(searchParams)

  // Fetch wisdom and filter options in parallel
  const [wisdom, { uniqueTopics, uniqueAuthors }] = await Promise.all([
    getFilteredWisdom(selectedTopics, selectedAuthors),
    getWisdomFilterOptions(),
  ])

  return (
    <AnimatedWrapper>
      <article className="max-w-4xl mx-auto">
        <h1 className="flex gap-2 justify-center items-center text-5xl font-bold font-serif mt-8 mb-10">
          <GiScrollUnfurled />
          Мъдрости
        </h1>

        <WisdomFilters topics={uniqueTopics} authors={uniqueAuthors} />

        <WisdomList filteredWisdom={wisdom} />
      </article>
    </AnimatedWrapper>
  )
}
