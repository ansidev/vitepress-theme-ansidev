import { useMarkdownFrontmatter } from './markdown.js'

export const useSlug = (str) => {
  const s = str.replace(/#/, '-sharp-').replace(/\./, '-dot-').replace(/-$/, '')
  return s
  .toLowerCase()
  .normalize('NFD') // Decompose Unicode characters
  .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
  .replace(/đ/g, 'd') // Handle Vietnamese "đ"
  .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with dashes
  .replace(/^-+|-+$/g, ''); // Remove leading or trailing dashes
}

export const useSlugFilter = slug => str => useSlug(str) === slug

export const useSlugFromMarkdownFrontMatter = (pattern, frontmatterMappingFn, excerptSeparator = '---') => {
  const frontMatters = useMarkdownFrontmatter(pattern, excerptSeparator)
  const _frontmatterMappingFn = typeof frontmatterMappingFn === 'string' ? (frontMatter => frontMatter[frontmatterMappingFn]) : frontmatterMappingFn
  const arr = frontMatters.flatMap(_frontmatterMappingFn)

  const set = [...new Set(arr)]
  const slugs = set.map(str => {
    const slug = useSlug(str)
    if ('index' === slug) {
      console.warn("[WARN] Generated routes contain the reserved route 'index'.")
    }
    return { params: { slug } }
  })
  // console.log(slugs)
  return slugs
}
