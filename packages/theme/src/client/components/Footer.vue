<script setup lang="ts">
import { useData } from 'vitepress'
import { useLayout } from 'vitepress/theme'
import { computed, defineAsyncComponent } from 'vue'

const { theme, frontmatter } = useData()
const { hasSidebar } = useLayout()

const copyright = computed(() => {
  return typeof theme.value.themeFooter.copyright === 'string'
    ? theme.value.themeFooter.copyright.replace(/#\{present\}/g, new Date().getFullYear().toString())
    : theme.value.themeFooter.copyright
})

const GoogleAnalytics = theme.value.googleAnalytics
  ? defineAsyncComponent(() => import('../plugins/google-analytics/components/GoogleAnalytics.vue'))
  : () => null

const Donation = theme.value.donation
  ? defineAsyncComponent(() => import('../plugins/donation/components/Donation.vue'))
  : () => null
</script>

<template>
  <div class="flex flex-wrap space-x-4 py-4 items-center justify-center">
    <Donation :donation="theme.donation" />
  </div>
  <footer
    v-if="theme.themeFooter && frontmatter.themeFooter !== false"
    class="VPFooter"
    :class="{ 'has-sidebar': hasSidebar }"
  >
    <div class="container">
      <p
        v-if="theme.themeFooter.message"
        class="message"
        v-html="theme.themeFooter.message"
      ></p>
      <p v-if="copyright" class="copyright" v-html="copyright"></p>
    </div>
  </footer>
  <GoogleAnalytics :google-analytics="theme.googleAnalytics" />
</template>

<style scoped>
.VPFooter {
  position: relative;
  z-index: var(--vp-z-index-footer);
  border-top: 1px solid var(--vp-c-gutter);
  padding: 32px 24px;
  background-color: var(--vp-c-bg);
}

.VPFooter.has-sidebar {
  display: none;
}

.VPFooter :deep(a) {
  text-decoration-line: underline;
  text-underline-offset: 2px;
  transition: color 0.25s;
}

.VPFooter :deep(a:hover) {
  color: var(--vp-c-text-1);
}

@media (min-width: 768px) {
  .VPFooter {
    padding: 32px;
  }
}

.container {
  margin: 0 auto;
  max-width: var(--vp-layout-max-width);
  text-align: center;
}

.message,
.copyright {
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}
</style>
