<script setup lang='ts'>
defineProps({
  title: {
    type: String,
    required: true,
    default: '',
  },
})
</script>

<template>
  <div class="pt-6 pb-8 space-y-2 md:space-y-5">
    <h1
      class="mb-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"
    >
      {{ title }}
    </h1>
  </div>
  <slot />
</template>
