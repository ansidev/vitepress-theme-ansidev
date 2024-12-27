export interface Post {
  type: string
  title: string
  author: string
  gravatar: string
  twitter: string
  url?: string
  date: Date
  excerpt: string | undefined
  categories: string[]
  tags: string[]
}
