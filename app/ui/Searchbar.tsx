import { SetStateAction } from 'react'
import { motion } from 'motion/react'

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
  <motion.form
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -10 }}
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
  </motion.form>
)
