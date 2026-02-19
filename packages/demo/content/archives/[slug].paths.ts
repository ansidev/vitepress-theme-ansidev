import { useArchiveRoute } from '@ansidev/vitepress-theme-ansidev/composables'

// archives/[slug].paths.js
export default useArchiveRoute('content/posts/**/!(index).md', '<!-- more -->')
