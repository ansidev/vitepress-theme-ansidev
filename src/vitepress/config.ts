import { type DefaultTheme } from 'vitepress/theme'

export interface GoogleAnalyticsOptions {
  /**
   * The Google Analytics ID.
   *
   * @default process.env.VITE_GA_ID
   */
  id: string
}

export interface Config extends DefaultTheme.Config {
  /**
   * The site URL.
   *
   * @default process.env.VITE_BASE_URL
   */
  siteURL?: string
  googleAnalytics?: GoogleAnalyticsOptions
}
