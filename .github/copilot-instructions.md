# Copilot instructions for this repo

## Project overview

- Next.js App Router site with sections: books, prayers, wisdom, search. Route segments live under [app/books](app/books), [app/prayers](app/prayers), [app/wisdom](app/wisdom), [app/search](app/search).
- Section layouts use `SectionLayout` + `Header`/`SideNavigation`; see [app/ui/SectionLayout.tsx](app/ui/SectionLayout.tsx) and [app/ui/Header.tsx](app/ui/Header.tsx).
- Section navigation is built server-side via `getRouteTreeForPath` in [app/actions/getRouteTree.ts](app/actions/getRouteTree.ts):
  - `/books` builds a tree from Prisma (books → chapters).
  - other sections fall back to filesystem route discovery in [lib/routes.ts](lib/routes.ts).

## Data layer and models

- PostgreSQL via Prisma; schema in [prisma/schema.prisma](prisma/schema.prisma).
- Prisma client is generated into [app/generated/prisma](app/generated/prisma) (see generator output in schema) and consumed through [lib/prisma.ts](lib/prisma.ts) which also extends with `withAccelerate`.
- Many server components query Prisma directly (e.g., [app/ui/BookChaptersList.tsx](app/ui/BookChaptersList.tsx), [app/ui/ChapterContent.tsx](app/ui/ChapterContent.tsx)).

## Filtering and search patterns

- Shared server-side filter parsing and Prisma where-clauses live in [app/utils.ts](app/utils.ts) (`parse*FilterParams`, `build*WhereClause`, `getFiltered*`).
- Client filter widgets should use `useMultiFilterState`/`useSingleFilterState` to sync URL params without reload (see [app/ui/hooks/useFilterState.ts](app/ui/hooks/useFilterState.ts)).
- Search uses `performSearch` in [app/utils.ts](app/utils.ts) and returns `SearchResult` objects for books/chapters/prayers/wisdom.
- Text rendering often uses `formatParagraphs` from [app/utils.ts](app/utils.ts) to split content into paragraphs.

## Build, lint, and data workflows

- Dev server: `npm run dev` (uses Turbopack).
- Build: `npm run build` (runs `prisma generate` first).
- Lint: `npm run lint` (TypeScript `--noEmit` + ESLint).
- Seed DB: `npx prisma db seed` (configured to run [prisma/seed.ts](prisma/seed.ts) via `tsx` in package.json).
- Prisma client must be regenerated after schema changes (handled in build, or run `npx prisma generate`).

## Seed content formatting

- For long text in seed data, keep each paragraph as a separate string in a `text: [ ... ]` array and end with `.join('\n\n')` (see [prisma/seed.ts](prisma/seed.ts)).
- When inserting new paragraphs, preserve this pattern instead of using a raw multiline string so `formatParagraphs` can split content consistently.

## UI and client components

- Animated lists use `motion/react` in client components (e.g., [app/ui/PrayersList.tsx](app/ui/PrayersList.tsx), [app/ui/WisdomList.tsx](app/ui/WisdomList.tsx)).
- Prefer server components by default; add `'use client'` only when using hooks or animation.
