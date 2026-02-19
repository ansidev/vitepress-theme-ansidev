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

const tagFilter = useSlugFilter(params.value.slug)
const tagName = computed(() => posts.flatMap(post => post.tags).find(tagFilter))
const postsByTag = computed(() => posts.filter(post => post.tags.filter(tagFilter).length > 0))
</script>

<PostsPage :title="tagName" :posts="postsByTag" />
