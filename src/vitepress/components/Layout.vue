<script setup lang='ts'>
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import LocaleSwitcher from './LocaleSwitcher.vue'

const { Layout: DefaultLayout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <DefaultLayout>
    <template #doc-before>
      <div class="vp-doc">
        <h1>{{ frontmatter.title }}</h1>
      </div>
    </template>
    <template #nav-bar-content-after>
      <LocaleSwitcher />
    </template>
  </DefaultLayout>
</template>
