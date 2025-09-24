import { PrayersPageProps } from '@/app/types/prayer'
import AnimatedWrapper from '@/app/ui/AnimatedWrapper'
import { PrayerFilters } from '@/app/ui/PrayerFilters'
import PrayersList from '@/app/ui/PrayersList'
import {
  getFilteredPrayers,
  getContextualPrayerFilterOptions,
  parsePrayerFilterParams,
} from '@/app/utils'
import { PiHandsPraying } from 'react-icons/pi'

export default async function Prayers({ searchParams }: PrayersPageProps) {
  const { selectedSeries, selectedSources } =
    await parsePrayerFilterParams(searchParams)

  // Fetch prayers and filter options in parallel
  const [prayers, filterOptions] = await Promise.all([
    getFilteredPrayers(selectedSeries, selectedSources),
    getContextualPrayerFilterOptions(selectedSeries, selectedSources),
  ])

  return (
    <AnimatedWrapper>
      <article className="max-w-4xl mx-auto">
        <h1 className="flex gap-2 justify-center items-center text-5xl font-bold font-serif mt-8 mb-10">
          <PiHandsPraying /> Молитви
        </h1>

        <PrayerFilters
          series={filterOptions.allSeries}
          sources={filterOptions.allSources}
          availableSeries={filterOptions.availableSeries}
          availableSources={filterOptions.availableSources}
        />

        <PrayersList filteredPrayers={prayers} />
      </article>
    </AnimatedWrapper>
  )
}
