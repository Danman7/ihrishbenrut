import { SetStateAction } from 'react'
import { FaSearch } from 'react-icons/fa'

export const Searchbar = ({
  searchQuery,
  isFullWidth,
  setSearchQuery,
  handleSearchSubmit,
}: {
  searchQuery: string
  isFullWidth?: boolean
  setSearchQuery: (value: SetStateAction<string>) => void
  handleSearchSubmit: (e: React.FormEvent) => void
}) => (
  <form
    onSubmit={handleSearchSubmit}
    className={`text-base! ${isFullWidth ? 'w-full mb-6 space-y-2' : 'ml-auto flex items-center justify-center gap-2 max-w-64'}`}
  >
    <input
      className="rounded border border-foreground/50 px-2 py-1 focus:border-primary focus:outline focus:outline-primary w-full"
      type="search"
      id="site-search"
      placeholder="Търсене..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    {isFullWidth ? (
      <button
        type="submit"
        className="w-full rounded bg-primary-surface px-2 py-1 font-semibold shadow-sm cursor-pointer transition-all hover:text-primary-text hover:shadow-md active:bg-primary active:text-background"
      >
        Търсене
      </button>
    ) : (
      <button
        type="submit"
        aria-label="Търсене"
        className="rounded bg-primary-surface shadow-sm cursor-pointer transition-all hover:text-primary-text hover:shadow-md active:bg-primary active:text-background w-10 h-8 flex items-center justify-center"
      >
        <FaSearch />
      </button>
    )}
  </form>
)
