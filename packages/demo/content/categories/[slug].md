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

const categoryFilter = useSlugFilter(params.value?.slug)
let categoryName = ref('')
const postsByCategory = computed(() => data.filter(post => {
  const filteredCategories = post.categories.filter(categoryFilter)
  const matchedCategory = filteredCategories.length === 1
  if (categoryName.value === '' && matchedCategory) {
    categoryName.value = filteredCategories[0]
  }
  return matchedCategory
}))
</script>

<PostsPage :title="categoryName" :posts="postsByCategory" />
