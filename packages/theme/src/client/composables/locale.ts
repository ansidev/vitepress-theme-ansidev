import type { WritableComputedRef } from 'vue'
import type { Locale } from 'vue-i18n'

export const switchLocale = (availableLocales: string[], locale: WritableComputedRef<Locale>) => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
