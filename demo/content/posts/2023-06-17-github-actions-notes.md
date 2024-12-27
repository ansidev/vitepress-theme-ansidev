---
layout: doc
type: post
title: GitHub Actions notes
date: 2023-06-17T15:58:40+07:00
author: ansidev
gravatar: a2ac3c4477e717c7fa15041d907e71fd
twitter: "@ansidev"
permalink: /tips-and-tricks/github-actions-notes/
categories:
  - Tips and Tricks
  - CI/CD
  - DevOps
tags:
  - GitHub Actions
---

My personal notes after creating GitHub Actions.

<!-- more -->

## Story

I have started learning GitHub Action for over 1 year.

As a beginner, I was writing GitHub workflows for my own projects to automate repetitive tasks.

However, I have to copy workflows among the projects and I found it hard to maintain them when the duplication was
increased day by day.

There are two solutions provided by GitHub to resolve this issue:

- [Reusable workflows](https://docs.github.com/en/actions/using-workflows/reusing-workflows).
- [Custom GitHub actions](https://docs.github.com/en/actions/creating-actions/about-custom-actions), as you usually find
  them on the [GitHub Actions Marketplace](https://github.com/marketplace?type=actions).

Both of them was created to avoid duplicate code and to reduce the maintenance cost. However, they are not the same.

Reusable workflow is used to reuse the whole workflow.

On the other hand, custom action is used to reuse the jobs.

You can apply both solutions to reduce the code duplication and to reduce the maintenance cost in your projects.

## GitHub custom actions

### Basic notes

- The minimal requirement is to have a GitHub custom action is a metadata file called `action.yml` or `action.yaml`.
- There are three type of actions: Docker container, Javascript, and Composite action.
- Docker container action does not support macOS and Windows.
- Javascript and Composite action supports Linux, macOS and Windows.
- You can reference a custom GitHub action using this syntax: `{owner}`/`{action-repo}`@`{git-ref}`. `{git-ref}` can be
  a branch, tag, or commit SHA.
- You don't need to publish your custom GitHub action to the GitHub Marketplace, just need to ensure it is accessible by
  other repositories.
- You can create a monorepo for multiple custom GitHub actions. The limitation is you cannot publish them to the GitHub
  Marketplace.

### Best practices

IMO, some best practices for custom action are:

- Create GitHub workflows for testing your custom GitHub Action to ensure it is working properly, both internal
  workflows and external workflows.
- Create documentation for your custom GitHub action. For references, I used
  [npalm/action-docs](https://github.com/npalm/action-docs). It does not meet all of my expectations, however, it is
  still a good tool. You should try.
- If you want to publish your GitHub custom GitHub action to the GitHub Marketplace, you need to meet some requirements.
  For more details, please refer to this [link](https://github.com/{owner}/{action-repo}/releases/new?marketplace=true)
  and check whether all requirements are met.
- Write a good changelog. You can generate the changelog from your git commits if you wrote a good commit messages.
- Don't forget to automate your tasks: testing your action, publishing new release.
- At this moment, I don't find any documentation about publishing the custom GitHub action on release automatically.
  Finally, I have to do this task from the web UI manually.

## Conclusion

Checkout my custom GitHub Actions:

- [ghacts/manual-deploy-to-netlify](https://github.com/ghacts/manual-deploy-to-netlify) - GitHub Actions for manual
  deploying static site projects to Netlify
- [ghacts/go](https://github.com/ghacts/go) - GitHub Actions for building and testing Go projects
- [ghacts/static-site](https://github.com/ghacts/static-site) - GitHub Actions for building and testing static site
  projects
- [ghacts/gitflow](https://github.com/ghacts/gitflow) - GitHub Actions for automating gitflow
