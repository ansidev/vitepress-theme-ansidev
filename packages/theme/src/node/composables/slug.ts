import { useMarkdownFrontmatter } from './markdown'
import type { Frontmatter, FrontmatterToString, Pattern, StringOrFrontmatterToString } from './types'

export const useSlug = (str: string) => {
  const s = str.replace(/#/, '-sharp-').replace(/\./, '-dot-').replace(/-$/, '')
  return s
    .toLowerCase()
    .normalize('NFD') // Decompose Unicode characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
    .replace(/đ/g, 'd') // Handle Vietnamese "đ"
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with dashes
    .replace(/^-+|-+$/g, '') // Remove leading or trailing dashes
}

export const useSlugFilter = (slug: string) => (str: string) => useSlug(str) === slug

export const useSlugFromMarkdownFrontMatter = (
  pattern: Pattern,
  frontmatterKeyOrMappingFn: StringOrFrontmatterToString,
  excerptSeparator: string = '---',
) => {
  const frontMatters = useMarkdownFrontmatter(pattern, excerptSeparator)
  const _frontmatterMappingFn: FrontmatterToString =
    typeof frontmatterKeyOrMappingFn === 'string'
      ? (frontMatter: Frontmatter) => frontMatter[frontmatterKeyOrMappingFn] as string
      : frontmatterKeyOrMappingFn

  const arr: string[] = frontMatters.flatMap(_frontmatterMappingFn)

  const set = [...new Set(arr)]
  const slugs = set.map((str: string) => {
    const slug = useSlug(str)
    if ('index' === slug) {
      console.warn("[WARN] Generated routes contain the reserved route 'index'.")
    }
    return { params: { slug } }
  })
  // console.log(slugs)
  return slugs
}
