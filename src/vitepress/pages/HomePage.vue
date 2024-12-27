<script setup lang='ts'>
import type { PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Post } from '../../core/types'

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
  <PostsPage :title="posts.length > 0 ? t('all_posts') : ''" :posts="posts" />
</template>
