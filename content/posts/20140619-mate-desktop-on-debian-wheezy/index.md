---
title: MATE Desktop on Debian Wheezy
aliases: /posts/2014-06-mate-desktop-on-debian-wheezy
date: 2014-06-19 22:00:00
categories: [ "Linux", "Open Source", "Tutorial" ]
tags: [ "Debian", "MATE Desktop", "Backports" ]
summary: Setting up MATE Desktop on Debian Wheezy
sidebar: true
images: hero.webp
hero: hero.webp
---

I'm a member of the [MATE Desktop](http://mate-desktop.org) team and until
recently the majority of my involvement has been focused around [Arch Linux](http://www.archlinux.org).

However, I'm working on a MATE project that is based on a [Debian](http://www.debian.org)
derivative. MATE has recently been accepted into the [Debian Backports](backports.debian.org/)
repository for Wheezy, so I decided to do a *"MATE from scratch"* on Debian using
an old netbook to get familiar with the MATE package naming differences between
Arch Linux and Debian.

# Install Debian

I installed Debian Wheezy from the [netinst](https://www.debian.org/CD/netinst/)
ISO to ensure the target install was as minimal as possible. I went with
the defaults until the 'Software selection' dialogue, at this point
unselect everything except "SSH server". Like this:

```text
[ ] Debian desktop environment
[ ] Web server
[ ] Print server
[ ] SQL database
[ ] DNS Server
[ ] File server
[ ] Mail server
[X] SSH server
[ ] Laptop
[ ] Standard system utilities
```

## Debian ISO with Firmware

If you're installing on hardware that requires additional firmware in
order for it to work with Linux then use the netinst ISO that includes
firmware.

  * <http://cdimage.debian.org/cdimage/unofficial/non-free/cd-including-firmware/current/>

# Configure Debian

When the install is finished, reboot and configure Debian a little.

## Repositories

You'll need to install `lsb-release` for the following to work.

```bash
apt-get install lsb-release
```

This is what I put in `/etc/apt/sources.list`.

```bash
cat >/etc/apt/sources.list<<EOF
deb http://ftp.uk.debian.org/debian/ $(lsb_release -cs) main contrib non-free
deb-src http://ftp.uk.debian.org/debian/ $(lsb_release -cs) main contrib non-free

deb http://security.debian.org/ $(lsb_release -cs)/updates main contrib non-free
deb-src http://security.debian.org/ $(lsb_release -cs)/updates main contrib non-free

# $(lsb_release -cs)-updates, previously known as 'volatile'
deb http://ftp.uk.debian.org/debian/ $(lsb_release -cs)-updates main contrib non-free
deb-src http://ftp.uk.debian.org/debian/ $(lsb_release -cs)-updates main contrib non-free
EOF
```

## Backports

MATE is only available in the wheezy-backports repository.

```bash
cat >/etc/apt/sources.list.d/backports.list <<EOF
deb http://ftp.uk.debian.org/debian $(lsb_release -cs)-backports main contrib non-free
deb-src http://ftp.uk.debian.org/debian $(lsb_release -cs)-backports main contrib non-free
EOF
```

Update.

```bash
sudo apt-get update
```

All backports are deactivated by default (i.e. the packages are pinned to 100
by using ButAutomaticUpgrades: yes in the Release files. If you want to install
something from backports run:

```bash
apt-get -t wheezy-backports install "package"
```

# Install MATE Desktop

First install the LightDM display manager.

```bash
apt-get install accountsservice lightdm lightdm-gtk-greeter
```

Now for the MATE Desktop itself.

```bash
apt-get -t wheezy-backports install mate-desktop-environment-extras
```

## NetworkManager

I typically use NetworkManager, so lets install that too.

```bash
apt-get install network-manager-gnome
```

## Supplementary

Depending on your hardware you may require CPU frequency utilities or
additional firmware.

```bash
apt-get install cpufreqd cpufrequtil firmware-linux firmware-linux-nonfree
```

And, that's it! Reboot and you'll see the LightDM greeter waiting for your
login credentials.

#### References

  * <http://wiki.mate-desktop.org/download?s[]=debian>
  * <https://wiki.debian.org/InstallingDebianOn/HP/HP2133>
