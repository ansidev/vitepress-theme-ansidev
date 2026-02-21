import type { DefaultTheme } from 'vitepress/theme'
import type { DonationPluginConfig } from '../plugins/donation'
import type { GoogleAnalyticsOptions } from '../plugins/google-analytics'

export interface ThemeConfig extends DefaultTheme.Config {
  /**
   * The site URL.
   *
   * @default process.env.VITE_BASE_URL
   */
  siteURL?: string
  googleAnalytics?: GoogleAnalyticsOptions
  donation?: DonationPluginConfig
  /**
   * The footer configuration.
   */
  themeFooter?: DefaultTheme.Footer
}

export type { DonationPluginConfig } from '../plugins/donation'
export type { GoogleAnalyticsOptions } from '../plugins/google-analytics'

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

export interface PostDate {
  time: number
  day: string
  month: string
  year: string
}

export interface Project {
  title: string
  url: string
  showcaseUrl: string
  repositoryUrl: string
  excerpt: string | undefined
  license: string
  licenseUrl: string
  developmentStatus: string
  techs: string[]
  date: Date
}
