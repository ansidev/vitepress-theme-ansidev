import { useMarkdownFrontmatterRoute } from '@ansidev/vitepress-theme-ansidev/composables'

// categories/[slug].paths.js
export default useMarkdownFrontmatterRoute('content/posts/**/!(index).md', 'categories')
