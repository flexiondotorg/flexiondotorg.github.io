---
title: Installing Nikola on Arch Linux
aliases: /posts/2013-03-installing-nikola-on-arch-linux
date: 2013-03-08 17:13:43
tags: [ Nikola,Python,Content Management,Arch Linux,Static Site Generator,virtualenv ]
summary: Install Nikola static site generator in a virtualenv on Arch Linux
sidebar: true
images: hero.webp
hero: hero.webp
---

I've decided to migrate one of my servers to [Arch Linux](https://www.archlinux.org/).
I'm not sure that a rolling release distro really suits servers but I've enjoyed
using Arch Linux over the last year on my workstations and the only way to
assess it's suitability on a server is to try it. So, I've decided to migrate my
blog to an Arch Linux server.

This blog post describes how to install [Nikola](http://getnikola.com/)
on Arch Linux. Nikola is a static site and blog generator written in
[Python](http://www.python.org) that I've been using for a few months.

First you'll need Python and [virtualenvwrapper](http://www.doughellmann.com/projects/virtualenvwrapper/)
so read my [Python and virtualenv on Arch Linux and Ubuntu](/posts/python-and-virtualenv-on-arch-linux-and-ubuntu/)
blog post and get yourself equipped.

Install the Nikola dependencies.

```bash
sudo pacman -S --noconfirm --needed freetype2 libxslt libxml2
sudo packer -S --noconfirm --noedit libjpeg6
```

Create a `virtualenv` for Nikola.

```bash
mkvirtualenv -p /usr/bin/python2.7 nikola-640
```

You will notice your shell prompt has changed to indicate that the `nikola-640`
virtualenv is now active. Install Nikola and the optional libraries I use.

```bash
pip install https://github.com/getnikola/nikola/archive/v6.4.0.zip
```

If you intend to use the Nikola planetoid (Planet generator) plugin you'll also
need to following.

```bash
pip install peewee feedparser
```

Nikola is now installed. `nikola help` and the [Nikola Handbook](http://getnikola.com/handbook.html)
will assist you from here on.
