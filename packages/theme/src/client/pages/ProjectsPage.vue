<script setup lang="ts">
import type { PropType } from 'vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ProjectList from '../components/ProjectList.vue'
import { useSlug, useSlugFilter } from '../composables'
import type { Project } from '../types'

const props = defineProps({
  projectPage: {
    type: String,
    required: false,
    default: '/projects.html',
  },
  projects: {
    type: Object as PropType<Project[]>,
    required: true,
    default: [],
  },
  technology: {
    type: String,
    required: false,
  },
})

const { t } = useI18n()
const tech = props.technology
const hasTechParam = typeof tech === 'string' && tech.length > 0
const byTech: (project: Project) => boolean = (project) => !hasTechParam || project.techs.some(useSlugFilter(tech))
const projectsByTech = computed(() => props.projects.filter(byTech))
const technologies = computed(() => {
  const uniqueTechnologies = [...new Set(props.projects.flatMap((project) => project.techs))]
  return uniqueTechnologies
    .map((name) => ({
      name,
      slug: useSlug(name),
      selected: hasTechParam && useSlug(name) === tech,
    }))
    .sort((a, b) => (b.selected === a.selected ? 0 : b.selected ? 1 : -1))
})
</script>

<template>
  <Page :title="t('my_projects')">
    <div>
      <p>
        <span class="mr-2">Technologies</span>
        <a v-if="hasTechParam" :href="projectPage">Reset</a>
      </p>
      <p class="flex flex-row flex-wrap">
        <a
          v-for="technology in technologies"
          :class="[
            'border rounded-md m-1 p-1',
            technology.selected ? 'bg-primary text-white! border-primary' : ''
          ]"
          :href="`/projects-by-tech/${technology.slug}`"
        >
          {{ technology.name }}
        </a>
      </p>
    </div>
    <ProjectList :projects="projectsByTech" />
  </Page>
</template>
