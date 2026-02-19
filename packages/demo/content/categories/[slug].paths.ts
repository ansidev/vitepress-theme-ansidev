import { useMarkdownFrontmatterRoute } from '@ansidev-oss/vitepress-theme-ansidev/composables'

// categories/[slug].paths.js
export default useMarkdownFrontmatterRoute('content/posts/**/!(index).md', 'categories')
