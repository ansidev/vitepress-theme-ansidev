import { useArchiveRoute } from '@ansidev-oss/vitepress-theme-ansidev/composables'

// archives/[slug].paths.js
export default useArchiveRoute('content/posts/**/!(index).md', '<!-- more -->')
