// @ts-nocheck
import type { UserConfig } from 'vitepress'
import { loadEnv, mergeConfig } from 'vitepress'
import type { ThemeConfig } from '../client/types'

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
const deps = ['@ansidev-oss/vitepress-theme-ansidev']

/**
 * @type {import('vitepress').UserConfig}
 */
const baseConfig = {
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
  },
}

/**
 * Helper function to define theme configuration with proper typing
 * Note: TailwindCSS plugin should be added in vite.config.ts, not here
 */
export function defineWithDefaultThemeConfig(config: UserConfig<ThemeConfig> = {}): UserConfig<ThemeConfig> {
  // Rename 'footer' to 'themeFooter' to avoid conflict with VitePress built-in footer config
  if (config.themeConfig?.footer) {
    config.themeConfig = {
      ...config.themeConfig,
      themeFooter: config.themeConfig.footer,
    }
    delete config.themeConfig.footer
  }
  return mergeConfig(baseConfig, config) as UserConfig<ThemeConfig>
}

export default baseConfig
