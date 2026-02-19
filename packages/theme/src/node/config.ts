// @ts-nocheck
import { fileURLToPath, URL } from 'node:url'
import { loadEnv } from 'vitepress'

process.env.VITE_EXTRA_EXTENSIONS = 'rss'
globalThis.__VUE_PROD_DEVTOOLS__ = process.env.NODE_ENV === 'development'

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), 'VITE_')

const siteURL = env.VITE_BASE_URL

/**
 * This file is intended to be required from VitePress
 * consuming project's config file.
 *
 * It runs in Node.js.
 */

// for local-linked development
const deps = ['vitepress-theme-ansidev']

/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  themeConfig: {
    siteURL,
    googleAnalytics: {
      id: env.VITE_GA_ID,
    },
    search: {
      provider: 'local',
      options: {
        /**
         * @param {string} src
         * @param {import('vitepress').MarkdownEnv} env
         * @param {import('markdown-it')} md
         */
        async _render(src, env, md) {
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
        },
      },
    },
  },
  vite: {
    ssr: {
      noExternal: deps,
    },
    optimizeDeps: {
      exclude: deps,
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    resolve: {
      alias: [
        {
          find: /^.*\/VPFooter\.vue$/,
          replacement: fileURLToPath(new URL('./components/EmptyFooter.vue', import.meta.url)),
        },
      ],
    },
  },
}

export default config
