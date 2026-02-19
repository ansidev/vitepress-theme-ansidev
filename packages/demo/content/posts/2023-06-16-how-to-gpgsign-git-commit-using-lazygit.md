---
type: post
title: How to gpgsign git commit using lazygit?
date: 2023-06-16T18:30:00+07:00
author: ansidev
gravatar: a2ac3c4477e717c7fa15041d907e71fd
twitter: "@ansidev"
permalink: /tips-and-tricks/how-to-gpgsign-git-commit-using-lazygit/
categories:
  - Tips and Tricks
  - Git
tags:
  - Lazygit
  - GPG sign
  - commit
---

GPG sign git commit using lazygit.

<!-- more -->

## Issue

One of best practices in my opinion when using git is enabling GPG signing for your commit.

And one of my favorite tools to commit my code in terminal environment is Lazygit. However, by default, it doesn't work
if GPG signing is enabled.

- https://github.com/jesseduffield/lazygit/issues/30
- https://github.com/jesseduffield/lazygit/issues/1146

## Solution

After trying multiple solutions, I found a simple solution to resolve this issue.

You can add this config to your ssh config file (default path is ~/.ssh/config):

```
ForwardAgent yes
```

**Note**: You have to add config to the SSH key which will be used for signing the git commits.

After that, the config should look like below:

```
Host github
  HostName github.com
  IdentityFile ~/.ssh/id_rsa
  ForwardAgent yes
```

Hope this helps you out!
