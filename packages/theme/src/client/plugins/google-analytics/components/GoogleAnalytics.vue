<script setup lang="ts">
import { onMounted } from 'vue'
import { GoogleAnalyticsOptions } from '..'

// biome-ignore lint/suspicious/noExplicitAny: ignore check for this line
declare const dataLayer: any[]
// biome-ignore lint/suspicious/noExplicitAny: ignore check for this line
declare const gtag: (...args: any[]) => void
declare global {
  interface Window {
    dataLayer?: typeof dataLayer
    gtag?: typeof gtag
  }
}

const props = defineProps<{
  googleAnalytics: GoogleAnalyticsOptions
}>()

const googleAnalyticsOptions = props.googleAnalytics

let isInitialized = false

function init() {
  if (window.dataLayer && window.gtag) {
    return
  }

  if (!isInitialized) {
    isInitialized = true
    const externalScript = document.createElement('script')
    externalScript.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsOptions.id}`
    externalScript.async = true
    document.head.appendChild(externalScript)

    const inlineScript = document.createElement('script')
    inlineScript.textContent = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${googleAnalyticsOptions.id}');
`
    document.head.appendChild(inlineScript)
  }
}

function scheduleInit() {
  const start = () => {
    // Defer loading until the user interacts with the page (or the tab has
    // been open for 30s) so analytics never competes with critical
    // rendering / interaction on the initial navigation.
    const idle = () => {
      if (typeof (window as any).requestIdleCallback === 'function') {
        ;(window as any).requestIdleCallback(() => init(), { timeout: 5000 })
      } else {
        setTimeout(init, 3000)
      }
    }

    const events: Array<keyof DocumentEventMap> = [
      'keydown',
      'pointerdown',
      'pointermove',
      'scroll',
      'touchstart'
    ]
    const onFirstInteraction = () => {
      events.forEach((event) =>
        document.removeEventListener(event, onFirstInteraction)
      )
      idle()
    }
    events.forEach((event) =>
      document.addEventListener(event, onFirstInteraction, {
        once: true,
        passive: true
      })
    )
    // Fallback for sessions with no interaction at all.
    setTimeout(onFirstInteraction, 30000)
  }

  if (document.readyState === 'complete') {
    start()
  } else {
    window.addEventListener('load', start, { once: true })
  }
}

if (googleAnalyticsOptions) {
  onMounted(scheduleInit)
}
</script>

<template />
