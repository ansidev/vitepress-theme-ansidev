import { useSlug } from '../../shared/composables'
import { useMarkdownFrontmatter } from './markdown'
import type { Frontmatter, FrontmatterToString, Pattern, StringOrFrontmatterToString } from './types'

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

export { useSlug, useSlugFilter } from '../../shared/composables'
