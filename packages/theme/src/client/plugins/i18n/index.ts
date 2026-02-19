import { createI18n } from 'vue-i18n'

import en from './locales/en.json' with { type: 'json' }
import vi from './locales/vi.json' with { type: 'json' }

export default createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en,
    vi,
  },
})
