---
home: true
layout: home
---

<script setup>
import { useData } from 'vitepress'
import { data } from '../../loaders/project.data'

const { params } = useData()
</script>

<ProjectsPage :projects="data" :technology="params.slug" />
