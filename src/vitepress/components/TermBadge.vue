<script setup lang="ts">
import Link from './Link.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <Link :key="title" :href="href"
    class="inline-flex items-center mt-2 mb-2 mr-2 px-5 py-2.5 text-sm font-medium text-center text-white component-border">
    {{ title }}
    <span
      class="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-gray-900 dark:text-white bg-gray-300 dark:bg-gray-700 p-2.5 rounded">
      {{ count }}
    </span>
  </Link>
</template>
