import { PrayersPageProps } from '@/app/types/prayer'
import { FilterConfig, Filters } from '@/app/ui/Filters'
import PrayersList from '@/app/ui/PrayersList'
import {
  getFilteredPrayers,
  getContextualPrayerFilterOptions,
  parsePrayerFilterParams,
} from '@/app/utils'
import { Metadata } from 'next'
import { PiHandsPraying } from 'react-icons/pi'

export const metadata: Metadata = {
  title: 'Само Твоята Воля | Молитви',
}

export default async function Prayers({ searchParams }: PrayersPageProps) {
  const { selectedSeries, selectedSources } =
    await parsePrayerFilterParams(searchParams)

  // Fetch prayers and filter options in parallel
  const [prayers, filterOptions] = await Promise.all([
    getFilteredPrayers(selectedSeries, selectedSources),
    getContextualPrayerFilterOptions(selectedSeries, selectedSources),
  ])

  const filterConfigs: FilterConfig[] = [
    {
      type: 'multi',
      paramName: 'series',
      title: 'Само от следните поредици',
      idPrefix: 'series',
      options: filterOptions.allSeries,
      availableOptions: filterOptions.availableSeries,
    },
    {
      type: 'multi',
      paramName: 'sources',
      title: 'Само от следните източници',
      idPrefix: 'source',
      options: filterOptions.allSources,
      availableOptions: filterOptions.availableSources,
    },
  ]

  return (
    <>
      <article className="max-w-4xl mx-auto">
        <section>
          <h1 className="flex gap-4 justify-center items-center font-bold my-16">
            <PiHandsPraying /> Молитви
          </h1>

          <p>
            Най-хубавото упражнение в живота на човека е молитвата. За сега, в
            света, по-хубаво упражнение от молитвата няма.
          </p>
          <p className="font-bold text-right!">Учителят</p>

          <Filters configs={filterConfigs} />

          <hr className="text-border" />

          <PrayersList filteredPrayers={prayers} />
        </section>
      </article>
    </>
  )
}
