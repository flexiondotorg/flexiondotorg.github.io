---
title: The nano text editor
aliases: /posts/2013-01-nano-text-editor
date: 2013-01-22 15:25:47
tags: [ Linux ]
summary: Some quality of life improvements for nano text editor
sidebar: true
images: hero.png
hero: hero.png
---

I use the [nano](http://www.nano-editor.org/) text editor in preference to
[vim](http://www.vim.org/) and have done for years. This is because we used
[Pine](https://en.wikipedia.org/wiki/Pine_(email_client)) for email at
university and my first job, the Pico text editor was used to compose mail
messages. Due to the binary only distribution of `pico`, `nano` was created as
an free software alternative. And that is why I use `nano`.

Since I [migrated my blog to Nikola](/posts/migrating-wordpress-to-nikola/)
I'm using `nano` more frequently as I typically write my blog posts on a remote
shell, so I thought I'd spend some time to tweak `nano` a little.

## Keybindings

I refreshed my memory of some of the keyboard shortcuts available in `nano` to
be a little more efficient.

  * <http://mintaka.sdsu.edu/reu/nano.html>
  * <http://www.tuxradar.com/content/text-editing-nano-made-easy>
  * <http://www.cheatography.com/davechild/content/nano-shortcuts/>

## Syntax Highlighting

Syntax Highlighting is the killer feature for `nano` that I've never bothered to
configured in the past. I based my configuration one those provided by
[Craig Barnes](https://github.com/craigbarnes). He uses mixins to ensure a
consistent colour theme for all the language highlighters. I don't use his
custom key bindings however, it gets confusing when connecting to different
hosts that have a default `nano` configuration.

  * <https://github.com/craigbarnes/nanorc>
