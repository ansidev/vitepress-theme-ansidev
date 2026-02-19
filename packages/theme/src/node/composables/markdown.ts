import fs from 'node:fs'
import { resolve } from 'node:path'
import { globSync } from 'glob'
import matter from 'gray-matter'
import type { Frontmatter, Pattern } from './types'

export const useMarkdownFrontmatter = (pattern: Pattern, excerptSeparator: string = '---'): Array<Frontmatter> => {
  const files = globSync(pattern, { ignore: ['node_modules/**', '.git/**'] })
  return files.map((file) => {
    const src = fs.readFileSync(resolve(file), 'utf-8')
    const { data, excerpt } = matter(src, { excerpt: true, excerpt_separator: excerptSeparator })
    return { ...data, excerpt }
  })
}
