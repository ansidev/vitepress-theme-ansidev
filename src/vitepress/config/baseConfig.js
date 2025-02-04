import { fileURLToPath, URL } from 'node:url'
import { loadEnv } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'

process.env.VITE_EXTRA_EXTENSIONS = 'rss'
globalThis.__VUE_PROD_DEVTOOLS__ = process.env.NODE_ENV === 'development'

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), 'VITE_')

const siteURL = env.VITE_BASE_URL

// @ts-check

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
        scss: {
          api: 'modern-compiler'
        }
      }
    },
    plugins: [
      tailwindcss(),
    ],
    resolve: {
      alias: [
        {
          find: /^.*\/VPFooter\.vue$/,
          replacement: fileURLToPath(
            new URL('../components/EmptyFooter.vue', import.meta.url)
          )
        }
      ]
    }
  },
}

export default config
