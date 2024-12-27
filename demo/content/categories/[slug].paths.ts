import { useMarkdownFrontmatterRoute } from 'vitepress-theme-ansidev/composables'

// categories/[slug].paths.js
export default useMarkdownFrontmatterRoute('demo/content/posts/**/!(index).md', 'categories')
