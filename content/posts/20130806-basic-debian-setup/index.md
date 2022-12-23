---
title: Basic Debian Setup for Squeeze and Wheezy
aliases: /posts/2013-08-basic-debian-setup-for-squeeze-and-wheezy
date: 2013-08-06 20:07:09
categories: [ "Linux", "Open Source", "Tutorial", "Security" ]
tags: [ "Debian", "LXC", "QEMU", "KVM", "Open Media Vault" ]
summary: Consistent server configuration for Debian Squeeze & Wheezy
sidebar: true
images: hero.webp
hero: hero.webp
---

Recently I've been deploying [Debian](http://www.debian.org) 6.0 (Squeeze) and
7.0 (Wheezy) servers for some personal projects. These servers are provisioned
in different ways:

  * Open Media Vault using a Squeeze pre-seed
  * VPS powered by [LXC](http://http://lxc.sourceforge.net/) deployed via `debootstrap`
  * VPS powered by [KVM](http://www.linux-kvm.org) using the hosting providers Wheezy pre-seed

Consequently the basic install differs on each instance and requires a little
bit of post install tweaking to get them all consistent. This blog post is a
quick reference for the post install steps I complete on Debian servers.

# Timezone & Locale

Select your timezone.

```bash
dpkg-reconfigure tzdata
```

Select your locale(s).

```bash
dpkg-reconfigure locales
```

Make sure the locales are correctly generated. Replace `en_GB.UTF-8` with your
default locale.

```bash
update-locale LANG=en_GB.UTF-8 LANGUAGE=en_GB.UTF-8 LC_ALL=en_GB.UTF-8 LC_TIME=en_GB.UTF-8 LC_CTYPE=en_GB.UTF-8
locale -a
locale-gen
```

# Hostname

```bash
echo box.example.org > /etc/hostname
/bin/hostname -F /etc/hostname
```

Update `/etc/hosts` accordingly.

# Time

Keeping time is essential.

```bash
apt-get install ntp ntpdate
```

Force a clock sync.

```bash
service ntp stop
ntpdate -s pool.ntp.org
service ntp start
```

If your VPS is a Xen DomU then checkout the following.

  * <http://jinntech.blogspot.co.uk/2009/03/xen-and-keeping-time.html>

# Essentials

These are the essential tools I require.

```bash
apt-get install build-essential curl git htop less lsb-release nano \
rsync screen sudo tree whois
```

# Users

The following will create a user with `sudo` capabilities.

```bash
useradd user_a --create-home --shell /bin/bash --user-group \
--groups adm,dialout,cdrom,plugdev,sudo
```

This will create a regular user.

```bash
useradd user_b --create-home --shell /bin/bash --user-group --groups adm,dialout,cdrom,plugdev
```

Assign a password.

```bash
echo user_a:mypassword | chpasswd
```

An existing user can be made a sudoer by simply adding them to the `sudo` group.

```bash
adduser user_b sudo
```

# Firewall

I use firewall my VPS server with `ufw`. This is my initial configuration that
allow access via SSH only.

```bash
sudo apt-get install ufw
```

Configuring `ufw` is simple but make sure you have console access to the host
you are configuring just in case you lock yourself out.

**NOTE!** When enabling `ufw` the chains are flushed and connections may be
dropped. You can add rules to the firewall before enabling it however, so if you
are testing `ufw` on a remote machine it is recommended you perform...

```bash
ufw allow ssh/tcp
```

...before running `sudo ufw enable`. Once the firewall is enabled, adding and
removing rules will not flush the firewall, although modifying an existing rule
will.

Set the default behaviour to deny all incoming connections.

```bash
sudo ufw default deny
```

Open up TCP port 22 but with rate limiting enabled which will deny connections
from an IP address that has attempted to initiate 6 or more connections in the
last 30 seconds. Ideal for protecting `sshd` but you should conisder other
[SSH brute force defense](/posts/ssh-brute-force-defense/)
techniques as well.

```bash
sudo ufw limit ssh
```

To enable the firewall you also have to do the following.

```bash
sudo ufw enable
```

On low-end servers it might be beneficial to disable logging.

```bash
sudo ufw logging off
```

You can see the status of the firewall using `sudo ufw status`.

# Intrusion prevention

I use either `denyhosts`

```bash
sudo apt-get install denyhosts
```

Purge entries older than 5 days, denied hosts will only be purged twice and
disable email alerts.

```bash
sudo sed -i 's/#PURGE_DENY = 5d/PURGE_DENY = 5d/' /etc/denyhosts.conf
sudo sed -i 's/#PURGE_THRESHOLD = 2/PURGE_THRESHOLD = 2/' /etc/denyhosts.conf
sudo sed -i 's/root@localhost//' /etc/denyhosts.conf
```

Restart `denyhosts`.

```bash
sudo service denyhosts restart
```

Also see [SSH brute force defence](http://flexion.org/posts/2012-11-ssh-brute-force-defence.html).

# Boot options

These servers are headless and often remote, therefore I enable `fsck` auto repair.

## Squeeze

```bash
sed -i 's/FSCKFIX=no/FSCKFIX=yes/' /etc/default/rcS
```

## Wheezy

```bash
sed -i 's/#FSCKFIX=no/FSCKFIX=yes/' /etc/default/rcS
```

# Repositories

`lsb-release` was installed earlier. This is what I put in `/etc/apt/sources.list`.

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

I replace `ftp.uk` with `ftp.us` for servers located in the United States.

```bash
sed -i 's/ftp\.uk/ftp\.us/g' /etc/apt/sources.list
```

## Backports

I add the Backports repository in order to access some updated packages.

### Squeeze

```bash
cat >/etc/apt/sources.list.d/backports.list <<EOF
deb http://ftp.uk.debian.org/debian-backports $(lsb_release -cs)-backports main contrib non-free
deb-src http://ftp.uk.debian.org/debian-backports $(lsb_release -cs)-backports main contrib non-free
EOF
```

### Wheezy
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

All backports are deactivated by default (i.e. the packages are pinned to
100 by using ButAutomaticUpgrades: yes in the Release files. If you want to
install something from backports run:

```bash
apt-get -t wheezy-backports install "package"
```

# MTA

sSMTP is a simple MTA to deliver mail from a computer to a mail hub. sSMTP is
simple and lightweight.

## Remove exim4

Some VPS Debian templates from VPS providers have exim4 installed and running
by default. Remove it.

```bash
sudo service exim4 stop
sudo apt-get purge exim4 exim4-base exim4-config
```
## Install sSMTP

```bash
apt-get install ssmtp bsd-mailx
```

## sSMTP Gmail Configuration

I use Gmail as my smart host, here is an example configuration for
`/etc/ssmtp/ssmtp.conf`.

```bash
#
# Config file for sSMTP sendmail
#
# The person who gets all mail for userids < 1000
# Make this empty to disable rewriting.
root=root@example.org

# The place where the mail goes. The actual machine name is required no
# MX records are consulted. Commonly mailhosts are named mail.domain.com
mailhub=smtp.gmail.com:587

# Where will the mail seem to come from?
rewriteDomain=

# The full hostname
hostname=box.example.org

# Are users allowed to set their own From: address?
# YES - Allow the user to specify their own From: address
# NO - Use the system generated From: address
FromLineOverride=YES

# Gmail requires TLS
UseTLS=YES
UseSTARTTLS=YES

# Username and password for Gmail servers
AuthUser=yourgmailname@gmail.com
AuthPass=youpassword
AuthMethod=LOGIN
```

Then add each account that you want to be able to send mail from by editing
`/etc/ssmtp/revaliases`:

```text
root:username@gmail.com:smtp.gmail.com:587
user_a:username@gmail.com:smtp.gmail.com:587
user_b:username@gmail.com:smtp.gmail.com:587
```

  * <https://wiki.debian.org/sSMTP>

# Log and package monitoring

My personal VPS server are dotted about the place but I like to keep an eye on
them  and I find `apticron` and `logwatch` are very useful for that.

## apticron

apticron is a simple tool to mail about pending package updates.

```bash
sudo apt-get install apticron
```

## logwatch

Logwatch is a modular log analyser that runs every night and mails you the results.

```bash
sudo apt-get install logwatch
```

# Lighter

Some of my servers have fairly low resources, these are some simple changes that
can save a bit of RAM or disk space.

## aptitude

I don't use it.

```bash
sudo apt-get purge aptitude
```

## D-Bus

D-Bus is a message bus, used for sending messages between applications.
Some VPS provider Debian templates have D-Bus and avahi installed. I don't
require these on Internet facing servers so I remove them. If an application
pull in D-Bus as a requirement that is fine, but for this initial server
state I remove it.

```bash
sudo apt-get purge dbus
```

## at

`at` provides delayed job execution and batch processing. I don't use it.

```bash
sudo service atd stop
sudo apt-get purge at
```

## ngetty

Ngetty is a single-process `getty` replacement, so instead of running 6 `getty`
processes consuming up to 3MB of RAM each, you can use a single `ngetty` process
using less than 1MB of RAM total.

```bash
sudo apt-get install ngetty
```

Edit `/etc/inittab`, comment out `getty` and add `ngetty` like so.

```text
#1:2345:respawn:/sbin/getty 38400 tty1
#2:23:respawn:/sbin/getty 38400 tty2
#3:23:respawn:/sbin/getty 38400 tty3
#4:23:respawn:/sbin/getty 38400 tty4
#5:23:respawn:/sbin/getty 38400 tty5
#6:23:respawn:/sbin/getty 38400 tty6
ng:2345:respawn:/sbin/ngetty 1 2 3 4 5 6
```

Restart inittab

```bash
telinit q
```

  * <http://haydenjames.io/replacing-getty-ngetty-debian/>

That about covers the general post installation step I complete on my Debian
servers.

## Clean up.

Remove any packages that are no longer required and clean up
the package cache.

```bash
sudo apt-get autoremove
sudo apt-get autoclean
sudo apt-get clean
```
