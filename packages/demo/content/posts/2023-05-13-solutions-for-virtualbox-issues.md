---
type: post
title: Solutions for VirtualBox issues
date: 2023-05-13T09:30:05+07:00
author: ansidev
gravatar: a2ac3c4477e717c7fa15041d907e71fd
twitter: "@ansidev"
permalink: /tips-and-tricks/solutions-for-virtualbox-issues
categories:
  - Tips and Tricks
  - Virtualization
tags:
  - VirtualBox
---

My personal notes about solutions for VirtualBox issues I faced.

<!-- more -->

## Issues

### Black screen after installing Guest Additions

Try to disable **3D Acceleration** in the VM Settings.

### VirtualBox shared folder permission

You can not read the content of the shared folder inside Ubuntu VM.

**Solution**: Run

```sh
sudo adduser $USER vboxsf
```

from VM terminal, then reboot or logout and login.

### Increase the video memory to 256MB (maximum value)

**Solution**: Run

```sh
VBoxManage modifyvm "{virtual-machine-name}" --vram 256
```

from host terminal.

