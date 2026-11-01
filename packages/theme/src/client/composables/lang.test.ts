import { describe, expect, it, vi } from 'vite-plus/test'
import { nextTick, ref } from 'vue'
import { createI18n } from 'vue-i18n'
import { matchLocale, usePageLocale } from './lang'

const data = { frontmatter: ref<Record<string, unknown>>({}), lang: ref('en') }
vi.mock('vitepress', () => ({ useData: () => data }))

describe('matchLocale', () => {
  const available = ['en', 'vi']

  it('matches exactly', () => {
    expect(matchLocale('vi', available)).toBe('vi')
  })

  it('matches by base language and is case-insensitive', () => {
    expect(matchLocale('vi-VN', available)).toBe('vi')
    expect(matchLocale('EN-us', available)).toBe('en')
  })

  it('returns undefined when unsupported', () => {
    expect(matchLocale('fr', available)).toBeUndefined()
  })
})

describe('usePageLocale', () => {
  const setup = () => {
    const i18n = createI18n({
      legacy: false,
      locale: 'en',
      messages: { en: {}, vi: {} }
    })
    usePageLocale(i18n)
    return i18n
  }

  it('sets the locale from front matter lang immediately', () => {
    data.frontmatter.value = { lang: 'vi' }
    expect(setup().global.locale.value).toBe('vi')
  })

  it('keeps a manual choice until the page lang changes', async () => {
    data.frontmatter.value = { lang: 'vi' }
    const i18n = setup()
    i18n.global.locale.value = 'en'
    data.frontmatter.value = { lang: 'vi' }
    await nextTick()
    expect(i18n.global.locale.value).toBe('en')
    data.frontmatter.value = {}
    await nextTick()
    expect(i18n.global.locale.value).toBe('en')
    data.frontmatter.value = { lang: 'vi' }
    await nextTick()
    expect(i18n.global.locale.value).toBe('vi')
  })
})
