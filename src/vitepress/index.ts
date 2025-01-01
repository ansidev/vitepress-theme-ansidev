// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import { Icon } from '@iconify/vue'

import Layout from './components/Layout.vue'

import Page from './pages/Page.vue'
import PostsPage from './pages/PostsPage.vue'
import HomePage from './pages/HomePage.vue'
import ProjectsPage from './pages/ProjectsPage.vue'
import CategoriesPage from './pages/CategoriesPage.vue'
import TagsPage from './pages/TagsPage.vue'

import i18n from '../core/plugins/i18n'

import type { Theme } from 'vitepress'

import './styles/index.css'

const VPTheme: Theme = {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('Icon', Icon)
    app.component('Page', Page)
    app.component('PostsPage', PostsPage)
    app.component('HomePage', HomePage)
    app.component('ProjectsPage', ProjectsPage)
    app.component('CategoriesPage', CategoriesPage)
    app.component('TagsPage', TagsPage)
    app.use(i18n)
  },
} satisfies Theme

export { VPTheme }

export type { Config } from './config'
