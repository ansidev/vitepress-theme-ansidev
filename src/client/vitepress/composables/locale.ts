import type { Locale } from 'vue-i18n'
import type { WritableComputedRef } from 'vue'

export const switchLocale = (
  availableLocales: string[],
  locale: WritableComputedRef<Locale>
) => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
