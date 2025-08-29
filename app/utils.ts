export const isPathActive = (
  currentPath: string,
  linkPath: string
): boolean => {
  return currentPath.startsWith(linkPath)
}

// Get all parent paths for a given path
export const getParentPaths = (path: string): string[] => {
  const segments = path.split('/').filter(Boolean)
  const paths: string[] = []

  for (let i = 1; i <= segments.length; i++) {
    paths.push('/' + segments.slice(0, i).join('/'))
  }

  return paths
}

export const formatParagraphs = (content: string) =>
  content
    .split(/\r?\n\s*\r?\n/) // any blank line
    .map((p) => p.trim())
    .filter(Boolean)

export const formatBulgarianDate = (
  date: Date,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string => {
  const formatted = new Intl.DateTimeFormat('bg-BG', options).format(date)
  // Capitalize the first letter (month names start lowercase in Bulgarian)
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

export const getYearRange = (chapters: { date: Date }[]): string | null => {
  if (chapters.length === 0) return null

  const years = chapters.map((chapter) => new Date(chapter.date).getFullYear())
  const minYear = Math.min(...years)
  const maxYear = Math.max(...years)

  return minYear === maxYear ? minYear.toString() : `${minYear} - ${maxYear}`
}

export const formatDateAndLocation = (
  date: Date,
  location: string | null
): string => {
  const formattedDate = formatBulgarianDate(date)
  return location ? `${formattedDate} ${location}` : formattedDate
}
