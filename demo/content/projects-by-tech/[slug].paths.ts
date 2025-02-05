import { useMarkdownFrontmatterRoute } from 'vitepress-theme-ansidev/composables'

// projects-by-tech/[slug].paths.js
export default useMarkdownFrontmatterRoute('demo/content/projects/**/!(index).md', 'techs')
