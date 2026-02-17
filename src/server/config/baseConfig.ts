import { fileURLToPath, URL } from 'node:url'
import { loadEnv, type UserConfig } from 'vitepress'

process.env.VITE_EXTRA_EXTENSIONS = 'rss'

;(globalThis as typeof globalThis & { __VUE_PROD_DEVTOOLS__?: boolean }).__VUE_PROD_DEVTOOLS__ =
  process.env.NODE_ENV === 'development'

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), 'VITE_')
const siteURL = env.VITE_BASE_URL

const deps = ['vitepress-theme-ansidev']

const config: UserConfig = {
  themeConfig: {
    siteURL,
    googleAnalytics: {
      id: env.VITE_GA_ID
    },
    search: {
      provider: 'local',
      options: {
        async _render(src: string, env: { frontmatter?: Record<string, unknown> }, md: { renderAsync: (source: string, e: { frontmatter?: Record<string, unknown> }) => Promise<string> }) {
          const html = await md.renderAsync(src, env)
          if (env.frontmatter?.search === false) return ''
          let renderedHtml = ''
          if (env.frontmatter?.title) {
            renderedHtml += `<h1>${env.frontmatter.title} <a href="#">&#8203;</a></h1>`
          }
          if (html.length > 0) {
            renderedHtml += html
          }
          return renderedHtml
        }
      }
    }
  },
  vite: {
    ssr: {
      noExternal: deps
    },
    optimizeDeps: {
      exclude: deps
    },
    css: {
      preprocessorOptions: {
        scss: {}
      }
    },
    resolve: {
      alias: [
        {
          find: /^.*\/VPFooter\.vue$/,
          replacement: fileURLToPath(new URL('../../client/vitepress/components/EmptyFooter.vue', import.meta.url))
        }
      ]
    }
  }
}

export default config
