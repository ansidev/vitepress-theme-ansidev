<script setup lang="ts">
import type { PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Project } from '../../core/types'
import ProjectList from '../components/ProjectList.vue'

defineProps({
  projects: {
    type: Object as PropType<Project[]>,
    required: true,
    default: []
  }
})

const { t } = useI18n()
</script>

<template>
  <Page :title="t('my_projects')">
    <ProjectList :projects="projects" />
  </Page>
</template>
