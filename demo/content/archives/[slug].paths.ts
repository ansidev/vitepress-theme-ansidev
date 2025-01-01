import { useArchiveRoute } from 'vitepress-theme-ansidev/composables'

// archives/[slug].paths.js
export default useArchiveRoute('demo/content/posts/**/!(index).md', '<!-- more -->')
