<script setup lang="ts">
import { useData } from 'vitepress'
import { defineAsyncComponent } from 'vue'

const { theme } = useData()

const props = defineProps<{
  direction?: 'horizontal' | 'vertical'
}>()

const directionCssClass = props.direction === 'vertical' ? 'space-y-4' : 'space-x-4'

const Donation = theme.value.donation
  ? defineAsyncComponent(() => import('../plugins/donation/components/Donation.vue'))
  : () => null
</script>

<template>
  <div class="flex flex-wrap py-4 items-center justify-center" :class="directionCssClass">
    <Donation :donation="theme.donation" />
  </div>
</template>
