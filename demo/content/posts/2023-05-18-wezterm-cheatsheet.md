---
type: post
title: WezTerm cheatsheet
date: 2023-05-18T15:00:00+07:00
author: ansidev
gravatar: a2ac3c4477e717c7fa15041d907e71fd
twitter: "@ansidev"
permalink: /tips-and-tricks/wezterm-cheatsheet
categories:
  - Tips and Tricks
tags:
  - Terminal Emulator
  - WezTerm
---

My personal WezTerm configurations.

<!-- more -->

## Why WezTerm?

I have used Alacritty for a long time. And it has several issues:

- It does not support tab.
- It does not support splitting pane. This issue can be resolved by using tmux, however, I struggled with conflict key bindings since I use Neovim inside tmux.

Recently, I switched to WezTerm

- It supports both tab and splitting panes.
- WezTerm is using Lua for configuration, which is also used for Neovim configurations. It's more flexible than Alacritty.
- Since tmux is unnecessary, the key bindings issue can be resolved using Lua configurations.

## Configurations

These configurations are tested on macOS.

Base configurations:

```lua
local wezterm = require 'wezterm'
local config = {}

if wezterm.config_builder then
  config = wezterm.config_builder()
end
```

### Disable fancy tab style

```lua
config.use_fancy_tab_bar = false
```

### Hide the tab bar if there is only one tab

```lua
config.hide_tab_bar_if_only_one_tab = true
```

### Set window opacity

```lua
config.window_background_opacity = 0.8 -- personal recommended value
```

### Maximized window on start up

```lua
-- https://wezfurlong.org/wezterm/config/lua/gui-events/gui-startup.html
local mux = wezterm.mux

wezterm.on('gui-startup', function(cmd)
  local tab, pane, window = mux.spawn_window(cmd or {})
  window:gui_window():maximize()
end)

return config
```

### Display Tab Navigator

```lua
local act = wezterm.action

config.keys = {
  {
    key = 't',
    mods = 'CMD|SHIFT',
    action = act.ShowTabNavigator,
  },
  -- other keys
}
```

### Rename tab title

```lua
local act = wezterm.action

config.keys = {
  {
    key = 'R',
    mods = 'CMD|SHIFT',
    action = act.PromptInputLine {
      description = 'Enter new name for tab',
      action = wezterm.action_callback(function(window, _, line)
        -- line will be `nil` if they hit escape without entering anything
        -- An empty string if they just hit enter
        -- Or the actual line of text they wrote
        if line then
          window:active_tab():set_title(line)
        end
      end),
    },
  },
  -- other keys
}
```

### Open WezTerm config file quickly

This key binding will open WezTerm configuration file using Neovim. Replace Neovim by your favorite text editor.

```lua
local act = wezterm.action

config.keys = {
  {
    key = ',',
    mods = 'CMD',
    action = act.SpawnCommandInNewTab {
      cwd = os.getenv('WEZTERM_CONFIG_DIR'),
      set_environment_variables = {
        TERM = 'screen-256color',
      },
      args = {
        '/usr/local/bin/nvim',
        os.getenv('WEZTERM_CONFIG_FILE'),
      },
    },
  },
  -- other keys
}
```
