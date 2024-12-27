import { type DefaultTheme } from 'vitepress/theme'

export interface Config extends DefaultTheme.Config {
  /**
   * The site URL.
   *
   * @default process.env.VITE_BASE_URL
   */
  siteURL?: string
}
