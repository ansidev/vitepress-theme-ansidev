import { type FrontmatterRecord } from './markdown.js'
import { useSlugFromMarkdownFrontMatter } from './slug.js'

export const useMarkdownFrontmatterRoute = (
  pattern: string,
  frontMatterMappingFn: ((frontMatter: FrontmatterRecord) => string | string[]) | string,
  excerptSeparator = '---'
) => {
  return {
    paths() {
      return useSlugFromMarkdownFrontMatter(pattern, frontMatterMappingFn, excerptSeparator)
    }
  }
}

export const useArchiveRoute = (pattern: string, excerptSeparator = '---') => {
  return {
    paths() {
      return useSlugFromMarkdownFrontMatter(
        pattern,
        (frontmatter) => new Date(frontmatter.date as string).getFullYear().toString(),
        excerptSeparator
      )
    }
  }
}
