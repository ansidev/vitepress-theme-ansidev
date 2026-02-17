<script setup lang='ts'>
import { computed } from 'vue'
import RouterLink from './RouterLink.vue'
import { useSlug } from '../composables'

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  basePath: {
    type: String,
    required: true,
  }
})

const slug = computed(() => useSlug(props.text))
const link = computed(() => `${props.basePath}${slug.value}`)
</script>

<template>
  <RouterLink :to="link" class="mr-2 text-sm font-medium uppercase link-alt">
    {{ text }}
  </RouterLink>
</template>
