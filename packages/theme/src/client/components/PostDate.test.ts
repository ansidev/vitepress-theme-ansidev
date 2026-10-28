import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createI18n } from 'vue-i18n'
import PostDate from './PostDate.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: { en: { posted_on: 'Posted on' } },
})

const render = (date?: Date | string) => mount(PostDate, { props: { date }, global: { plugins: [i18n] } })
const datetimeOf = (date?: Date | string) => render(date).get('time').attributes('datetime')

describe('PostDate datetime', () => {
  afterEach(() => {
    vi.useRealTimers()
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
