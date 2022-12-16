---
title: Shotwell 0.11 PPA available for Ubuntu Lucid and Maverick
aliases: /posts/2011-08-shotwell-ppa-for-ubuntu-lucid-maverick
date: 2011-08-30 11:05:50
tags: [Linux,Ubuntu,Shotwell,GNOME,PPA ]
summary: Showell 0.11 is available in a PPA for Ubuntu 10.04 & 10.10
sidebar: true
images: hero.png
hero: hero.png
---

Like many others I wanted [Shotwell](http://yorba.org/shotwell/) 0.11
for Lucid and Maverick so I've created a PPA for it.

  * <https://launchpad.net/~flexiondotorg/+archive/shotwell>

My PPA contains Shotwell 0.11 built for Ubuntu Lucid 10.04 LTS and Ubuntu
Maverick 10.10. I created this PPA because I run Lucid at home and wanted the
new version of Shotwell. Sadly, Yorba aren't going to provide new Shotwell
packages for Lucid due to the reasons discussed in the following ticket: -

 * <http://trac.yorba.org/ticket/3015>

As mentioned in the ticket above, there are newer versions of Shotwell available
for Lucid in other PPAs. However, those PPAs contain hundreds of packages. If
you're not that brave, like me, then hopefully my PPA provides what you
need. I have built Shotwell with minimal changes from the original Yorba
source packages and not polluted my PPA with any unnecessary packages. Since
Shotwell 0.11 you **must** enable the GStreamer PPA, see the ticket
below for the reasons for this requirement:

  * <http://redmine.yorba.org/issues/3716>

To install Shotwell on Lucid and Maverick do the following:

```bash
sudo apt-add-repository ppa:flexiondotorg/shotwell
sudo apt-add-repository ppa:gstreamer-developers/ppa
sudo apt-get update
sudo apt-get dist-upgrade
sudo apt-get install shotwell
```

Enjoy!
