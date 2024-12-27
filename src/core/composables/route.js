import { useSlugFromMarkdownFrontMatter } from './slug.js'

export const useMarkdownFrontmatterRoute = (pattern, frontMatterProperty, excerptSeparator = '---') => {
  return {
    paths() {
      return useSlugFromMarkdownFrontMatter(pattern, frontMatterProperty, excerptSeparator)
    }
  }
}
