<script setup lang="ts">
import { computed } from 'vue'
import { useSlug } from '../composables'
import RouterLink from './RouterLink.vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  basePath: {
    type: String,
    required: true
  }
})

const slug = computed(() => useSlug(props.text))
const link = computed(() => `${props.basePath}${slug.value}`)
const label = computed(() => {
  if (props.basePath === '/categories/') {
    return `View all posts in category ${props.text}`
  }
  return `View all projects using ${props.text}`
})
</script>

<template>
  <RouterLink
    :to="link"
    :aria-label="label"
    class="mr-2 text-sm font-medium uppercase link-alt"
  >
    {{ text }}
  </RouterLink>
</template>
