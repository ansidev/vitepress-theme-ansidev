import type * as Swetrix from 'swetrix'

export interface SwetrixOptions {
  /**
   * The Swetrix ID.
   *
   * @default process.env.VITE_SWETRIX_ID
   */
  id: string
  options?: Swetrix.LibOptions
}
