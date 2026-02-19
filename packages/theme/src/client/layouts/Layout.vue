<script setup lang='ts'>
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Footer from '../components/Footer.vue'
import LocaleSwitcher from '../components/LocaleSwitcher.vue'

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
    <template #layout-bottom>
      <Footer />
    </template>
  </DefaultLayout>
</template>
