import fs from 'node:fs'
import { resolve } from 'node:path'
import matter from 'gray-matter'
import { globSync } from 'glob'

export type FrontmatterRecord = Record<string, unknown> & { excerpt?: string }

export const useMarkdownFrontmatter = (
  pattern: string,
  excerptSeparator = '---'
): FrontmatterRecord[] => {
  const files = globSync(pattern, { ignore: ['node_modules/**', '.git/**'] })

  return files.map((file) => {
    const src = fs.readFileSync(resolve(file), 'utf-8')
    const { data, excerpt } = matter(src, {
      excerpt: true,
      excerpt_separator: excerptSeparator
    })

    return { ...(data as Record<string, unknown>), excerpt }
  })
}
