<script setup lang='ts'>
import { computed, type PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import TermBadge from '../components/TermBadge.vue'
import { useRank, useSlug } from '../composables'
import type { Post } from '../types'

const props = defineProps({
  posts: {
    type: Object as PropType<Post[]>,
    required: true,
    default: [],
  },
})

const { t } = useI18n()

const categories = computed(() => useRank(props.posts.flatMap((post) => post.categories)))
</script>

<template>
  <Page :title="t('categories')">
    <div class="flex flex-wrap pt-4">
      <div v-if="Object.keys(categories).length === 0" class="mt-2 mb-2 mr-5">
        {{ t('no_category') }}
      </div>
      <TermBadge v-for="(count, category) in categories" :key="category" :title="category" :count="count" :href="`/categories/${useSlug(category)}`" />
    </div>
  </Page>
</template>
