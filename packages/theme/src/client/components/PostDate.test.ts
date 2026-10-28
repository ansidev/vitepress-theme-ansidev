import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createI18n } from 'vue-i18n'
import PostDate from './PostDate.vue'

const data = vi.hoisted(() => ({ frontmatter: { value: {} as Record<string, unknown> }, lang: { value: 'en-US' } }))
vi.mock('vitepress', () => ({ useData: () => data }))

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: { en: { posted_on: 'Posted on' } },
})

const render = (date?: Date | string) => mount(PostDate, { props: { date }, global: { plugins: [i18n] } })
const datetimeOf = (date?: Date | string) => render(date).get('time').attributes('datetime')

describe('PostDate locale', () => {
  afterEach(() => {
    data.frontmatter.value = {}
    data.lang.value = 'en-US'
  })

  const textOf = () => render('2023-04-05T06:07:08.000Z').get('time').text()

  it('formats in English for en-US', () => {
    expect(textOf()).toBe('April 5, 2023')
  })

  it('formats in Vietnamese when frontmatter lang is vi', () => {
    data.frontmatter.value = { lang: 'vi' }
    expect(textOf()).toBe('5 tháng 4, 2023')
  })

  it('falls back to the site lang without frontmatter lang', () => {
    data.lang.value = 'vi'
    expect(textOf()).toBe('5 tháng 4, 2023')
  })

  it('falls back to English for an invalid lang tag', () => {
    data.frontmatter.value = { lang: 'not_a_lang!' }
    expect(textOf()).toBe('April 5, 2023')
  })
})

describe('PostDate datetime', () => {
  afterEach(() => {
    vi.useRealTimers()
    data.frontmatter.value = {}
    data.lang.value = 'en-US'
  })

  it('matches the date prop when given a Date', () => {
    const date = new Date('2023-04-05T06:07:08.000Z')
    expect(datetimeOf(date)).toBe(date.toISOString())
  })

  it('matches the date prop when given a string', () => {
    expect(datetimeOf('2023-04-05T06:07:08.000Z')).toBe('2023-04-05T06:07:08.000Z')
    expect(datetimeOf('2023-04-05')).toBe(new Date('2023-04-05').toISOString())
  })

  it('does not depend on render time', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2030-01-01T00:00:00.000Z'))
    expect(datetimeOf('2023-04-05T06:07:08.000Z')).toBe('2023-04-05T06:07:08.000Z')
  })

  it('omits datetime and does not throw for a missing or invalid date', () => {
    expect(datetimeOf(undefined)).toBeUndefined()
    expect(datetimeOf('not a date')).toBeUndefined()
  })
})
