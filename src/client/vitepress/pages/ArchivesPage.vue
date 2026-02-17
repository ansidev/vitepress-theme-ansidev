<script setup lang="ts">
import { computed, type PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Post } from '../../core/types'
import { useRank } from '../composables'
import TermBadge from '../components/TermBadge.vue'

const props = defineProps({
  posts: {
    type: Object as PropType<Post[]>,
    required: true,
    default: []
  }
})

const { t } = useI18n()

const totalPostsByYears = computed(() =>
  useRank(props.posts.flatMap((post) => new Date(post.date).getFullYear().toString()))
)
const sortedYearDesc = computed(() => Object.keys(totalPostsByYears.value).map(str => Number(str)).reverse())
</script>

<template>
  <Page :title="t('archives')">
    <div class="flex flex-wrap pt-4">
      <div v-if="Object.keys(sortedYearDesc).length === 0" class="mt-2 mb-2 mr-5">
        {{ t('no_archive') }}
      </div>
      <TermBadge
        v-for="year in sortedYearDesc"
        :key="year"
        :title="`${year}`"
        :count="totalPostsByYears[year]"
        :href="`/archives/${year}`"
      />
    </div>
  </Page>
</template>
