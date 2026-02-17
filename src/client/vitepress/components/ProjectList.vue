<script setup lang='ts'>
import type { PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Project } from '../../core/types'
import ProjectCard from './ProjectCard.vue'

defineProps({
  projects: {
    type: Object as PropType<Project[]>,
    required: true,
    default: [],
  },
})

const { t } = useI18n()
</script>

<template>
  <div v-if="projects.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
    <ProjectCard v-for="project of projects" :key="project?.url" :project="project" />
  </div>
  <p v-if="projects.length === 0">{{ t('no_post') }}</p>
</template>
