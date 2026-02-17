<script setup lang='ts'>
import type { PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Post } from '../../core/types'
import PostItem from './PostItem.vue'

defineProps({
  posts: {
    type: Object as PropType<Post[]>,
    required: true,
    default: [],
  },
})

const { t } = useI18n()
</script>

<template>
  <div v-if="posts.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
    <PostItem v-for="post of posts" :key="post?.url" :post="post" />
  </div>
  <p v-if="posts.length === 0">{{ t('no_post') }}</p>
</template>
