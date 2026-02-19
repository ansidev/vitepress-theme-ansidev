import { useSlugFromMarkdownFrontMatter } from './slug'
import type { Frontmatter, Pattern } from './types'

export const useMarkdownFrontmatterRoute = (
  pattern: Pattern,
  frontmatterKey: string,
  excerptSeparator: string = '---',
) => {
  return {
    paths() {
      return useSlugFromMarkdownFrontMatter(pattern, frontmatterKey, excerptSeparator)
    },
  }
}

export const useArchiveRoute = (pattern: Pattern, excerptSeparator: string = '---') => {
  return {
    paths() {
      return useSlugFromMarkdownFrontMatter(
        pattern,
        (frontmatter: Frontmatter) => new Date(frontmatter.date as string).getFullYear().toString(),
        excerptSeparator,
      )
    },
  }
}
