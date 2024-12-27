import { createI18n } from 'vue-i18n'

import en from '../locales/en.json'
import vi from '../locales/vi.json'

export default createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en,
    vi
  }
})