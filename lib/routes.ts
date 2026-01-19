import 'server-only'
import fs from 'node:fs'
import path from 'node:path'

export type RouteItem = {
  title: string
  href: string
  children?: RouteItem[]
  order?: number
}

export type GetRoutesOptions = {
  appDir?: string
  depth?: number
  includeDir?: (absDir: string) => boolean
  excludeDir?: (absDir: string) => boolean
  preferPageTitle?: boolean
  preferNavTitle?: boolean
}

const DEFAULT_ROUTE_FILES = new Set([
  'page.tsx',
  'page.jsx',
  'page.mdx',
  'layout.tsx',
  'template.tsx',
  'loading.tsx',
  'error.tsx',
  'route.ts',
])

const isRouteSpecialDir = (dirName: string) => {
  return (
    dirName.startsWith('@') ||
    (dirName.startsWith('(') && dirName.endsWith(')'))
  )
}

const isDynamicSegment = (dirName: string) => {
  return dirName.startsWith('[') && dirName.endsWith(']')
}

const isProbablyRouteDir = (absDir: string) => {
  try {
    const entries = fs.readdirSync(absDir, { withFileTypes: true })
    for (const e of entries) {
      if (e.isFile() && DEFAULT_ROUTE_FILES.has(e.name)) return true
    }

    return entries.some((e) => e.isDirectory() && !isRouteSpecialDir(e.name))
  } catch {
    return false
  }
}

const toTitle = (segment: string) => {
  const raw = segment.replace(/^\[|\]$/g, '') // strip brackets like [slug]
  return raw
    .split(/[-_]/g)
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ')
}

const readMetadataTitle = (absDir: string): string | null => {
  const candidates = ['page.tsx', 'page.jsx', 'page.mdx']
  for (const file of candidates) {
    const p = path.join(absDir, file)
    if (!fs.existsSync(p)) continue
    try {
      const src = fs.readFileSync(p, 'utf8')

      const m = src.match(
        /export\s+const\s+metadata[^{]*{[\s\S]*?title\s*:\s*(["'`])([\s\S]*?)\1/
      )
      if (m) return m[2].trim()
    } catch {}
  }
  return null
}

const readNavTitle = (absDir: string): string | null => {
  const candidates = ['page.tsx', 'page.jsx', 'page.mdx']
  for (const file of candidates) {
    const p = path.join(absDir, file)
    if (!fs.existsSync(p)) continue
    try {
      const src = fs.readFileSync(p, 'utf8')
      const m = src.match(
        /export\s+const\s+(navTitle|shortTitle)\s*=\s*(["'`])([\s\S]*?)\2/
      )
      if (m) return m[3].trim()
    } catch {}
  }
  return null
}

const shortenTitle = (title: string): string => {
  let s = title

  if (s.includes('|')) s = s.split('|')[0].trim()

  const idx = s.lastIndexOf(':')
  if (idx !== -1) s = s.slice(idx + 1).trim()
  return s
}

const readNavOrder = (absDir: string): number | null => {
  const candidates = ['page.tsx', 'page.jsx', 'page.mdx']
  for (const file of candidates) {
    const p = path.join(absDir, file)
    if (!fs.existsSync(p)) continue
    try {
      const src = fs.readFileSync(p, 'utf8')
      const m = src.match(/export\s+const\s+navOrder\s*=\s*(-?\d+(?:\.\d+)?)/)
      if (m) {
        const n = Number(m[1])
        if (!Number.isNaN(n)) return n
      }
    } catch {}
  }
  return null
}

function sortItems(items: RouteItem[]): RouteItem[] {
  return items
    .sort((a, b) => {
      const ao = a.order ?? Infinity
      const bo = b.order ?? Infinity
      if (ao !== bo) return ao - bo
      return a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
    })
    .map((i) => (i.children ? { ...i, children: sortItems(i.children) } : i))
}

export function getRoutesFrom(
  startRoute: string,
  opts: GetRoutesOptions = {}
): RouteItem[] {
  const appDir = opts.appDir ?? path.join(process.cwd(), 'app')
  const normStart =
    startRoute === '/' ? '/' : '/' + startRoute.replace(/^\/+|\/+$/g, '')

  const startAbs = path.join(appDir, normStart === '/' ? '' : normStart)
  if (!fs.existsSync(startAbs)) return []

  const preferTitle = opts.preferPageTitle ?? true
  const preferNav = opts.preferNavTitle ?? true

  const walk = (
    absDir: string,
    routePrefix: string,
    depth: number
  ): RouteItem[] => {
    if (opts.depth != null && depth > opts.depth) return []
    if (opts.excludeDir && opts.excludeDir(absDir)) return []
    if (opts.includeDir && !opts.includeDir(absDir)) return []

    const entries = fs.readdirSync(absDir, { withFileTypes: true })

    const children: RouteItem[] = []
    for (const e of entries) {
      if (!e.isDirectory()) continue
      if (isRouteSpecialDir(e.name)) continue
      if (isDynamicSegment(e.name)) continue
      if (e.name === 'node_modules') continue

      const childAbs = path.join(absDir, e.name)
      if (!isProbablyRouteDir(childAbs)) continue

      const href = path.posix.join(routePrefix, e.name).replace(/\\/g, '/')
      const navT = preferNav ? readNavTitle(childAbs) : null
      const metaT = preferTitle ? readMetadataTitle(childAbs) : null
      const title =
        navT ?? (metaT ? shortenTitle(metaT) : null) ?? toTitle(e.name)
      const order = readNavOrder(childAbs) ?? undefined

      const grandchildren = walk(childAbs, href, depth + 1)

      const hasChildPage = grandchildren.length > 0
      const includeSelf =
        fs.existsSync(path.join(childAbs, 'page.tsx')) ||
        fs.existsSync(path.join(childAbs, 'page.jsx')) ||
        fs.existsSync(path.join(childAbs, 'page.mdx'))

      if (includeSelf || hasChildPage) {
        children.push({
          title,
          href,
          order,
          children: grandchildren.length ? grandchildren : undefined,
        })
      }
    }

    return children
  }

  const rootItems = walk(startAbs, normStart === '/' ? '/' : normStart, 0)
  return sortItems(rootItems)
}

export function flattenRoutes(items: RouteItem[]): RouteItem[] {
  const out: RouteItem[] = []
  const dfs = (arr: RouteItem[]) => {
    for (const item of arr) {
      out.push({ title: item.title, href: item.href })
      if (item.children) dfs(item.children)
    }
  }
  dfs(items)
  return out
}
