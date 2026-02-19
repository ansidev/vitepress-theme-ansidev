import { useMarkdownFrontmatterRoute } from '@ansidev/vitepress-theme-ansidev/composables'

// tags/[slug].paths.js
export default useMarkdownFrontmatterRoute('content/posts/**/!(index).md', 'tags')
