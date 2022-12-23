---
title: get-iplayer on Debian 6.0
aliases: /posts/2013-03-get-iplayer-on-debian-squeeze
date: 2013-03-25 18:09:21
categories: [ "Linux", "Open Source", "Tutorial", "Entertainment" ]
tags: [ "Debian", "iPlayer", "get-iplayer", "BBC" ]
summary: Installing get-iplayer on a Debian (Squeeze) 6.0
sidebar: true
images: hero.webp
hero: hero.webp
---

I use [get-iplayer](http://www.infradead.org/get_iplayer/html/get_iplayer.html)
to download TV programs so I can watch them on the devices that suit me, when it
suits me. What follows is how I install `get-iplayer` on a headless Debian 6.0
server I have a home. The server in question is really low powered so building
from source was not an option.

In order to install the latest version of `get-iplayer` (currently 2.82) on
[Debian](http://www.debian.org) Squeeze a couple of additional package
repositories need enabling.

  * [Debain Multimedia](http://www.deb-multimedia.org/)
  * [Debian Backports](http://backports-master.debian.org/)

Enable the Debain Backports repository by adding the following line to
`/etc/apt/sources.list.d/backports.list`.

```text
deb http://backports.debian.org/debian-backports squeeze-backports main
```

Enable the Debain Multimedia repository by adding the following lines to
`/etc/apt/sources.list.d/multimedia.list`.

```text
deb http://www.deb-multimedia.org squeeze main non-free
deb http://www.deb-multimedia.org squeeze-backports main
```

Update the repositories.

```bash
sudo apt-get update
```

Install the `deb-multimedia-keyring` package.

```bash
sudo apt-get --allow-unauthenticated install deb-multimedia-keyring
```

Install `get-iplayer` (currently v2.78) from the official Debian repositories,
this will also install the dependencies.

```bash
sudo apt-get install get-iplayer
```

Install the `get-iplayer` suggested packages.

```bash
sudo apt-get install ffmpeg rtmpdump libdata-dump-perl libid3-tools libcrypt-ssleay-perl libio-socket-ssl-perl
```

I have seen it suggested that `mplayer` should also be installed. I've not
determined if that is an absolute requirement. But this is how to install it
on a headless Debian computer.

```bash
sudo apt-get --no-install-recommends install mplayer
```

Finally, upgrade `get-iplayer` to v2.82.

```bash
sudo apt-get install libmp3-tag-perl libxml-simple-perl
wget http://ftp.uk.debian.org/debian/pool/main/g/get-iplayer/get-iplayer_2.82-2_all.deb
sudo dpkg -i get-iplayer_2.82-2_all.deb
```

At this point `get-iplayer` should be good to go and the [get-iplayer](http://www.infradead.org/get_iplayer/html/get_iplayer.html)
website and `man get-iplayer` will assist you.

#### References
  * <http://www.infradead.org/get_iplayer/html/get_iplayer.html>
  * <http://www.deb-multimedia.org/>
  * <http://backports-master.debian.org/>
  * <http://lists.infradead.org/pipermail/get_iplayer/2012-June/003065.html>
  * <http://tech.leeporte.co.uk/get_iplayer-under-debian-squeeze/>
