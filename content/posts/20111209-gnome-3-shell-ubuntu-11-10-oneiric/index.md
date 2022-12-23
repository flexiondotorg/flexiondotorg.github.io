---
title: Installing GNOME 3 on Ubuntu 11.10
aliases: /posts/2011-12-gnome-3-shell-ubuntu-11-10-oneiric
date: 2011-12-09 16:21:03
categories: [ "Linux", "Open Source", "Tutorial" ]
tags: [ "GNOME", "Ubuntu", "Unity" ]
summary: Creating a pure GNOME 3 experience on Ubuntu 11.10
sidebar: true
images: hero.webp
hero: hero.webp
---

I tried [Unity](http://unity.ubuntu.com/) in Ubuntu Natty 11.04 and Ubuntu
Oneiric 11.10. We've agreed to hate each other. A few weeks ago I started using
[GNOME 3](http://www.gnome.org/) and it only took me a couple of hours to
adapt to it's workflow. GNOME 3 is now my desktop environment at home and and
work. I love it! If you'd like to give GNOME 3 a whirl then you could try
installing Jan Hoffman's Ubuntu GNOME Shell Remix from either the 32-bit or
64-bit ISOs he has prepared. This will give a "pure" GNOME 3 experience.

  * <http://ubuntu-gs-remix.sourceforge.net/p/home/>

If you already have Ubuntu 11.10 installed then you can install GNOME 3 alongside
Unity. Here are the incantations you'll need to utter in a shell.

```bash
sudo apt-add-repository ppa:jan-hoffmann/gnome-shell
sudo apt-add-repository ppa:aegirxx-googlemail/gnome-shell-extensions
sudo apt-add-repository ppa:gnome3-team/gnome3
sudo apt-add-repository ppa:webupd8team/gnome3
sudo apt-get update
sudo apt-get install libglib2.0-bin gnome-core gnome-documents gnome-shell gnome-sushi gnome-tweak-tool gnomeshell-default-settings gtk3-engines-unico
```

The repositories added above will give you access to Jan's GNOME 3 meta
packages, updated GNOME 3 packages and some extra GNOME 3 extensions. GNOME 3
extensions add all manner of additional tweaks and functionality. Some
extensions can even provide a user experience more akin to that of GNOME 2.

  * <http://intgat.tigress.co.uk/rmy/extensions/index.html>

In order to get acquainted with GNOME 3 I suggest you read the
[Discover GNOME 3](http://www.gnome.org/gnome-3/) (watch the videos too) and
[GNOME 3 Cheat Sheet](http://live.gnome.org/GnomeShell/CheatSheet) pages. Having
read those you'll soon master GNOME 3. After you've used GNOME 3 for a while you
may conclude it is a more usable desktop environment than Unity, which isn't a
surprising conclusion to arrive at given Unity sucks the big one right now. If
you want a *"pure"* GNOME 3 experience then the following commands will purge
Unity and other bits and bobs that GNOME 3 simply doesn't require.

## Remove Unity

```bash
sudo apt-purge unity unity-2d unity-2d-launcher unity-asset-pool unity-common \
unity-greeter unity-lens-applications unity-lens-music libunity-misc4
```

## Remove Overlay Scrollbars

These just don't work on my netbook since they regularly obscure portions of
the window I actually want to click on. The can safely be removed even if you
intend to continue using Unity.

```bash
sudo apt-get purge overlay-scrollbar liboverlay-scrollbar-0.2-0 liboverlay-scrollbar3-0.2-0
```

## Remove Indicators

If you never going back to Unity, Indicators can be safely removed.

```bash
sudo apt-get purge xchat-gnome-indicator indicator-appmenu indicator-power \
indicator-session indicator-sound indicator-status-provider-mc5 \
libindicator-messages-status-provider1
```

## Remove Global Menu

Again, Global Menu is not used by GNOME 3. So if you not going back to Unity
these can be safely removed.

```bash
sudo apt-get purge appmenu-gtk3 appmenu-gtk appmenu-qt firefox-globalmenu \
thunderbird-globalmenu
```

Finally, a word or warning: **Distribution upgrades are not possible!** You
can't upgrade to a newer version of Ubuntu when using Jan Hoffman's Ubuntu
GNOME Shell Remix or if you modify an existing Ubuntu 11.10 using my method
above. You will have to do a full install once the next Ubuntu release is
available. This can't be fixed as long as Jan's meta packages are unofficial,
because the distribution upgrade process requires having installed one of the
desktop meta packages from the official Ubuntu repositories.
