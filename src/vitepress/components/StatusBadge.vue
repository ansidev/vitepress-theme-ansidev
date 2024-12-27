<script setup lang='ts'>
defineProps({
  backgroundColor: {
    type: String,
    required: false,
    default: 'bg-blue-100',
  },
  darkBackgroundColor: {
    type: String,
    required: false,
    default: 'dark:bg-blue-800',
  },
  textColor: {
    type: String,
    required: false,
    default: 'text-blue-800',
  },
  darkTextColor: {
    type: String,
    required: false,
    default: 'dark:text-blue-100',
  },
  fontSize: {
    type: String,
    required: false,
    default: 'text-base',
  },
  fontWeight: {
    type: String,
    required: false,
    default: 'font-normal',
  },
  rounded: {
    type: Boolean,
    required: false,
    default: true,
  },
})
</script>

<template>
  <span
    class="px-2.5 py-0.5"
    :class="[
      backgroundColor,
      darkBackgroundColor,
      textColor,
      darkTextColor,
      fontSize,
      fontWeight,
      rounded ? 'rounded' : '',
    ]"
  >
    <slot />
  </span>
</template>
