<script setup lang='ts'>
import RouterLink from './RouterLink.vue'

const props = defineProps({
  href: {
    type: String,
    required: true,
    default: '#',
  },
  disableRouterLink: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const isInternalLink = props.href && props.href.startsWith('/') && !props.disableRouterLink
const isAnchorLink = props.href && props.href.startsWith('#')
</script>

<template>
  <RouterLink v-if="isInternalLink || isAnchorLink" :to="href" v-bind="$attrs">
    <slot />
  </RouterLink>
  <a v-else-if="disableRouterLink" target="_self" :href="href" v-bind="$attrs">
    <slot />
  </a>
  <a v-else target="_blank" rel="noopener noreferrer" :href="href" v-bind="$attrs">
    <slot />
  </a>
</template>
