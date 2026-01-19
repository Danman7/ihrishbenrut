import 'server-only'

import { flattenRoutes, getRoutesFrom } from '@/lib/routes'

export type RouteLookup = (title: string, fallback?: string) => string

const normalizeKey = (value: string) => value.trim().toLowerCase()

const buildRouteMap = (root: string) => {
  const items = flattenRoutes(getRoutesFrom(root))
  const map = new Map<string, string>()

  for (const item of items) {
    map.set(normalizeKey(item.title), item.href)
  }

  return map
}

export const createRouteLookup = (root: string): RouteLookup => {
  const map = buildRouteMap(root)

  return (title: string, fallback = '#') =>
    map.get(normalizeKey(title)) ?? fallback
}
