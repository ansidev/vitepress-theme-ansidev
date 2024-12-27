---
home: true
layout: home
---

<script setup>
import { data as projects } from '../../loaders/project.data'
</script>

<ProjectPage :projects="projects" />
