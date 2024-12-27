---
home: true
layout: home
---

<script setup>
import { data as posts } from '../loaders/post.data'
</script>

<CategoriesPage :posts="posts" />
