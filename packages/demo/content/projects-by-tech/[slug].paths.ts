import { useMarkdownFrontmatterRoute } from '@ansidev-oss/vitepress-theme-ansidev/composables'

// projects-by-tech/[slug].paths.js
export default useMarkdownFrontmatterRoute('content/projects/**/!(index).md', 'techs')
