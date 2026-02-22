<script setup lang="ts">
import * as Swetrix from 'swetrix'
import { onMounted } from 'vue'
import { SwetrixOptions } from '..'

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
  swetrix: SwetrixOptions
}>()

const pluginOptions = props.swetrix

let isInitialized = false

function init() {
  if (typeof window === 'undefined') {
    return
  }

  if (!isInitialized) {
    isInitialized = true
    Swetrix.init(pluginOptions.id, pluginOptions.options)
    Swetrix.trackViews()
    Swetrix.trackErrors()
  }
}

if (pluginOptions?.id) {
  onMounted(init)
}
</script>

<template />
