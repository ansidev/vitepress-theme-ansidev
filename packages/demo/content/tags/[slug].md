---
home: true
layout: home
---

<script setup>
import { useSlugFilter } from '@ansidev-oss/vitepress-theme-ansidev'
import { useData } from 'vitepress'
import { computed, ref } from 'vue'
import { data } from '../../loaders/post.data'

const { params } = useData()

const tagFilter = useSlugFilter(params.value?.slug)
let tagName = ref('')
const postsByTag = computed(() => data.filter(post => {
  const filteredTags = post.tags.filter(tagFilter)
  const matchedTag = filteredTags.length === 1
  if (tagName.value === '' && matchedTag) {
    tagName.value = filteredTags[0]
  }
  return matchedTag
}))
</script>

<PostsPage :title="tagName" :posts="postsByTag" />
