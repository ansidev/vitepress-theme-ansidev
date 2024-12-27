import { createContentLoader } from 'vitepress'
import type { Post } from 'vitepress-theme-ansidev'

declare const data: Post[]
export { data }

export default createContentLoader('posts/**/!(index).md', {
  excerpt: '<!-- more -->',
  transform(raw): Post[] {
    return raw
      .map(({ url, frontmatter, excerpt }) => ({
        type: frontmatter.type,
        title: frontmatter.title,
        author: frontmatter.author,
        gravatar: frontmatter.gravatar,
        twitter: frontmatter.twitter,
        url,
        excerpt: excerpt?.replace("<p>", "").replace("</p>\n", ""),
        date: new Date(frontmatter.date as string),
        categories: frontmatter.categories,
        tags: frontmatter.tags,
      }))
      .sort((a: Post, b: Post) => b.date.getTime() - a.date.getTime())
  }
})
