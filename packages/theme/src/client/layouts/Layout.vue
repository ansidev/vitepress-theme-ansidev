<script setup lang='ts'>
import { useData, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { onMounted, watch } from 'vue'
import DonationWidget from '../components/DonationWidget.vue'
import Footer from '../components/Footer.vue'
import LocaleSwitcher from '../components/LocaleSwitcher.vue'
import SharingWidget from '../components/SharingWidget.vue'
import type { MediumZoomPluginConfig } from '../plugins/medium-zoom'

const { Layout: DefaultLayout } = DefaultTheme
const { frontmatter, theme } = useData()
const route = useRoute()
let mediumZoomModule = null
if (theme.value.mediumZoom) {
  mediumZoomModule = import('../plugins/medium-zoom')
}

const initMediumZoom = async () => {
  if (mediumZoomModule) {
    const { useMediumZoom } = await mediumZoomModule
    useMediumZoom(theme.value.mediumZoom as MediumZoomPluginConfig)
  }
}

onMounted(initMediumZoom)
watch(
  () => route.path,
  (newPath, oldPath) => {
    if (newPath !== oldPath) {
      initMediumZoom()
    }
  },
)
</script>

<template>
  <DefaultLayout>
    <template #doc-before>
      <div class="vp-doc">
        <h1>{{ frontmatter.title }}</h1>
      </div>
    </template>
    <template #nav-bar-content-after>
      <LocaleSwitcher />
    </template>
    <template #aside-outline-after>
      <SharingWidget />
    </template>
    <template #aside-ads-before>
      <DonationWidget direction="vertical" />
    </template>
    <template #layout-bottom>
      <Footer />
    </template>
  </DefaultLayout>
</template>
<style lang="css">
:root {
  --vp-z-index-aside: 25;
}
.VPDoc.has-aside .aside-container {
  z-index: var(--vp-z-index-aside);
}
.medium-zoom--opened .medium-zoom-overlay {
  z-index: calc(var(--vp-z-index-aside) + 1);
}
.medium-zoom-image--opened {
  z-index: calc(var(--vp-z-index-aside) + 2);
}
</style>
