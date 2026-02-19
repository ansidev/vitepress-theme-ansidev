---
type: project
title: Astro Starter Template
repositoryUrl: https://github.com/ansidev/astro-starter-template
showcaseUrl: https://astro-basic-template-asd.netlify.app/
license: MIT
licenseUrl: https://github.com/ansidev/astro-starter-template/blob/main/LICENSE
techs:
  - Astro
  - TypeScript
  - GitHub Actions
  - Netlify
  - Taskfile
developmentStatus: active
date: 2023-02-22T22:14:00+07:00
author: ansidev
gravatar: a2ac3c4477e717c7fa15041d907e71fd
twitter: "@ansidev"
---

This is a starter template for the new Astro project which is created by ansidev.

<!-- more -->

## Story

I usually initiate new Astro projects using the official Astro Basic template. However, it is not pre-configured. Therefore, I've built my own one: https://github.com/ansidev/astro-basic-template.

## Versions

- Version 1:

  **Features**
    - [Astro](https://astro.build) v2, disabled Astro Telemetry.
    - [Astro Compress](https://github.com/astro-community/astro-compress) - Compress output HTML, CSS, JS, image.
    - [Astro PurgeCSS](https://github.com/codiume/orbit/tree/main/packages/astro-purgecss) - Remove unused CSS from build output.
    - Automate releasing new versions using [GitHub Actions](https://github.com/features/actions) and following the [`git-flow`](https://nvie.com/posts/a-successful-git-branching-model/) branching model.
    - Automate [Netlify](https://netlify.com/) deployment, support GitHub deploy environment. [Go to section](#github-deploy-environment).
    - Automate rebasing PR branch via PR comment: `/rebase`, `/autosquash`, `/rebase-autosquash`.

  **Development features**

    - Node package manager: [PNPM](https://pnpm.io/).
    - [Conventional commit](https://conventionalcommits.org/).
    - [ESLint](https://eslint.org) - Static code analyzer.
    - [Prettier](https://prettier.io) - Code formatter.
    - [Renovate](https://www.mend.io/free-developer-tools/renovate/) - Automate dependency updates.
    - [changie](https://changie.dev), [git-chglog](https://github.com/git-chglog/git-chglog) - Generate changelog from conventional commits.
    - [taskfile](https://github.com/ansidev/taskfile) - Task files for common tasks.

  **Release notes**: [v2.0.0](https://github.com/ansidev/leetcode-blog/releases/tag/v2.0.0).

## Conclusion

Please take a look at it and leave feedback for me. If there is any issue or feature request, feel free to create a new GitHub issue.

It would be great if you also give my project a GitHub star.

If you find this project and my other projects useful to you, consider donating to me at:

- [Paypal](https://paypal.me/ansidev)
- [Ko-fi](https://ko-fi.com/ansidev)
- [Buy me a coffee](https://buymeacoffee.com/ansidev)
- [Momo](https://me.momo.vn/ansidev)
