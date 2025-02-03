<script setup lang="ts">
import type { PropType } from 'vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUrlSearchParams } from '@vueuse/core'
import type { Project } from '../../core/types'
import ProjectList from '../components/ProjectList.vue'
import { useSlug, useSlugFilter } from '../composables'

const props = defineProps({
  projects: {
    type: Object as PropType<Project[]>,
    required: true,
    default: []
  }
})

const { t } = useI18n()
const params = useUrlSearchParams('history')
const tech = params.tech
const hasTechParam = typeof tech === 'string' && tech.length > 0
const byTech: (project: Project) => boolean = project => !hasTechParam || project.techs.some(useSlugFilter(tech))
const projectsByTech = computed(() => props.projects.filter(byTech))
const technologies = computed(() => {
  const uniqueTechnologies = [...new Set(props.projects.flatMap(project => project.techs))]
  return uniqueTechnologies.map(name => ({
    name,
    slug: useSlug(name),
    selected: hasTechParam && useSlug(name) === tech
  })).sort((a, b) => b.selected === a.selected ? 0 : b.selected ? 1 : -1)
})
</script>

<template>
  <Page :title="t('my_projects')">
    <div>
      <p>
        <span class="mr-2">Technologies</span>
        <a v-if="hasTechParam" href="/projects.html">Reset</a>
      </p>
      <p class="flex flex-row flex-wrap">
        <a v-for="technology in technologies"
          :class="['border rounded-md m-1 p-1', technology.selected ? 'bg-primary text-white! border-primary' : '']"
          :href="`/projects.html?tech=${technology.slug}`">
          {{ technology.name }}
        </a>
      </p>
    </div>
    <ProjectList :projects="projectsByTech" />
  </Page>
</template>
