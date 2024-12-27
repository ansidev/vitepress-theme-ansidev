<script setup lang='ts'>
import { computed, type PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Post } from '../../core/types'
import { useRank, useSlug } from '../composables'
import TermBadge from '../components/TermBadge.vue'

const props = defineProps({
  posts: {
    type: Object as PropType<Post[]>,
    required: true,
    default: [],
  },
})

const { t } = useI18n()

const tags = computed(() => useRank(props.posts.flatMap(post => post.tags)))
</script>

<template>
  <Page :title="t('tags')">
    <div class="flex flex-wrap pt-4">
      <div v-if="Object.keys(tags).length === 0" class="mt-2 mb-2 mr-5">
        {{ t('no_category') }}
      </div>
      <TermBadge v-for="(count, tag) in tags" :key="tag" :title="tag" :count="count" :href="`/tags/${useSlug(tag)}`" />
    </div>
  </Page>
</template>
