---
title: Plex Media Server on Open Media Vault
aliases: /posts/2013-08-plex-media-server-on-open-media-vault
date: 2013-08-27 21:11:43
tags: [ Linux,Debian,Plex Media Server,Open Media Vault,OMV,Plex ]
summary: Installing Plex Media Server on Open Media Vault (Squeeze) 6.0
sidebar: true
images: hero.png
hero: hero.png
---

I've recently started using [Plex Media Server](http://www.plexapp.com) to
handle most media streaming duties around the house. I run in on
[Open Media Vault](http://www.openmediavault.org) 0.5.x. At the time of writing
Open Media Vault is based on [Debian](http://www.debian.org) (Squeeze) 6.0.

# Plex Media Server

Anyway, it turns out that installing Plex Media Server on Open Media Vault is
super simple thanks to the [hard work of Christian Svedin](http://forums.plexapp.com/index.php/topic/51427-plex-media-server-for-debian/)
who has packaged everything and made it available via an `apt` repository.

```bash
sudo apt-get install curl
echo "deb http://shell.ninthgate.se/packages/debian squeeze main" | sudo tee -a /etc/apt/sources.list.d/plexmediaserver.list
curl http://shell.ninthgate.se/packages/shell-ninthgate-se-keyring.key | sudo apt-key add -
sudo apt-get update
sudo apt-get install plexmediaserver
```

The instructions above also work for Debian Wheezy, just change `squeeze` to
`wheezy` in `/etc/apt/sources.list.d/plexmediaserver.list`.

When the install is complete point your browser at Plex/Web, for example:

  * http://plex.example.org:32400/web

Replace `plex.example.org` with your Plex Media Server hostname/ip address.

If you have PlexPass then head over to the [Preview Releases for Debian](http://forums.plexapp.com/index.php/topic/48865-debian-package/)
and download and install the latest `.deb`.

# Plex Clients

I use the Plex Client for Android on phone and tablet, a Roku 2 XS in the lounge
and Roku 2 LT in the bedroom.

I've suxcessfully tested Plex Home Theatre on Ubuntu 12.04 and Raspbmc with
the PleXBMC plug-in on Raspberry Pi.

### References

  * <http://forums.plexapp.com/index.php/topic/51427-plex-media-server-for-debian/>
  * <http://forums.plexapp.com/index.php/topic/48865-debian-package/>

