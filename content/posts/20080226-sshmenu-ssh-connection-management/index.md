---
title: SSHMenu - SSH Connection Management
aliases: /posts/2008-02-sshmenu-ssh-connection-management
date: 2008-02-26 13:21:28
categories: [ "Linux", "Open Source", "Security" ]
tags: [ "GNOME", "Ubuntu", "OpenSSH", "SSHMenu" ]
summary: Managing SSH connections from a GNOME panel applet
sidebar: true
images: hero.webp
hero: hero.webp
---

We have a reasonable number of Debian servers at work and as a result I `ssh`
into servers about as many times as I visit Google. I have been using
Profiles in gnome-terminal to manage my ssh connections, which is fine but
requires I already have a terminal open to initiate a new server connection.
Enter [SSHMenu](http://sshmenu.sourceforge.net/), a GNOME panel applet that
keeps all your regular SSH connections within a single mouse click.

I couldn't be arsed adding up a new repo for one application, so here are my
quick and dirty install steps.

```bash
wget http://sshmenu.sourceforge.net/debian/dists/stable/contrib/binary-all/sshmenu_3.15-1_all.deb
wget http://sshmenu.sourceforge.net/debian/dists/stable/contrib/binary-all/sshmenu-gnome_3.15-1_all.deb
sudo gdebi -n sshmenu_3.15-1_all.deb
sudo gdebi -n sshmenu-gnome_3.15-1_all.deb
```

I have taken to using `gdebi` to install local deb packages as it resolves and
installs dependencies. Now add SSHMenu to a GNOME panel and configure
your ssh connections. If SSHMenu isn't listed in the GNOME panel applets yet,
then you can force a refresh with the rather heavy handed...

```bash
killall gnome-panel
```
