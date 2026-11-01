import { useData } from 'vitepress'
import { type ComputedRef, computed, onMounted, watch, watchEffect } from 'vue'
import type { Locale } from 'vue-i18n'

/**
 * Resolved language of the current page: `frontmatter.lang`, falling back to the site lang.
 */
export const usePageLang = (): ComputedRef<string> => {
  const { frontmatter, lang } = useData()
  return computed(() => {
    const pageLang = frontmatter.value.lang
    return typeof pageLang === 'string' && pageLang.trim()
      ? pageLang.trim()
      : lang.value
  })
}

/**
 * Keeps `<html lang>` in sync with the resolved page lang.
 * VitePress resets it to the site lang on mount, so re-apply it after mount and on navigation.
 */
export const useHtmlLang = (): void => {
  const pageLang = usePageLang()
  // Registered inside onMounted so it runs after VitePress's own mount-time reset.
  onMounted(() => {
    watchEffect(
      () => {
        document.documentElement.lang = pageLang.value
      },
      { flush: 'post' }
    )
  })
}

/**
 * Picks the available locale matching `lang` exactly or by base language (`vi-VN` -> `vi`).
 */
export const matchLocale = (
  lang: string,
  availableLocales: readonly Locale[]
): Locale | undefined => {
  const normalized = lang.toLowerCase()
  return (
    availableLocales.find((l) => l.toLowerCase() === normalized) ??
    availableLocales.find((l) => l.toLowerCase() === normalized.split('-')[0])
  )
}

/**
 * Syncs the vue-i18n locale with the resolved page lang, synchronously so SSR renders the right strings.
 * A manual `LocaleSwitcher` choice lasts until the page lang changes.
 */
export const usePageLocale = (i18n: {
  global: { locale: { value: Locale }; availableLocales: Locale[] }
}): void => {
  const pageLang = usePageLang()
  watch(
    pageLang,
    (lang) => {
      const matched = matchLocale(lang, i18n.global.availableLocales)
      if (matched) i18n.global.locale.value = matched
    },
    { immediate: true }
  )
}
