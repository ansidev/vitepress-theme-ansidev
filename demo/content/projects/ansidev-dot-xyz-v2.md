---
type: project
title: ansidev.xyz - v2
repositoryUrl: https://github.com/ansidev/blog
showcaseUrl: https://ansidev.xyz/
license: MIT
licenseUrl: https://github.com/ansidev/blog/blob/main/LICENSE
techs:
  - TypeScript
  - Vite
  - Vue3
  - Vue Router
  - Vue I18n
  - TailwindCSS
  - Netlify
  - Cloudflare
developmentStatus: active
date: 2022-01-07T09:00:00+07:00
author: ansidev
gravatar: a2ac3c4477e717c7fa15041d907e71fd
twitter: "@ansidev"
---

My personal blog (version 2).

<!-- more -->

## Story

In version 1, I switched from VuePress v1 to VitePress v0, but there is problems when I want to add plugins because VitePress does not support them.

I found a starter template [Vitesse](https://github.com/antfu/vitesse) by [Anthony Fu](https://github.com/antfu) which supports the plugin system.

After some tests, I decided to use Vitesse to build my blog.

## Technologies

The blog v2 is built with:

- [TypeScript](https://typescriptlang.org).
- [Vite](https://vitejs.dev).
- [Vue 3](https://vuejs.org).
- [Vue Router](https://router.vuejs.org).
- [Vue I18n](https://vue-i18n.intlify.dev/).
- [TailwindCSS](https://tailwindcss.com/).
- [Bootstrap Icon](https://icons.getbootstrap.com/).
- [Iconify for Vue](https://docs.iconify.design/icon-components/vue/).
- [Netlify](https://netlify.com).
- [Cloudflare](https://cloudflare.com).

## Features

### Blog

v1:

- PWA application.
- RSS Feed.
- Social sharing.
- Medium Zoom for images.

v2:
- Server-side generation.
- Rewrote blog theme.
- Support dark mode.
- Support multi-language.
- Newsletter subscription.
- Search for articles, projects.
- Table of contents for post.
- Plugin Donation.
- Plugin Swetrix Analytics.
- Fix bugs, optimize code.

### Blog theme
- v1: Inspired by [Official VueJS blog](https://github.com/vuejs/blog). This theme is originally included in the blog v1 and I ported it when I upgraded my blog to v2.
- v2: Inspired by [Tailwind NextJs Starter Blog Theme](https://github.com/timlrx/tailwind-nextjs-starter-blog) by [Timothy](https://github.com/timlrx) with customizations.
- v2.1: Add Projects page, support searching for projects basically, change the default font.

## TODO

- Support more project filters.
- Change comment system.
- ...
