import { SetStateAction } from 'react'

export const Searchbar = ({
  searchQuery,
  isMobile,
  setSearchQuery,
  handleSearchSubmit,
}: {
  searchQuery: string
  isMobile?: boolean
  setSearchQuery: (value: SetStateAction<string>) => void
  handleSearchSubmit: (e: React.FormEvent) => void
}) => (
  <form
    onSubmit={handleSearchSubmit}
    className={isMobile ? 'w-full' : 'hidden lg:block ml-auto w-72'}
  >
    <input
      className="rounded-md border border-foreground px-2 py-1 focus:border-primary focus:outline focus:outline-primary w-full"
      type="search"
      id="site-search"
      placeholder="Търсене..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </form>
)
