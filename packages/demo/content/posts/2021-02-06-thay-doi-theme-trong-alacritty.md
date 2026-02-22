---
type: post
title: Thay đổi theme trong Alacritty
date: 2021-02-06T03:22:43+07:00
author: ansidev
gravatar: a2ac3c4477e717c7fa15041d907e71fd
twitter: '@ansidev'
permalink: /tips-and-tricks/2021-02-06-thay-doi-theme-trong-alacritty/
categories:
  - Tips and Tricks
tags:
  - alacritty
  - switch theme
---

Bài viết dành cho ai đang dùng phần mềm Alacritty và muốn thay đổi theme.

<!-- more -->

## Tại sao mình dùng Alacritty?

- Mình dùng macOS.
- Mình không thích Terminal mặc định của macOS.
- Mình đã từng thử qua iTerm, Hyper, Terminus nhưng thấy không thích :) .
- Sau xem qua review và trải nghiệm Alacritty thì xài luôn tới giờ :) .

## Cách chuyển đổi theme trong Alacritty

Tất nhiên mặc định thì Alacritty đã hỗ trợ sẵn theme rồi, bạn có thể đọc documentation và custom theo ý bạn.

Tuy nhiên, nếu lựa chọn của bạn là những theme có sẵn, hoặc giống như mình (chuyển từ một terminal khác sang) thì bài viết này có thể hữu ích dành cho bạn.

Sau khi search trên Google thì mình tổng hợp được một số tool hỗ trợ chuyển đổi theme cho Alacritty:

| No. | URL                                                  | Ngôn ngữ lập trình | Nhận xét                            |
| --- | ---------------------------------------------------- | ------------------ | ----------------------------------- |
| 1   | https://github.com/toggle-corp/alacritty-colorscheme | Python             | Không hỗ trợ interactive mode       |
| 2   | https://github.com/tichopad/alacritty-theme-switch   | Javascript         | Phải tự tải theme, config thủ công  |
| 3   | https://github.com/rajasegar/alacritty-themes        | Javascript         | Có hỗ trợ interactive mode, preview |

**=> Mình chọn alacritty-themes [3].**

Dưới đây là hình demo:

<img class="medium-zoom" src="/uploads/2021/02/06/alacritty-themes.webp" alt="alacritty-themes" />

Hết bài rồi!
