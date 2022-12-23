---
title: Setting up MiniDLNA on Open Media Vault
aliases: /posts/2013-08-minidlna-on-open-media-vault
date: 2013-08-26 21:49:09
categories: [ "Linux", "Open Source", "Tutorial", "Self Hosting", "Home Cinema" ]
tags: [ "Debian", "Open Media Vault", "MiniDLNA", "DLNA" ]
summary: Music streaming with MiniDLNA on Open Media Vault
sidebar: true
images: hero.webp
hero: hero.webp
---

I have [Open Media Vault](http://www.openmediavault.org/) running on a
[HP ProLiant MicroServer G7 N54L](http://www8.hp.com/uk/en/products/proliant-servers/product-detail.html?oid=5336624).

OpenMediaVault (OMV) is a network attached storage (NAS) solution based on
[Debian](http://www.debian.org) Linux. At the time of writing OMV 0.5.x is
based on Debian 6.0 (Squeeze).

In recent months [Plex](http://www.plexapp.com) has taken over just about all
media streaming duties in our house, with the expectation of streaming music
because Plex music playback and streaming is seriously lacking (no playlists!).
So, [MiniDLNA](http://sourceforge.net/projects/minidlna/) is still required for
serving up music around the house.

# Install MiniDLNA on OMV

There is a 3rd party plugin repository for Open Media Vault which includes
packages to install MiniDLNA and a WebUI plugin for managing MiniDLNA via OMV.
I upgraded to OMV 0.5.x this morning. and with the 0.5.x the Plugin API changed
and as of the time of writing none of the 3rd party plugins had not been migrated
to OMV 0.5.x. That said, MiniDLNA is super simple to configure so a WebUI is
not a requirement for me.

MiniDLNA is not currently packaged for Debian Squeeze in the official repositories but
[Steve Kemp](http://blog.steve.org.uk/minidlna_is_now_packaged.html) has packaged
a fairly up-to-date version of MiniDLNA for Squeeze. Brilliant! Do the following as
`root` to install MiniDLNA.

```bash
wget http://packages.steve.org.uk/minidlna/apt-key.pub
apt-key add apt-key.pub
echo deb http://packages.steve.org.uk/minidlna/squeeze/ ./" > /etc/apt/sources.list.d/minidlna.list
echo "deb-src http://packages.steve.org.uk/minidlna/squeeze/ ./" >> /etc/apt/sources.list.d/minidlna.list
```

Once you've done that run the following.

```bash
apt-get update
apt-get install minidlna
```

The MiniDLNA defaults in Steve's package assume you have your music in
`/srv/music`. So you'll probably need to modify `/etc/minidlna/minidlna.conf`
accordingly. From this point `man minidlna` and `man minidlna.conf` will
guide you.

#### References
  * <http://blog.steve.org.uk/minidlna_is_now_packaged.html>
  * <http://packages.steve.org.uk/minidlna/>
  * <http://sourceforge.net/projects/minidlna/>
