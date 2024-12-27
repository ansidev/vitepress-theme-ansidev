---
home: true
layout: home
---

<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'
import { useSlugFilter } from '../../composables'
import { data as posts } from '../../loaders/post.data'

const { params } = useData()

const categoryFilter = useSlugFilter(params.value.slug)
const categoryName = computed(() => posts.flatMap(post => post.categories).find(categoryFilter))
const postsByCategory = computed(() => posts.filter(post => post.categories.filter(categoryFilter).length > 0))
</script>

<PostsPage :title="categoryName" :posts="postsByCategory" />
