---
title: Bash script to retrieve Ubuntu codenames and versions
aliases: /posts/2011-03-bash-script-get-ubuntu-codename-version
date: 2011-03-16 13:44:54
tags: [Linux,Ubuntu,Bash ]
summary: Get a list of Ubuntu codename and version with wget
sidebar: true
images: hero.png
hero: hero.png
---

I'm working a script to automatically backport [Debian](http://www.debian.org)
packages to Ubuntu. I needed a way to get a list of currently supported/active
Ubuntu releases by codename or version. Here is how I do it.

## Get a list of Ubuntu codenames

```bash
wget -q http://cdimage.ubuntu.com/releases/ -O - | sed -e :a -e 's/<[^>]*>//g;/</N;//ba' | grep '^[[:space:]][a-z]' | sed 's/\///g'
```

## Get a list of Ubuntu versions

```bash
wget -q http://cdimage.ubuntu.com/releases/ -O - | sed -e :a -e 's/<[^>]*>//g;/</N;//ba' | grep '^[[:space:]][1-9]' | sed 's/\///g'
```
