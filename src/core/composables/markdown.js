import { resolve } from 'node:path'
import fs from 'fs'
import matter from 'gray-matter'
import { globSync } from 'glob'

export const useMarkdownFrontmatter = (pattern, excerptSeparator = '---') => {
  const files = globSync(pattern, { ignore: ['node_modules/**', '.git/**'] })
  return files.map(file => {
    const src = fs.readFileSync(resolve(file), 'utf-8')
    const { data, excerpt } = matter(src, { excerpt: true, excerpt_separator: excerptSeparator })
    return { ...data, excerpt }
  })
}
