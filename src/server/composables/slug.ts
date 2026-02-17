import { useMarkdownFrontmatter, type FrontmatterRecord } from './markdown.js'

export type RouteSlug = { params: { slug: string } }

type FrontmatterMapper = ((frontMatter: FrontmatterRecord) => string | string[]) | string

export const useSlug = (str: string): string => {
  const s = str.replace(/#/, '-sharp-').replace(/\./, '-dot-').replace(/-$/, '')

  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const useSlugFilter = (slug: string) => (str: string): boolean => useSlug(str) === slug

export const useSlugFromMarkdownFrontMatter = (
  pattern: string,
  frontmatterMappingFn: FrontmatterMapper,
  excerptSeparator = '---'
): RouteSlug[] => {
  const frontMatters = useMarkdownFrontmatter(pattern, excerptSeparator)
  const mappingFn =
    typeof frontmatterMappingFn === 'string'
      ? (frontMatter: FrontmatterRecord) => frontMatter[frontmatterMappingFn] as string | string[]
      : frontmatterMappingFn

  const arr = frontMatters.flatMap((frontmatter) => {
    const mapped = mappingFn(frontmatter)
    return Array.isArray(mapped) ? mapped : [mapped]
  })

  return [...new Set(arr)]
    .filter((entry): entry is string => typeof entry === 'string')
    .map((str) => {
      const slug = useSlug(str)
      if (slug === 'index') {
        console.warn("[WARN] Generated routes contain the reserved route 'index'.")
      }
      return { params: { slug } }
    })
}
