export interface SearchResult {
  id: string
  title: string
  type: 'book' | 'chapter' | 'prayer' | 'wisdom'
  content: string
  href: string
  metadata?: {
    author?: string
    series?: string[]
    source?: string
    topics?: string[]
    bookTitle?: string
    chapterNumber?: number
  }
}

export interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export interface SearchFilters {
  type?: ('book' | 'chapter' | 'prayer' | 'wisdom')[]
}
