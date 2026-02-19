---
type: post
title: How to change the highlight style using vim-illuminate?
date: 2023-04-25T05:58:22+07:00
author: ansidev
gravatar: a2ac3c4477e717c7fa15041d907e71fd
twitter: "@ansidev"
permalink: /tips-and-tricks/how-to-change-the-highlight-style-using-vim-illuminate
categories:
  - Tips and Tricks
  - Neovim
tags:
  - vim-illuminate
---

## Problem

[vim-illuminate](https://github.com/RRethy/vim-illuminate) is a (Neo)Vim plugin for automatically highlighting other uses of the word under the cursor using either LSP, Tree-sitter, or regex matching.

However, I don't like the default highlight style of the current version.

In this tutorial, I will guide you how to change it.

## Solution

The minimal config should look like below:

```lua
require("illuminate").configure{}

-- change the highlight style
vim.api.nvim_set_hl(0, "IlluminatedWordText", { link = "Visual" })
vim.api.nvim_set_hl(0, "IlluminatedWordRead", { link = "Visual" })
vim.api.nvim_set_hl(0, "IlluminatedWordWrite", { link = "Visual" })

--- auto update the highlight style on colorscheme change
vim.api.nvim_create_autocmd({ "ColorScheme" }, {
  pattern = { "*" },
  callback = function(ev)
    vim.api.nvim_set_hl(0, "IlluminatedWordText", { link = "Visual" })
    vim.api.nvim_set_hl(0, "IlluminatedWordRead", { link = "Visual" })
    vim.api.nvim_set_hl(0, "IlluminatedWordWrite", { link = "Visual" })
  end
})
```

You can customize the above snippet code to fit your need.

Hope this help!
