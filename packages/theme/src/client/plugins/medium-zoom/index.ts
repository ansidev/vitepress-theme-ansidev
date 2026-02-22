import mediumZoom from 'medium-zoom'

declare module 'medium-zoom' {
  interface Zoom {
    refresh: (selector?: string) => void
  }
}

export type MediumZoomPluginConfig = {
  selector: string
  zoomOptions?: string
  delay?: number
}

/**
 * Inject medium zoom instance
 */
export const useMediumZoom = (config: MediumZoomPluginConfig): void => {
  if (!config.selector) {
    return
  }

  const zoom = mediumZoom(config.zoomOptions)
  zoom.refresh = (sel = config.selector) => {
    zoom.detach()
    zoom.attach(sel)
  }

  setTimeout(() => zoom.refresh(config.selector), config.delay || 1000)
}
