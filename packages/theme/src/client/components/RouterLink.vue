<script setup lang='ts'>
import { useRouter } from 'vitepress'

defineProps({
  to: {
    type: String,
    required: true,
    default: '#',
  },
})

const router = useRouter()
</script>

<template>
  <a :href="to" @click="router.go(to)" v-bind="$attrs">
    <slot />
  </a>
</template>
