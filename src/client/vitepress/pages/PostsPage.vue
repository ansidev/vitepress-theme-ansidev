<script setup lang='ts'>
import type { PropType } from 'vue'
import type { Post } from '../../core/types'
import PostList from '../components/PostList.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  posts: {
    type: Object as PropType<Post[]>,
    required: true,
    default: [],
  },
})
</script>

<template>
  <Page :title="title">
    <PostList :posts="posts" />
  </Page>
</template>
