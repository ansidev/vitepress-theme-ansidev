import { useSlugFromMarkdownFrontMatter } from './slug.js'

export const useMarkdownFrontmatterRoute = (pattern, frontMatterMappingFn, excerptSeparator = '---') => {
  return {
    paths() {
      return useSlugFromMarkdownFrontMatter(pattern, frontMatterMappingFn, excerptSeparator)
    }
  }
}

export const useArchiveRoute = (pattern, excerptSeparator = '---') => {
  return {
    paths() {
      return useSlugFromMarkdownFrontMatter(pattern, frontmatter => new Date(frontmatter.date).getFullYear().toString(), excerptSeparator)
    }
  }
}
