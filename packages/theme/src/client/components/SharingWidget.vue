<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import { defineAsyncComponent } from 'vue'

const route = useRoute()

const { theme, frontmatter, page } = useData()

const Sharing = theme.value.sharing
? defineAsyncComponent(() => import('../plugins/sharing/components/Sharing.vue'))
: () => null

const postURL = new URL(route.path, theme.value.siteURL).href
const postTitle = frontmatter.value.title || page.value.title
</script>

<template>
  <Sharing :url="postURL" :text="postTitle" />
</template>
