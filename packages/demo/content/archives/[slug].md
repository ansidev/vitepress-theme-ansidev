---
home: true
layout: home
---

<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'
import { data } from '../../loaders/post.data'

const { params } = useData()

const byYear = post => new Date(post.date).getFullYear().toString() === params.value?.slug
const postsByYear = computed(() => data.filter(byYear))
</script>

<PostsPage :title="params.slug" :posts="postsByYear" />
