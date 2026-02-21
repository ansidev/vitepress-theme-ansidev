<script setup lang='ts'>
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import DonationWidget from '../components/DonationWidget.vue'
import Footer from '../components/Footer.vue'
import LocaleSwitcher from '../components/LocaleSwitcher.vue'
import SharingWidget from '../components/SharingWidget.vue'

const { Layout: DefaultLayout } = DefaultTheme
const { frontmatter } = useData()
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
.VPDoc.has-aside .aside-container {
  z-index: var(--vp-z-index-sidebar);
}
</style>
