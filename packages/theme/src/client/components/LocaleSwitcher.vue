<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { switchLocale } from '../composables/locale'

// Inline SVG instead of @iconify/vue's <Icon>: that component renders an
// empty svg during SSR and fills it in after hydration, which shows up as a
// late navbar visual change (Speed Index). This renders on the server.
const translateIconBody =
  '<g fill="currentColor"><path d="M4.545 6.714L4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z"/><path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292c.178.217.451.635.555.867c1.125-.359 2.08-.844 2.886-1.494c.777.665 1.739 1.165 2.93 1.472c.133-.254.414-.673.629-.89c-1.125-.253-2.057-.694-2.82-1.284c.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492a2 2 0 0 1-.94.31"/></g>'

defineProps({
  size: {
    type: Number,
    required: false,
    default: 20
  }
})

const { t, availableLocales, locale } = useI18n()
const toggleLocale = () => switchLocale(availableLocales, locale)
</script>

<template>
  <div class="divider" />
  <button
    :aria-label="t('button.toggle_locale')"
    type="button"
    class="VPLocaleSwitcher"
    @click="toggleLocale"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      :width="size"
      :height="size"
      viewBox="0 0 16 16"
      v-html="translateIconBody"
    ></svg>
  </button>
</template>
<style scoped>
.divider {
  margin-right: 8px;
  margin-left: 16px;
  width: 1px;
  height: 24px;
  background-color: var(--vp-c-divider);
  content: '';
}

.VPLocaleSwitcher {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  color: var(--vp-c-text-2);
  transition: none;
}

.VPLocaleSwitcher:hover {
  color: var(--vp-c-text-1);
  transition: none;
}

.VPLocaleSwitcher > :deep(svg) {
  width: 20px;
  height: 20px;
  fill: currentColor;
}
</style>
