<script setup lang='ts'>
import { computed, type PropType } from 'vue'
import type { Post } from '../../core/types'
import { usePostDate } from '../composables'
import TermLink from './TermLink.vue'

const props = defineProps({
  post: {
    type: Object as PropType<Post>,
    required: true,
  },
})

const postDate = computed(() => usePostDate(props.post.date))
</script>

<template>
  <div class="flex p-4 component-border">
    <div class="text-center" style="min-width: 80px;">
      <div class="text-6xl font-bold">{{ postDate?.day }}</div>
      <div>{{ postDate?.month }}, {{ postDate?.year }}</div>
    </div>
    <div class="pl-8">
      <div class="flex flex-wrap mb-3">
        <a class="text-2xl font-bold leading-8 tracking-tight" :href="post?.url" :title="post.title">{{ post.title }}</a>
      </div>
      <div class="flex flex-wrap mb-3">
        <TermLink v-for="category in post.categories" :key="category" :text="category" basePath="/categories/" />
      </div>
      <p>{{ post?.excerpt }}</p>
    </div>
  </div>
</template>
