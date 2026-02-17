<script setup lang='ts'>
import { computed, type PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Project } from '../../core/types'
import Date from './Date.vue'
import Link from './Link.vue'
import StatusBadge from './StatusBadge.vue'
import TermLink from './TermLink.vue'
import { useProjectStatusStyle } from '../composables'

const props = defineProps({
  project: {
    type: Object as PropType<Project>,
    required: true,
  },
})

const { t } = useI18n()
const projectStatusStyles = computed(() => useProjectStatusStyle(props.project.developmentStatus))
</script>

<template>
  <div class="flex flex-col p-4 component-border">
    <div class="flex flex-row justify-between items-center mb-4">
      <a :href="project.url" class="text-2xl font-bold leading-8 tracking-tight">
        {{ project.title }}
      </a>
      <div class="flex flex-row">
        <a v-if="project.showcaseUrl" class="mx-1 text-gray-500 transition hover:text-gray-600" target="_blank"
          rel="noopener noreferrer" :href="project.showcaseUrl">
          <span class="sr-only">external-link</span>
          <Icon icon="bi:box-arrow-up-right" class="text-dark dark:text-white ml-2" />
        </a>
        <a v-if="project.repositoryUrl" class="mx-1 text-gray-500 transition hover:text-gray-600" target="_blank"
          rel="noopener noreferrer" :href="project.repositoryUrl">
          <span class="sr-only">github</span>
          <Icon icon="bi:github" class="text-dark dark:text-white ml-2" />
        </a>
      </div>
    </div>
    <div class="project-info">
      <div v-html="project.excerpt" />
      <div class="flex flex-col justify-between">
        <div v-if="project.license" class="mb-3">
          {{ t('license') }}:
          <Link v-if="project.licenseUrl" :href="project.licenseUrl" class="link-alt">
          {{ project.license }}
          </Link>
          <span v-else>{{ project.license }}</span>
        </div>
        <div class="mb-3">
          {{ t('development_status.title') }}: <StatusBadge v-bind="projectStatusStyles">
            {{ $t(`development_status.${project.developmentStatus}`) }}
          </StatusBadge>
        </div>
        <div class="flex flex-wrap mb-3">
          <TermLink v-for="tech in project.techs" :key="tech" :text="tech" basePath="/projects?tech=" />
        </div>
        <Date :date="project.date" text-size="sm" />
      </div>
    </div>
    <div class="text-end">
      <a :href="project.url" :aria-label="`Read ${project.title}`">
        {{ t('button.read_more') }} &rarr;
      </a>
    </div>
  </div>
</template>
