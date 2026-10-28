import { useData } from 'vitepress'
import { type ComputedRef, computed, onMounted, watchEffect } from 'vue'

/**
 * Resolved language of the current page: `frontmatter.lang`, falling back to the site lang.
 */
export const usePageLang = (): ComputedRef<string> => {
  const { frontmatter, lang } = useData()
  return computed(() => {
    const pageLang = frontmatter.value.lang
    return typeof pageLang === 'string' && pageLang.trim() ? pageLang.trim() : lang.value
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
      { flush: 'post' },
    )
  })
}
