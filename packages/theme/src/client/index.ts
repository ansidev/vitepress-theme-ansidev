import { Icon } from '@iconify/vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './layouts/Layout.vue'
import ArchivesPage from './pages/ArchivesPage.vue'
import CategoriesPage from './pages/CategoriesPage.vue'
import HomePage from './pages/HomePage.vue'
import Page from './pages/Page.vue'
import PostsPage from './pages/PostsPage.vue'
import ProjectsPage from './pages/ProjectsPage.vue'
import TagsPage from './pages/TagsPage.vue'
import i18n from './plugins/i18n'
import './styles/index.css'
import type { EnhanceAppContext } from 'vitepress'

export type * from './types'

const theme: Theme = {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }: EnhanceAppContext) {
    app.component('Icon', Icon)
    app.component('Page', Page)
    app.component('PostsPage', PostsPage)
    app.component('HomePage', HomePage)
    app.component('ProjectsPage', ProjectsPage)
    app.component('CategoriesPage', CategoriesPage)
    app.component('TagsPage', TagsPage)
    app.component('ArchivesPage', ArchivesPage)
    app.use(i18n)
  },
} satisfies Theme

export type * from './types'

export default theme
