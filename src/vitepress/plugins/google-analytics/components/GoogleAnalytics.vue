<script setup lang="ts">
import { onMounted } from 'vue'
import type { GoogleAnalyticsOptions } from '../../../config'

declare const dataLayer: any[]
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

if (googleAnalyticsOptions) {
  onMounted(init)
}
</script>

<template />
