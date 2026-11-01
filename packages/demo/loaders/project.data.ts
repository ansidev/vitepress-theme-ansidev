import type { Project } from '@ansidev-oss/vitepress-theme-ansidev'
import { useExcerptHtml } from '@ansidev-oss/vitepress-theme-ansidev/composables'
import { createContentLoader } from 'vitepress'

declare const data: Project[]

export { data }

export default createContentLoader('projects/**/!(index).md', {
  excerpt: '<!-- more -->',
  transform(raw): Project[] {
    return raw
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title,
        url,
        showcaseUrl: frontmatter.showcaseUrl,
        repositoryUrl: frontmatter.repositoryUrl,
        excerpt: useExcerptHtml(excerpt),
        license: frontmatter.license,
        licenseUrl: frontmatter.licenseUrl,
        developmentStatus: frontmatter.developmentStatus,
        techs: frontmatter.techs,
        date: new Date(frontmatter.date)
      }))
      .sort((a, b) => b.date.getTime() - a.date.getTime())
  }
})
