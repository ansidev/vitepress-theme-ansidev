<script setup lang='ts'>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePageLang } from '../composables/lang'

const props = defineProps({
  /**
   * { time, string }
   */
  date: [Date, String],
  textSize: {
    type: String,
    default: null,
  },
})

const { t } = useI18n()
const pageLang = usePageLang()

const formatDate = (date: Date, locale: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }
  try {
    return date.toLocaleDateString(locale, options)
  } catch {
    // Invalid lang tag: fall back to English.
    return date.toLocaleDateString('en-US', options)
  }
}

const dateObject = computed(() => {
  const date = props.date instanceof Date ? props.date : new Date(props.date as string)

  const isValid = !Number.isNaN(+date)

  return {
    time: +date,
    iso: isValid ? date.toISOString() : undefined,
    string: formatDate(date, pageLang.value),
  }
})
</script>

<template>
  <dl>
    <dt class="sr-only">
      {{ t('posted_on') }}
    </dt>
    <dd class="font-medium leading-6" :class="[textSize ? `text-${textSize}` : 'text-base']">
      <time :datetime="dateObject.iso">{{ dateObject.string }}</time>
    </dd>
  </dl>
</template>
