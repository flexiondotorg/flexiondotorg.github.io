---
title: OpenMediaVault on Debian
aliases: /posts/2014-06-openmediavault-on-debian
date: 2014-06-22 12:00:00
categories: [ "Linux", "Open Source", "Tutorial", "Self Hosting" ]
tags: [ "Debian", "Open Media Vault" ]
summary: Manually installing OpenMediaVault on Debian Wheezy
sidebar: true
images: hero.webp
hero: hero.webp
---

At the time of writing [OpenMediaVault](http://www.openmediavault.org/) 0.6 is
pre-release. But it is possible to install OpenMediaVault on Debian Wheezy in
order to get some testing done.

Install Debian Wheezy on your target VM or test server. Go with the defaults
until the 'Software selection' dialogue. Make sure everything is unselected, like this:

```text
[ ] Debian desktop environment
[ ] Web server
[ ] Print server
[ ] SQL database
[ ] DNS Server
[ ] File server
[ ] Mail server
[ ] SSH server
[ ] Laptop
[ ] Standard system utilities
```

After the install is complete, reboot and login to the new Debian system
as `root`.

Update the repository sources and add the `contrib` and `non-free`
repositories.

```bash
nano /etc/apt/sources.list
```

It should look something like this:

```text
deb http://ftp.uk.debian.org/debian/ wheezy main contrib non-free
deb-src http://ftp.uk.debian.org/debian/ wheezy main contrib non-free

deb http://security.debian.org/ wheezy/updates main contrib non-free
deb-src http://security.debian.org/ wheezy/updates main contrib non-free

# wheezy-updates, previously known as 'volatile'
deb http://ftp.uk.debian.org/debian/ wheezy-updates main contrib non-free
deb-src http://ftp.uk.debian.org/debian/ wheezy-updates main contrib non-free
```

Now add the OpenMediaVault repository.

```bash
echo "deb http://packages.openmediavault.org/public kralizec main" > /etc/apt/sources.list.d/openmediavault.list
```

Update.

```bash
apt-get update
```

Install the OpenMediaVault repository key and Postfix.

```bash
apt-get install openmediavault-keyring postfix
```

  * When the 'Postfix Configuration' dialogue is displayed choose `No
  configuration`.

Update again and install OpenMediaVault.

```bash
apt-get update
apt-get install openmediavault
```

  * When the 'Configuring mdadm' dialogue is displayed enter `none`.
  * Do you want to start MD arrays automatically? `YES`
  * When the 'ProFTPD configuration' dialogue is displayed choose
  `standalone`.

Initialise OpenMediaVault and reboot.

```bash
omv-initsystem
reboot
```

After the reboot you should be able to connect to the OpenMediaVault WebUI and
login as `admin` with the password of `openmediavault`. That's it. Get testing.
