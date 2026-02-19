<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { switchLocale } from '../composables/locale'

defineProps({
  size: {
    type: Number,
    required: false,
    default: 20,
  },
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
    <Icon icon="bi:translate" :width="size" :height="size" />
  </button>
</template>

<style scoped>
.divider {
  margin-right: 8px;
  margin-left: 16px;
  width: 1px;
  height: 24px;
  background-color: var(--vp-c-divider);
  content: "";
}

.VPLocaleSwitcher {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  color: var(--vp-c-text-2);
  transition: color 0.5s;
}

.VPLocaleSwitcher:hover {
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.VPLocaleSwitcher > :deep(svg) {
  width: 20px;
  height: 20px;
  fill: currentColor;
}
</style>
