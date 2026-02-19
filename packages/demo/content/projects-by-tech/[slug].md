---
home: true
layout: home
---

<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'
import { useSlugFilter } from '../../composables'
import { data as projects } from '../../loaders/project.data'

const { params } = useData()
</script>

<ProjectsPage :projects="projects" :technology="params.slug" />
