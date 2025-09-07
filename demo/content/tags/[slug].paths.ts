import { useMarkdownFrontmatterRoute } from 'vitepress-theme-ansidev/composables'

// tags/[slug].paths.js
export default useMarkdownFrontmatterRoute('demo/content/posts/**/!(index).md', 'tags')
