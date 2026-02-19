export type Pattern = string | string[]
export type Frontmatter = Record<string, unknown> & {
  date?: string
  excerpt?: string
}
export type FrontmatterToString = (frontmatter: Frontmatter) => string
export type StringOrFrontmatterToString = string | FrontmatterToString
