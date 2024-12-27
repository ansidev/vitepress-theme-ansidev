import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'
import { Feed } from 'feed'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const baseURL = process.env.VITE_BASE_URL || ''

const feed = new Feed({
  title: 'ansidev\'s blog',
  description: 'Blog of ansidev',
  id: baseURL,
  link: baseURL,
  language: 'en',
  image: `${baseURL}/pwa-512x512.png`,
  favicon: `${baseURL}/favicon.ico`,
  author: {
    name: 'ansidev',
    email: 'ansidev@gmail.com',
    link: baseURL,
  },
  copyright:
    'Copyright (c) 2019-present, Le Minh Tri (@ansidev)',
})

interface Post {
  title: string
  href: string
  date: any
  excerpt?: string
  type: string
  data?: object
}

const formatDate = (date: any) => {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }
  return {
    time: +date,
    string: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }
}

const getCustomPosts = (postType: string, relativePath: string, baseSlug: string, asFeed: boolean) => {
  const postDir = path.resolve(__dirname, relativePath)
  return fs
    .readdirSync(postDir)
    .map((file: string) => {
      const src = fs.readFileSync(path.join(postDir, file), 'utf-8')
      const { data, excerpt } = matter(src, { excerpt: true })
      const post: Post = {
        title: data.title,
        href: `${baseSlug}/${file.replace(/\.md$/, '')}`,
        date: typeof data.date !== 'undefined' ? formatDate(data.date) : undefined,
        excerpt,
        type: postType,
      }
      if (asFeed) {
        // only attach these when building the RSS feed to avoid bloating the
        // client bundle size
        post.data = data
      }
      return post
    })
    .sort((a: { date: { time: number } }, b: { date: { time: number } }) => b.date.time - a.date.time)
}

const getPosts = (asFeed = false) => {
  return getCustomPosts('post', '../pages/posts', '/posts', asFeed)
}

getPosts(true).forEach((post: any) => {
  const file = path.resolve(__dirname, `../../dist${post.href}.html`)
  const rendered = fs.readFileSync(file, 'utf-8')
  const content = rendered.match(
    /<!--\[--><div class="theme-ansidev-content[^<>]+>([\s\S]*)<\/div><!--\]--><\/div><div id=\"eop\"><\/div>/,
  )

  feed.addItem({
    title: post.title,
    id: `${baseURL}${post.href}`,
    link: `${baseURL}${post.href}`,
    description: post.excerpt,
    content: content?.[1],
    author: [
      {
        name: post.data.author,
        link: post.data.twitter
          ? `https://twitter.com/${post.data.twitter}`
          : undefined,
      },
    ],
    date: post.data.date,
  })
})

fs.writeFileSync(path.resolve(__dirname, '../../dist/feed.rss'), feed.rss2())
// eslint-disable-next-line no-console
console.log('[feed-generator] Generated feed.rss successfully!')
