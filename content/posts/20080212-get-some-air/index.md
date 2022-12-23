---
title: Get some AIR
aliases: /posts/2008-02-get-some-air
date: 2008-02-12 12:53:03
categories: [ "Linux" ]
tags: [ "dd", "dcfldd", "Ubuntu" ]
summary: A graphical frontend for dd
sidebar: true
images: hero.webp
hero: hero.webp
---

[AIR (Automated Image and Restore)](http://air-imager.sourceforge.net/) is a
GUI front-end to `dd` and `dcfldd` designed for easily creating forensic bit
images. Or, a nice way to let the guys at work who like GUIs make Debian boot
install floppies (don't ask) easily. Ubuntu 7.10 doesn't have a package for AIR,
but AIR does have an installer.

```bash
sudo aptitude install perl-tk sharutils dcfldd netcat cryptcat
wget http://prdownloads.sourceforge.net/air-imager/air-1.2.8.tar.gz?download
tar zxvf air-1.2.8.tar.gz
cd air-1.2.8/
sudo ./install-air-1.2.8
```

At this point the installer thingy will kick off, follow the prompts. I have
found that `air` needs to run as root, but won't run if the executable is
setuid. So run it via `sudo` like so:

```bash
sudo air
```
