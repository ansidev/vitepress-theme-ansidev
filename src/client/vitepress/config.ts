import { type DefaultTheme } from 'vitepress/theme'
import type { DonationPluginConfig } from './plugins/donation/index.js'

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
  donation?: DonationPluginConfig
}
