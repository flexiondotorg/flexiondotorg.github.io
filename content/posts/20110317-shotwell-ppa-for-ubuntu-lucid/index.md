---
title: Shotwell 0.8.1 PPA available for Ubuntu Lucid
aliases: /posts/2011-03-shotwell-ppa-for-ubuntu-lucid
date: 2011-03-17 17:04:42
tags: [Linux,Ubuntu,GNOME,Shotwell,PPA ]
summary: Get the latest Shotwell 0.8.1 via a PP for Ubuntu 10.04
sidebar: true
images: hero.webp
hero: hero.webp
---

Like many others I wanted [Shotwell](http://yorba.org/shotwell/) for Lucid
so I've created a PPA for it.

  * <https://launchpad.net/~flexiondotorg/+archive/shotwell.

My PPA contains Shotwell 0.8.1 built for Ubuntu Lucid 10.04 LTS. I created the
PPA because I run Lucid at home and wanted the new version of Shotwell. Sadly,
Yorba aren't going to provide a Lucid build of Shotwell 0.8.1 due to the
reasons discussed in the following ticket:

  * <http://trac.yorba.org/ticket/3015>

As mentioned in the ticket above, there are versions of Shotwell 0.8.1
available for Lucid in other PPAs. However, those PPAs contain hundreds of
packages. If you're not that brave, like me, then hopefully my PPA provides
what you need. I have built Shotwell 0.8.1 with minimal changes from the
original Yorba source packages and not polluted my PPA with any unnecessary
packages **NOTE!** My PPA has dependencies that are satisfied by the Yorba
PPA, so you must also enable the Yorba PPA too.

  * <https://launchpad.net/~yorba/+archive/ppa>

To install Shotwell 0.8.1 on Lucid do the following:

```bash
sudo apt-add-repository ppa:yorba/ppa
sudo apt-add-repository ppa:flexiondotorg/shotwell
sudo apt-get update
sudo apt-get install shotwell
```
