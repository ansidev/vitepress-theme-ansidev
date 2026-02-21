export declare interface SharingPluginConfig {
  networks?: string[]
  displayMode?: string
  buttonSize?: number
  iconSize?: number
  iconStyle?: string
}

export type SharingButtonComponentProps = {
  /**
   * URL to share
   * @type string
   */
  url: string
  /**
   * Share text
   * @type string
   */
  text: string
  /**
   * Social network
   * @type string
   */
  network: string
  /**
   * Button size
   * @type number
   */
  buttonSize: number
  /**
   * Icon style
   * @type string
   */
  iconStyle: string
  /**
   * Icon size
   * @type number
   * @default 32
   */
  iconSize?: number
  /**
   * Display mode
   * @type string
   * @default icon
   */
  displayMode?: string
}

export type SharingComponentProps = {
  /**
   * URL to share
   * @type string
   */
  url: string,
  /**
   * Share text
   * @type string
   */
  text: string,
}

export const useUrlQueryParamsBuilder = (params: Record<string, string | undefined> | undefined): string => {
  if (!params) {
    return ''
  }
  const esc = encodeURIComponent
  const paramKeys = Object.keys(params)
  if (paramKeys.length < 1)
    return ''

  const s = paramKeys
    .filter((key) => params[key] !== undefined)
    .map((key: string) => `${esc(key)}=${esc(params[key] as string)}`)
    .join('&')

  return `?${s}`
}
